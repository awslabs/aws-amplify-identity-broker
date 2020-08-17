/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { Auth } from 'aws-amplify';
import { eraseCookie } from './helpers'

class Logout extends React.Component {
    componentDidMount() {
        // Sign out the user and erase the id_token cookie
        Auth.signOut();
        eraseCookie("id_token");
        eraseCookie("access_token");

        // Accept requests according to https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
        let queryStringParams = new URLSearchParams(window.location.search);
        let clientID = queryStringParams.get('client_id');
        let logoutURI = queryStringParams.get('logout_uri');
        let redirectURI = queryStringParams.get('redirect_uri');
        let responseType = queryStringParams.get('response_type');
        let codeChallenge = queryStringParams.get('code_challenge');
        let codeChallengeMethod = queryStringParams.get('code_challenge_method');

        if (clientID && logoutURI) { // Redirect back to client
            // TODO: Check clientID and logoutURI agaisnt entry in dynamoDB
            window.location.assign(logoutURI);
        }
        else if (responseType === "id_token" && clientID && redirectURI) { // Call authorize endpoint to start implicit flow
            let authorizeEndpointPath = '/oauth2/authorize/?response_type=' + responseType + "&client_id=" + clientID + "&redirect_uri=" + redirectURI;
            window.location.href = authorizeEndpointPath;
        }
        else if (responseType === "code" && clientID && redirectURI && codeChallenge && codeChallengeMethod) { // Call authorize endpoint to start PKCE flow
            let authorizeEndpointPath = '/oauth2/authorize/?response_type=' + responseType + "&client_id=" + clientID + "&redirect_uri=" + redirectURI
                + "&code_challenge=" + codeChallenge + "&code_challenge_method=" + codeChallengeMethod;
            window.location.href = authorizeEndpointPath;
        }
        else { // Default to redirecting to the broker login page
            window.location.href = '/';
        }
    }

    render() { return null; }
}

export default Logout;
