/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

const AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
	// Reference: https://docs.aws.amazon.com/cognito/latest/developerguide/userinfo-endpoint.html
	// Getting access token from Authorization header and proxy to cognito

	var authHeader = event.headers.Authorization;
	if (authHeader === undefined
		|| authHeader.split(" ").length !== 2
		|| authHeader.split(" ")[0] !== "Bearer"
	) {
		return {
			statusCode: 400,
			body: JSON.stringify("Missing access token"),
		};
	}

	var accessToken = authHeader.split(" ")[1];

	var params = {
		AccessToken: accessToken
	};
	var userInfo = await cognitoidentityserviceprovider.getUser(params).promise();

	var res = userInfo.UserAttributes.reduce((a, b) => {
		a[b["Name"]] = b["Value"];
		return a;
	}, {});

	return {
		statusCode: 200,
		body: JSON.stringify(res),
	};
};
