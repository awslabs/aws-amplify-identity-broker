/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const CODE_LIFE = 900000;

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME;
var clientsTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME;

async function verifyClient(client_id, redirect_uri) {
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
    if (data.Item && (data.Item.redirect_uri === redirect_uri)) {
        return true;
    }
    return false;
}

async function handlePKCE(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_uri = event.queryStringParameters.redirect_uri;
    var code_challenge = event.queryStringParameters.code_challenge;
    var code_challenge_method = event.queryStringParameters.code_challenge_method;
    if (client_id === undefined || redirect_uri === undefined || code_challenge === undefined || code_challenge_method === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    // Verify client and redirect_uri against clients table
    var validClient = await verifyClient(client_id, redirect_uri);
    if (!validClient) {
        return {
            statusCode: 400,
            body: JSON.stringify("Invalid Client"),
        };
    }

    const authorizationCode = uuidv4();
    const codeExpiry = Date.now() + CODE_LIFE;
    var params = {
        TableName: codesTableName,
        Item: {
            authorization_code: authorizationCode,
            code_challenge: code_challenge,
            client_id: client_id,
            redirect_uri: redirect_uri,
            code_expiry: codeExpiry
        }
    };

    try {
        var result = await docClient.put(params).promise();
    } catch (error) {
        console.error(error);
    }

    return { //redirect to login page
        statusCode: 302,
        headers: {
            Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&authorization_code=' + authorizationCode,
        }
    };
}

async function handleImplicit(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_uri = event.queryStringParameters.redirect_uri;
    if (client_id === undefined || redirect_uri === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    // Verify client and redirect_uri against clients table
    var validClient = await verifyClient(client_id, redirect_uri);
    if (!validClient) {
        return {
            statusCode: 400,
            body: JSON.stringify("Invalid Client"),
        };
    }

    return { //redirect to login page
        statusCode: 302,
        headers: {
            Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri,
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