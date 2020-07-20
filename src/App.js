/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 
Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
or in the "license" file accompanying this file. This file is distributed 
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied. See the License for the specific language governing 
permissions and limitations under the License. */

import React from 'react';
import { Auth, Amplify } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifySelectMfaType, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import axios from 'axios';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

I18n.putVocabularies(strings);

// const MFATypeOptions = {
//   SMS: true,
//   TOTP: true,
//   Optional: true,
// };

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    if (navigator.language === "fr" || navigator.language.startsWith("fr-")) {
      this.state = { lang: "fr" };
    } else {
      this.state = { lang: "en" };
    }
    onAuthUIStateChange(newAuthState => {
      this.handleAuthUIStateChange(newAuthState)
    })
  }

  toggleLang = () => {
    if (this.state.lang === "en") {
      I18n.setLanguage("fr");
      this.setState({ lang: "fr" });
    } else {
      I18n.setLanguage("en");
      this.setState({ lang: "en" });
    }
  }

  async handleAuthUIStateChange(authState) {
    if (authState === "signedin") {
      let queryStringParams = new URLSearchParams(window.location.search);
      let redirect_uri = queryStringParams.get('redirect_uri');
      let authorization_code = queryStringParams.get('authorization_code');
      let authInfo = await Auth.currentSession();
      let idToken = authInfo.idToken.jwtToken;

      if (authorization_code && redirect_uri) { // PKCE Flow
        let accessToken = authInfo.accessToken.jwtToken;
        let refreshToken = authInfo.refreshToken.token;
        if (idToken && accessToken && refreshToken) {
          const response = await axios.post( // Store tokens in dynamodb using storage endpoint
            '/storage',
            {
              authorization_code: authorization_code,
              id_token: idToken,
              access_token: accessToken,
              refresh_token: refreshToken
            },
            { headers: { 'Content-Type': 'application/json' } }
          )
          if (response.status === 200) {
            window.location.replace(redirect_uri + '/?code=' + authorization_code);
          }
        }
      }
      else if (redirect_uri && idToken) { // Implicit Flow
        window.location.replace(redirect_uri + '/?id_token=' + idToken);
      }
    }
  }
  // Issue on translation of subfield is https://github.com/aws-amplify/amplify-js/issues/5679

  render = () => (
    <div>
      <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
      <div style={styles.container}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifyForgotPassword
            usernameAlias="email"
            slot="forgot-password"
            formFields={[
              {
                type: "email",
                required: true,
              },
            ]}></AmplifyForgotPassword>
          <AmplifySignIn
            usernameAlias="email"
            slot="sign-in"
            formFields={[
              {
                type: "email",
                required: true,
              },
              {
                type: "password",
                required: true,
              }
            ]}></AmplifySignIn>
          <AmplifySignUp
            usernameAlias="email"
            slot="sign-up"
            formFields={[
              {
                type: "email",
                required: true,
              },
              {
                type: "password",
                required: true,
              },
              {
                type: "phone_number",
                required: false,
              },
              {
                type: "locale",
                value: this.state.lang,
                inputProps: {
                  type: 'hidden',
                }
              }
            ]}></AmplifySignUp>
          <div>
            You have successfully logged in, please wait while redirecting...
          <AmplifySignOut />
          </div>
        </AmplifyAuthenticator>
      </div>
    </div>
  );
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default App;
