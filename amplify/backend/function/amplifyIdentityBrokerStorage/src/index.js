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

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME;

exports.handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify('Empty body'),
        };
    }

    var jsonBody = JSON.parse(event.body);
    var authorization_code = jsonBody.authorization_code;
    var id_token = jsonBody.id_token;
    var access_token = jsonBody.access_token;
    var refresh_token = jsonBody.refresh_token;

    if (authorization_code === undefined || id_token === undefined || access_token === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Body missing values'),
        };
    }


    var params;
    if (refresh_token === undefined) {
        params = {
            TableName: codesTableName,
            Key: {
                authorization_code: authorization_code
            },
            UpdateExpression: "SET id_token = :idt, access_token = :at",
            ExpressionAttributeValues: {
                ":idt": id_token,
                ":at": access_token
            }
        };
    }
    else {
        params = {
            TableName: codesTableName,
            Key: {
                authorization_code: authorization_code
            },
            UpdateExpression: "SET id_token = :idt, access_token = :at, refresh_token = :rt",
            ExpressionAttributeValues: {
                ":idt": id_token,
                ":at": access_token,
                ":rt": refresh_token
            }
        };
    }

    try {
        var result = await docClient.update(params).promise();
    } catch (error) {
        console.error(error);
        return {
            statusCode: 400,
            body: error,
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Inserted tokens into storage'),
    };
};
