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
const CODE_LIFE = 600000; // How long in milliseconds the authorization code can be used to retrieve the tokens from the table (10 minutes)
const RECORD_LIFE = 900000; // How long in milliseconds the record lasts in the dynamoDB table (15 minutes)

var kmsClient = new AWS.KMS();
var keyIdAlias = "alias/amplifyIdentityBrokerTokenStorageKey-" + process.env.ENV;

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME;
var clientsTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME;

async function encryptToken(token) {
    var params = {
        KeyId: keyIdAlias,
        Plaintext: token
    };
    return new Promise(function(resolve, reject) {
        kmsClient.encrypt(params, function(err, data) {
            if (err){
                console.error(err, err.stack);
                reject(err);
            }
            else {
            // Encryption has been successful
            var encryptedToken = data.CiphertextBlob;
            resolve(encryptedToken);
            }
        });
    });
}

async function getCookiesFromHeader(headers) {
    if (headers === null || headers === undefined || headers.Cookie === undefined) {
        return {};
    }

    var list = {},
        rc = headers.Cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        var key = parts.shift().trim();
        var value = decodeURI(parts.join('='));
        if (key != '') {
            list[key] = value;
        }
    });

    return list;
}

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
    const currentTime = Date.now();
    const codeExpiry = currentTime + CODE_LIFE;
    const recordExpiry = currentTime + RECORD_LIFE;
    var params;

    var cookies = await getCookiesFromHeader(event.headers);
    var canReturnTokensDirectly = cookies.id_token && cookies.access_token ? true : false; // If there is already an id_token and access_token cookie we can return the tokens directly

    if (canReturnTokensDirectly) {

        var encrypted_id_token = await encryptToken(cookies.id_token);
        var encrypted_access_token = await encryptToken(cookies.access_token);

        params = { // Add tokens from cookie to what is being stored in dynamodb
            TableName: codesTableName,
            Item: {
                authorization_code: authorizationCode,
                code_challenge: code_challenge,
                client_id: client_id,
                redirect_uri: redirect_uri,
                code_expiry: codeExpiry,
                record_expiry: recordExpiry,
                id_token: encrypted_id_token,
                access_token: encrypted_access_token
            }
        };
    }
    else {
        params = {
            TableName: codesTableName,
            Item: {
                authorization_code: authorizationCode,
                code_challenge: code_challenge,
                client_id: client_id,
                redirect_uri: redirect_uri,
                code_expiry: codeExpiry,
                record_expiry: recordExpiry
            }
        };
    }

    try {
        var result = await docClient.put(params).promise();
    } catch (error) {
        console.error(error);
    }

    if (canReturnTokensDirectly) {
        return { // Redirect directly to client application passing the authorization code
            statusCode: 302,
            headers: {
                Location: redirect_uri + '/?code=' + authorizationCode,
            }
        };
    }
    else {
        return { // Redirect to login page
            statusCode: 302,
            headers: {
                Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&authorization_code=' + authorizationCode,
            }
        };
    }
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

    var cookies = await getCookiesFromHeader(event.headers);
    var canReturnTokensDirectly = cookies.id_token ? true : false; // If there is already an id_token cookie we can return it directly

    if (canReturnTokensDirectly) {
        return { // Redirect directly to client application with ID token from cookie
            statusCode: 302,
            headers: {
                Location: redirect_uri + '/?id_token=' + cookies.id_token,
            }
        };
    }
    else {
        return { // Redirect to login page
            statusCode: 302,
            headers: {
                Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri,
            }
        };
    }
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