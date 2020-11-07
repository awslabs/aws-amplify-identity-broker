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
	REGION
Amplify Params - DO NOT EDIT */

'use strict';
// For Demostration purposes we are migrating from another AWS Cognitio UserPool

// Fill in ClientID about your Idenity Provider you are trying to migrate from
var OLD_CLIENTID = '703d2gqubii5hnk04pl3vep2ht';
// Fill in UserPoolID about your Idenity Provider you are trying to migrate from
var OLD_USERPOOLID = 'us-west-2_KMqZc7AhY';
var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

exports.handler = (event, context, callback) => {

	if (event.triggerSource == "UserMigration_Authentication") {
		var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
		console.log(event);

		// Setup the infomation for initateAuth
		var params = {
			AuthFlow: "USER_PASSWORD_AUTH",
			ClientId: OLD_CLIENTID,
			AuthParameters: {
				'USERNAME': event.userName,
				'PASSWORD': event.request.password
			}
		};
		// authenticate the user with your existing user directory service, and will return a access token needed for the next function parameter
		cognitoidentityserviceprovider.initiateAuth(params, function (err, data) {
			if (data) {
				// successful response
				console.log("Verified user with existing system: " + event.userName);
				console.log(data.AuthenticationResult.AccessToken);
				//Send Access token retrieved from authenticating to migrate old user attributes to current userpool for creation 
				params = { AccessToken: data.AuthenticationResult.AccessToken };
				//Retrieved user attributes
				cognitoidentityserviceprovider.getUser(params, function (err, data) {
					// an error occurred
					if (err) console.log(err, err.stack);
					else {
						// Succesful
						console.log('Getting user.');
						//Start String manipulation to make it the right format for user creation
						var useratt = data.UserAttributes;
						useratt.shift();
						var attributes = {};
						for (var i = 0; i < useratt.length; i++) {
							attributes[useratt[i].Name] = useratt[i].Value;
						}
						event.response.userAttributes = attributes;
						event.response.finalUserStatus = "CONFIRMED";
						event.response.messageAction = "SUPPRESS";
						context.succeed(event);
						//User has been created and status is also Confirmed. The Client show automatically sign them in.                            
					}
				});
			}
			else {
				// Return error to Amazon Cognito
				callback("Bad password");
			}
		});
	}
	else if (event.triggerSource == "UserMigration_ForgotPassword") {

		// Lookup the user in your existing user directory service
		var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
		var params = {
			UserPoolId: OLD_USERPOOLID,
			Username: event.userName
		};
		// Lookup the user in your existing user directory service and retrieved user attrubites
		cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
			if (data) {
				console.log('Getting user.');
				//Start String manipulation to make it the right format for user creation
				var useratt = data.UserAttributes;
				useratt.shift();
				var attributes = {};
				for (var i = 0; i < useratt.length; i++) {
					attributes[useratt[i].Name] = useratt[i].Value;
				}
				console.log(attributes);
				event.response.userAttributes = attributes;
				event.response.messageAction = "SUPPRESS";
				context.succeed(event);
				//User has been created and status is also Confirmed. The Client show automatically send them a reset code and move them into the reset password screen.
			}
			else {
				// an error occurred
				console.log(err, err.stack)
				// Return error to Amazon Cognito
				callback("Bad password");
			}
		});
	}
	else {
		// Return error to Amazon Cognito
		callback("Bad triggerSource " + event.triggerSource);
	}
};






