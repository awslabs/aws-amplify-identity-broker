/*
    Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
    SPDX-License-Identifier: MIT
    Licensed under the MIT License. See the LICENSE accompanying this file
    for the specific language governing permissions and limitations under
    the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	HOSTING_S3ANDCLOUDFRONT_HOSTINGBUCKETNAME
	REGION
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS      = require('aws-sdk')
const dynamodb = new AWS.DynamoDB();

let tableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN;

console.log("tableName: " + tableName);
console.log("STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN: " + STORAGE_AMPLIFYIDENTITYBROKERCLIENTSTABLE_ARN);

if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
  console.debug("Table Name: " + tableName);
}

exports.handler = async (event) => {
    let queryParams = {
        TableName: tableName
    }

    let response = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };
    dynamodb.scan(queryParams, (err, data) => {
        if (err) {
            console.error("error: " + err);
            response.body       = JSON.stringify({error: 'Could not load clients: ' + err});
            response.statusCode = 500;
        } else {
            console.debug("success");
            response.body       = JSON.stringify(data.Items);
            response.statusCode = 200;
        }

        console.debug("response");
        console.debug(JSON.stringify(response));

        return response;
    });
};
