/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import { storeTokens, setTokenCookie, setRefreshTokenCookie } from './tokenHelper';
import { eraseCookie } from './cookieHelper';

const handleAuthUIStateChange = async (authState) => {
	if (authState === AuthState.SignedIn) {
		//props.setAuth(true);

		var redirect_uri;
		var authorization_code;
		var clientState;
		let queryStringParams = new URLSearchParams(window.location.search);
		let qsRedirectUri = queryStringParams.get('redirect_uri');
		let qsAuthorizationCode = queryStringParams.get('authorization_code');
		let qsClientState = queryStringParams.get('state');

		/*
		 * For a local sign in the redirect_uri/authorization_code will be in the query string params
		 */
		if (qsRedirectUri) {
			redirect_uri = qsRedirectUri;
			authorization_code = qsAuthorizationCode;
			clientState = qsClientState;
		} else {
			/*
			 * For a federated sign in the redirect_uri/authorization_code will be in the local storage
			 */
			redirect_uri = localStorage.getItem('client-redirect-uri');
			authorization_code = localStorage.getItem('authorization_code');
			clientState = localStorage.getItem('client-state');
			localStorage.removeItem(`client-redirect-uri`);
			localStorage.removeItem(`authorization_code`);
			localStorage.removeItem(`client-state`);
		}

		/*
		 * get the current user session
		 */
		let authInfo = await Auth.currentSession();

		let idToken = authInfo.idToken.jwtToken;
		let accessToken = authInfo.accessToken.jwtToken;
		let refreshToken = authInfo.refreshToken.token;

		/*
		 * Set the ID and access token cookies for fast SSO
		 */
		if (idToken && accessToken && refreshToken) {
			setTokenCookie("id_token", idToken);
			setTokenCookie("access_token", accessToken);

			/*
			 * Set the refresh token cookie. Refresh token cannot be parsed for an an expiry so use the access token to get an expiry.
			 * Although the refresh token has a different (longer) expiry than the access token, this is for the purpose of fast SSO,
			 * so the refresh token cookie will get set again when the id or access token cookie expires
			 */
			setRefreshTokenCookie(refreshToken, accessToken);
		}
		else {
			console.error("Inconsistent application state: Tokens missing from current session");
			return;
		}

		if (authorization_code && redirect_uri) {
			/*
			 * PKCE Flow
			 */

			//Store tokens in DynamoDB
			const response = await storeTokens(authorization_code, idToken, accessToken, refreshToken)

			if (response.status === 200) {
				window.location.replace(redirect_uri + '/?code=' + authorization_code + ((clientState !== undefined) ? "&state=" + clientState : ""));
			}
			else {
				console.error("Could not store tokens. Server response: " + response.data);
			}
		}
		else if (redirect_uri) {
			/*
			 * Implicit Flow
			 */
			window.location.replace(redirect_uri + '/?id_token=' + idToken + ((clientState !== undefined) ? "&state=" + clientState : ""));
		}
		else {
			/*
			 * Sign in directly to broker (not from redirect from client as part of oauth2 flow)
			 */
			//props.history.push('/dashboard');
		}
	}
	else if (authState === AuthState.SignedOut) {
		eraseCookie("id_token");
		eraseCookie("access_token");
		eraseCookie("refresh_token");
	}
}

export default handleAuthUIStateChange
