/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/* Amplify Params - DO NOT EDIT
    API_AMPLIFYIDENTITYBROKERAPI_APIID
	API_AMPLIFYIDENTITYBROKERAPI_APINAME
	ENV
	REGION
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS              = require('aws-sdk');
const docClient        = new AWS.DynamoDB.DocumentClient();
const clientsTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME;

exports.handler = async (event) => {
    let data;
    let params = {
        TableName: clientsTableName,
        AttributesToGet: ["logback_uri", "client_id", "client_name"]
    };

    console.debug("params: " + JSON.stringify(params));

    try {
        data = await docClient.scan(params).promise();
    } catch (error) {
        console.error(error);
    }

    if (data.Items) {
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
};
