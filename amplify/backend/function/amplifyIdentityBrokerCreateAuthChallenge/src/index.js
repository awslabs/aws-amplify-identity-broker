/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */
 
exports.handler = async (event) => {
    // This function does nothing, the challenge do not need to be prepared
    // Verify challenge will just verify the token provided
    event.response.publicChallengeParameters = {};
    event.response.publicChallengeParameters.question = 'JustGimmeTheToken';
    event.response.privateChallengeParameters = {};
    event.response.privateChallengeParameters.answer = 'unknown';
    event.response.challengeMetadata = 'TOKEN_CHALLENGE';

    console.log(event);
    return event;
};
