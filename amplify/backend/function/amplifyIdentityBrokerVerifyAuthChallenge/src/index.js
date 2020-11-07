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
	var params = {
		AccessToken: event.request.challengeAnswer
	};
	var userInfo = await cognitoidentityserviceprovider.getUser(params).promise();

	if (userInfo.Username === event.username) {
		event.response.answerCorrect = true;
	} else {
		// Someone tried to get a token of someone else
		event.response.answerCorrect = false;
	}
	return event;
};
