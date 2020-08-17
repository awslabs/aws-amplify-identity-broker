/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import axios from 'axios';

export function setCookie(name, value, expiry) {
    var expires = "";
    if (expiry) {
        var date = new Date(expiry * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export async function storeTokens(authorization_code, idToken, accessToken, refreshToken) {
    var response;
    if (refreshToken) {
        response = await axios.post( // Call storage endpoint to store tokens in dynamoDB
            '/storage',
            {
                authorization_code: authorization_code,
                id_token: idToken,
                access_token: accessToken,
                refresh_token: refreshToken
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
    }
    else {
        response = await axios.post( // Call storage endpoint to store tokens in dynamoDB
            '/storage',
            {
                authorization_code: authorization_code,
                id_token: idToken,
                access_token: accessToken
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
    }
    return response;
}