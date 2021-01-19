/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

exports.handler = async (event) => {
	// This function define the sequence to obtain a valid token from a valid token of another client
	if (event.request.session.length == 0) {
		// This is the first invocation, we ask for a custom challenge (providing a valid token)
		event.response.issueTokens = false;
		event.response.failAuthentication = false;
		event.response.challengeName = 'CUSTOM_CHALLENGE';
	} else if (event.request.session.length == 1 && event.request.session[0].challengeName == 'CUSTOM_CHALLENGE' && event.request.session[0].challengeResult == true ) {
		// The custom challenge has been answered we retrun the token
		event.response.issueTokens = true;
		event.response.failAuthentication = false;
	}
	return event;
};
