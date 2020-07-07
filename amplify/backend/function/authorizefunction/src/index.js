/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BACKENDDYNAMO_ARN
	STORAGE_BACKENDDYNAMO_NAME
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const CODE_LIFE = 900000;

var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = process.env.STORAGE_BACKENDDYNAMO_NAME;

async function handlePKCE(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_url = event.queryStringParameters.redirect_url;
    var code_challenge = event.queryStringParameters.code_challenge;
    var code_challenge_method = event.queryStringParameters.code_challenge_method;
    if (client_id === undefined || redirect_url === undefined || code_challenge === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    const authorizationCode = uuidv4();
    const codeExpiry = Date.now() + CODE_LIFE;
    var params = {
        TableName: tableName,
        Item: {
            authorization_code: authorizationCode,
            code_challenge: code_challenge,
            client_id: client_id,
            redirect_url: redirect_url,
            code_expiry: codeExpiry
        }
    };

    try {
        var result = await docClient.put(params).promise();
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
    }

    return { //redirect to login page
        statusCode: 301,
        headers: {
            Location: '/?client_id=' + client_id + '&redirect_url=' + redirect_url + '&code_challenge=' + code_challenge,
        }
    };
}

async function handleImplicit(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_url = event.queryStringParameters.redirect_url;
    if (client_id === undefined || redirect_url === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }
    // Can validate client_id and redirect_url agaisnt db here

    return { //redirect to login page
        statusCode: 301,
        headers: {
            Location: '/?client_id=' + client_id + '&redirect_url=' + redirect_url,
        }
    };
}

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }

    switch (event.queryStringParameters.response_type) {
        case ('code'):
            return handlePKCE(event);

        case ('id_token'):
            return handleImplicit(event);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify("Response type is missing or invalid"),
            };
    }
};