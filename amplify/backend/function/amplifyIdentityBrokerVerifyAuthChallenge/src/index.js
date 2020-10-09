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
    // TODO remove the logs
    console.log(event);
    console.log("token = " + event.request.challengeAnswer);
    // TODO: Check the token against Cognito, and only return the token if the user is the same and the token valid
    
    var params = {
      AccessToken: event.request.challengeAnswer
    };
    var userInfo = await cognitoidentityserviceprovider.getUser(params).promise();
    
    console.log(userInfo);
    //console.log("equals? = "( userInfo.Username === event.username ));

    event.response.answerCorrect = true;
    return event;
};
