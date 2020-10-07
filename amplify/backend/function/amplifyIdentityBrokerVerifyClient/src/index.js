/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/* Amplify Params - DO NOT EDIT
    AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }
    var userPoolId = process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID;
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
        ClientId: client_id,
        UserPoolId: userPoolId
    };

    try {
        data = await cognitoidentityserviceprovider.describeUserPoolClient(params).promise();
        if (data.UserPoolClient && data.UserPoolClient.LogoutURLs) {
            for (var i = 0; i < data.UserPoolClient.LogoutURLs.length; i++) {
                if(data.UserPoolClient.LogoutURLs[i] === logout_uri) { // If we have a URL that match it is a success
                    return {
                        statusCode: 200,
                        body: JSON.stringify('Client and logout URI are valid'),
                    };
                }
            };
        }
    } catch (error) {
        console.error(error); // Most probable reason, the client_id doesn't exist in the Cognito user pool
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Client and logout URI are not valid'),
    };
};