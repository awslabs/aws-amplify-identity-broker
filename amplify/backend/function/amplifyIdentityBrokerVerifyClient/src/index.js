/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/* Amplify Params - DO NOT EDIT
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();
var clientsTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME;

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }
    var client_id = event.queryStringParameters.client_id;
    var logout_uri = event.queryStringParameters.logout_uri;
    if (client_id === undefined || logout_uri === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

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
    if (data.Item && (data.Item.logout_uri === logout_uri)) {
        return {
            statusCode: 200,
            body: JSON.stringify('Client and logout URI are valid'),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Client and logout URI are not valid'),
    };
};
