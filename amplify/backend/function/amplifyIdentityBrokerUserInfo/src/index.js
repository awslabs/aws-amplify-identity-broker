/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

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
