/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CLIENTSTABLE_ARN
	STORAGE_CLIENTSTABLE_NAME
	STORAGE_CODESTABLE_ARN
	STORAGE_CODESTABLE_NAME
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const CODE_LIFE = 900000;

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_CODESTABLE_NAME
var clientsTableName = process.env.STORAGE_CLIENTSTABLE_NAME

async function verifyClient(client_id, redirect_url) {
    var data;
    var params = {
        TableName: clientsTableName,
        Key: {
            client_id: client_id
        }
    };
    try {
        data = await docClient.get(params).promise();
    } catch (error) {
        console.error(error);
    }
    if (data.Item && (data.Item.redirect_url === redirect_url)) {
        return true;
    }
    return false;
}


async function handlePKCE(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_url = event.queryStringParameters.redirect_url;
    var code_challenge = event.queryStringParameters.code_challenge;
    var code_challenge_method = event.queryStringParameters.code_challenge_method;
    if (client_id === undefined || redirect_url === undefined || code_challenge === undefined || code_challenge_method === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    // Code to verify client. Leaving commented for now
    // var validClient = await verifyClient(client_id, redirect_url);
    // if (!validClient) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify("Invalid Client"),
    //     };
    // }

    const authorizationCode = uuidv4();
    const codeExpiry = Date.now() + CODE_LIFE;
    var params = {
        TableName: codesTableName,
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

    // Code to verify client. Leaving commented for now
    // var validClient = await verifyClient(client_id, redirect_url);
    // if (!validClient) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify("Invalid Client"),
    //     };
    // }

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