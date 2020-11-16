/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setCookie } from './cookieHelper';

export async function storeTokens(authorization_code, idToken, accessToken, refreshToken) {
	/*
	 * Call storage endpoint to store tokens in DynamoDB
	 */
	var response = await axios.post(
		'/storage',
		{
			authorization_code: authorization_code,
			id_token: idToken,
			access_token: accessToken,
			refresh_token: refreshToken
		},
		{ headers: { 'Content-Type': 'application/json' } }
	)
	return response;
}

export function setTokenCookie(type, token) {
	let tokenDecoded = jwt_decode(token);
	let tokenExpiry = tokenDecoded['exp'];
	setCookie(type, token, tokenExpiry);
}

export function setRefreshTokenCookie(refreshToken, accessToken) { // Use expiry of access token to set the refresh token cookie
	let tokenDecoded = jwt_decode(accessToken);
	let tokenExpiry = tokenDecoded['exp'];
	setCookie("refresh_token", refreshToken, tokenExpiry);
}
