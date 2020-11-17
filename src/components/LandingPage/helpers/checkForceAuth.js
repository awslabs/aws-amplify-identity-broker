/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/*
 * If the token swap failed in Authorize lambda then we logout before continuing PKCE
 */

import { Auth } from 'aws-amplify';

import { eraseCookie } from './cookieHelper';

const checkForceAuth = async () => {
	const forceAuth = new URLSearchParams(window.location.search).get("forceAuth") || false;

	if (forceAuth) {
		eraseCookie("id_token");
		eraseCookie("access_token");
		eraseCookie("refresh_token");

		localStorage.removeItem("client-id");

		await Auth.signOut();
	}
};

export default checkForceAuth;
