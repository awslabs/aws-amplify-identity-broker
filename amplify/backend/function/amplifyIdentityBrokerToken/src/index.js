/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const crypto = require('crypto');
const qs = require('querystring');

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME;

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
    if (!(event && event.body)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }

    var jsonBody = qs.parse(event.body);
    var client_id = jsonBody.client_id;
    var authorization_code = jsonBody.authorization_code;
    var redirect_url = jsonBody.redirect_url;
    var code_verifier = jsonBody.code_verifier;
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

    if (data.Item === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid authorization code'),
        };
    }
    if (data.Item.client_id != client_id) {
        return {
            statusCode: 400,
            body: JSON.stringify('Client ID does not match authorization code'),
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

    var access_token = data.Item.access_token;
    var id_token = data.Item.id_token;

    if (access_token === undefined || id_token === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Could not find tokens'),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            "access_token": access_token,
            "id_token": id_token,
            "token_type": "Bearer"
        }),
    };
};
