/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 
Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
or in the "license" file accompanying this file. This file is distributed 
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied. See the License for the specific language governing 
permissions and limitations under the License. */

const AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html

exports.handler = async (event) => {
    // Reference here https://docs.aws.amazon.com/cognito/latest/developerguide/userinfo-endpoint.html
    // Getting access token from access_token header which is not standard. 
    // Should get from Authorization header but that is not passed in the event through lambda proxy integration
    var accessToken = event.headers.access_token;
    if (accessToken === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Missing access token"),
        };
    }

    var params = {
        AccessToken: accessToken
    }
    var userInfo = await cognitoidentityserviceprovider.getUser(params).promise();

    // Need to change return format to match reference
    return {
        statusCode: 200,
        body: JSON.stringify(userInfo.UserAttributes),
    };
};
