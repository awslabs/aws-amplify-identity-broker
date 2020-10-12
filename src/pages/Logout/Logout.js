/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { eraseCookie } from '../../helpers'

class Logout extends React.Component {
    componentDidMount() {
        var redirectInfo = localStorage.getItem('redirectInfo');

        if (redirectInfo) { // For handling a redirect back from the Cognito Hosted UI
            localStorage.removeItem('redirectInfo');
            var rdJSON = JSON.parse(redirectInfo);
            if (rdJSON['clientID'] && rdJSON['logoutURI']) { // Redirect back to client
                axios.get('/verifyClient', {
                    params: {
                        client_id: rdJSON['clientID'],
                        logout_uri: rdJSON['logoutURI']
                    }
                }).then(response => {
                    if (response.status === 200) {
                        window.location.assign(rdJSON['logoutURI']);
                    }
                }).catch(error => {
                    console.error(error.response)
                    window.location.href = '/';
                });
            }
            else if (rdJSON['responseType'] === "id_token" && rdJSON['clientID'] && rdJSON['redirectURI']) { // Call authorize endpoint to start implicit flow
                let authorizeEndpointPath = '/oauth2/authorize/?response_type=' + rdJSON['responseType']
                    + "&client_id=" + rdJSON['clientID'] + "&redirect_uri=" + rdJSON['redirectURI'];
                window.location.href = authorizeEndpointPath;
            }
            else if (rdJSON['responseType'] && rdJSON['clientID'] && rdJSON['redirectURI'] && rdJSON['codeChallenge'] && rdJSON['codeChallengeMethod']) { // Call authorize endpoint to start PKCE flow
                let authorizeEndpointPath = '/oauth2/authorize/?response_type=' + rdJSON['responseType'] + "&client_id=" + rdJSON['clientID']
                    + "&redirect_uri=" + rdJSON['redirectURI'] + "&code_challenge=" + rdJSON['codeChallenge']
                    + "&code_challenge_method=" + rdJSON['codeChallengeMethod'];
                window.location.href = authorizeEndpointPath;
            }
            else { // Default to redirecting to the broker login page
                window.location.href = '/';
            }
        }
        else { // If the logout endpoint is being called before the user has been logged out
            // Erase the token cookies
            eraseCookie("id_token");
            eraseCookie("access_token");
            eraseCookie("refresh_token");

            // Accept requests according to https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
            let queryStringParams = new URLSearchParams(window.location.search);
            let clientID = queryStringParams.get('client_id');
            let logoutURI = queryStringParams.get('logout_uri');
            let redirectURI = queryStringParams.get('redirect_uri');
            let responseType = queryStringParams.get('response_type');
            let codeChallenge = queryStringParams.get('code_challenge');
            let codeChallengeMethod = queryStringParams.get('code_challenge_method');

            // Store the redirect info in local storage before calling the Cognito Hosted UI to logout
            var redirectObject;
            if (clientID && logoutURI) { // For redirect to client
                redirectObject = { 'clientID': clientID, 'logoutURI': logoutURI };
            }
            else if (responseType === "id_token" && clientID && redirectURI) { // For implicit flow
                redirectObject = { 'clientID': clientID, 'responseType': responseType, 'redirectURI': redirectURI };
            }
            else if (responseType === "code" && clientID && redirectURI && codeChallenge && codeChallengeMethod) { // For PKCE flow
                redirectObject = { 'clientID': clientID, 'responseType': responseType, 'redirectURI': redirectURI, 'codeChallenge': codeChallenge, 'codeChallengeMethod': codeChallengeMethod };
            }
            else {
                redirectObject = { 'redirect': 'broker' };
            }
            localStorage.setItem('redirectInfo', JSON.stringify(redirectObject));

            // We remove the client-id used for last login
            localStorage.removeItem('client-id');

            Auth.signOut(); // Sign the user out
            window.location.reload(); // Reload the page to handle the client redirect
        }
    }

    render() { return null; }
}

export default Logout;
