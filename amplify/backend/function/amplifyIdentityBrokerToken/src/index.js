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
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const crypto = require('crypto');
const qs = require('querystring');

var docClient = new AWS.DynamoDB.DocumentClient();
var cognitoSP = new AWS.CognitoIdentityServiceProvider();
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
    var grant_type = jsonBody.grant_type;
    var client_id = jsonBody.client_id;

    if (client_id === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("client_id is missing"),
        };
    }

    if (grant_type === "authorization_code") {
        var authorization_code = jsonBody.authorization_code;
        var redirect_uri = jsonBody.redirect_uri;
        var code_verifier = jsonBody.code_verifier;
        if (redirect_uri === undefined || authorization_code === undefined || code_verifier == undefined) {
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
        if (data.Item.redirect_uri != redirect_uri) {
            return {
                statusCode: 400,
                body: JSON.stringify('Redirect uri does not match authorization code'),
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
        var refresh_token = data.Item.refresh_token;

        if (access_token === undefined || id_token === undefined || refresh_token === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify('Could not find tokens'),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*" // Required for CORS support to work
            },
            body: JSON.stringify({
                "access_token": access_token,
                "id_token": id_token,
                "refresh_token": refresh_token,
                "token_type": "Bearer"
            }),
        };
    }
    else if (grant_type === "refresh_token") {
        var refresh_token = jsonBody.refresh_token;
        if (refresh_token === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify("refresh_token is missing"),
            };
        }

        var params = {
            AuthFlow: 'REFRESH_TOKEN',
            ClientId: client_id,
            AuthParameters: {
                "REFRESH_TOKEN": refresh_token
            }
        }

        var cognitoResponse = await cognitoSP.initiateAuth(params).promise(); // Call Cognito with refresh token to get refreshed id and access tokens
        var access_token = cognitoResponse.AuthenticationResult.AccessToken;
        var id_token = cognitoResponse.AuthenticationResult.IdToken;

        if (access_token === undefined || id_token === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify('Could not refresh tokens'),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*" // Required for CORS support to work
            },
            body: JSON.stringify({
                "access_token": access_token,
                "id_token": id_token,
                "token_type": "Bearer"
            }),
        };
    }
    else {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*" // Required for CORS support to work
            },
            body: JSON.stringify("Invalid grant type"),
        };
    }
};
