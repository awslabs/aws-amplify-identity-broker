/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

exports.handler = async (event) => {
    // TODO remove the logs
    console.log(event);
    console.log("token = " + event.request.challengeAnswer);
    // TODO: Check the token against Cognito, and only return the token if the user is the same and the token valid
    event.response.answerCorrect = true;
    return event;
};
