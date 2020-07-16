/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 
Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
or in the "license" file accompanying this file. This file is distributed 
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied. See the License for the specific language governing 
permissions and limitations under the License. */

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

    if (authorization_code === undefined || id_token === undefined || access_token === undefined || refresh_token === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Body missing values'),
        };
    }

    var params = {
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
