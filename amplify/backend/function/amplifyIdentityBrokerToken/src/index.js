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

var kmsClient = new AWS.KMS();

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
    var redirect_uri = jsonBody.redirect_uri;
    var code_verifier = jsonBody.code_verifier;
    if (client_id === undefined || redirect_uri === undefined || authorization_code === undefined || code_verifier == undefined) {
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

    if (access_token === undefined || id_token === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Could not find tokens'),
        };
    }

    try {
        // Decrypt the tokens
        const access_token_req = { CiphertextBlob: Buffer.from(access_token, 'base64') };
        const access_token_data = await kmsClient.decrypt(access_token_req).promise();
        access_token_clear_text = access_token_data.Plaintext.toString('ascii');

        const id_token_req = { CiphertextBlob: Buffer.from(id_token, 'base64') };
        const id_token_data = await kmsClient.decrypt(id_token_req).promise();
        id_token_clear_text = id_token_data.Plaintext.toString('ascii');
    } catch (err) {
        console.error('Decrypt error:', err);
        return {
            statusCode: 400,
            body: JSON.stringify('Could not decrypt tokens'),
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify({
            "access_token": access_token_clear_text,
            "id_token": id_token_clear_text,
            "token_type": "Bearer"
        }),
    };
};
