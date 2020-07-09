/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CODESTABLE_ARN
	STORAGE_CODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const crypto = require('crypto');

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_CODESTABLE_NAME

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }

    var client_id = event.queryStringParameters.client_id;
    var redirect_url = event.queryStringParameters.redirect_url;
    var authorization_code = event.queryStringParameters.authorization_code;
    var code_verifier = event.queryStringParameters.code_verifier;
    if (client_id === undefined || redirect_url === undefined || authorization_code === undefined || code_verifier == undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    var data;
    var params = {
        TableName: codesTableName,
        Key: {
            authorization_code: authorization_code
        }
    };
    try {
        data = await docClient.get(params).promise();
    } catch (error) {
        console.error(error);
    }
    console.log(data);

    if (data.Item === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid authorization code'),
        };
    }
    if (data.Item.client_id != client_id) {
        return {
            statusCode: 400,
            body: JSON.stringify('Client Id does not match authorization code'),
        };
    }
    if (data.Item.redirect_url != redirect_url) {
        return {
            statusCode: 400,
            body: JSON.stringify('Redirect url does not match authorization code'),
        };
    }
    if (Date.now() > data.Item.code_expiry) {
        return {
            statusCode: 400,
            body: JSON.stringify('Authorization code expired'),
        };
    }

    var calculatedCodeChallenge = base64URLEncode(sha256(code_verifier));

    if (calculatedCodeChallenge !== data.Item.code_challenge) {
        return {
            statusCode: 400,
            body: JSON.stringify('Code verifier does not match code challenge'),
        };
    }

    // return jwt from dynamodb

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda amplify/backend/function/tokenfunction/src/index.js!'),
    };
};
