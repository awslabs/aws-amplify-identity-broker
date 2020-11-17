/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/*
 *  Store redirect_uri/authorization_code in local storage to be used to later
 */

import { Auth } from 'aws-amplify';

async function handleIdpLogin(identity_provider) {
	const queryStringParams = new URLSearchParams(window.location.search);
	const redirect_uri = queryStringParams.get("redirect_uri");
	const authorization_code = queryStringParams.get("authorization_code");
	const clientState = queryStringParams.get("state");

	if (redirect_uri) {
		localStorage.setItem(`client-redirect-uri`, redirect_uri);
	}
	if (authorization_code) {
		localStorage.setItem(`authorization_code`, authorization_code);
	}
	if (clientState) {
		localStorage.setItem(`client-state`, clientState);
	}

	await Auth.federatedSignIn({ provider: identity_provider });
};

export default handleIdpLogin;
