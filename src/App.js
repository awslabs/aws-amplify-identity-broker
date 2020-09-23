/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { Auth, Amplify } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifyForgotPassword, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { eraseCookie, storeTokens, setTokenCookie, setRefreshTokenCookie } from './helpers'
import awsconfig from './aws-exports';

var Config = require("Config");

Amplify.configure({
  ...awsconfig,
  Auth: {
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: Config.authenticationFlowType !== undefined ? Config.authenticationFlowType : "USER_SRP_AUTH",
  },
});
I18n.putVocabularies(strings);

const socialIdPs = ["LoginWithAmazon", "Facebook", "Google"];

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    let lang = "en";
    if (navigator.language === "fr" || navigator.language.startsWith("fr-")) {
      lang = { lang: "fr" };
    }

    this.state = {
      lang: lang,
      authState: AuthState.SignIn
    };

    onAuthUIStateChange(newAuthState => {
      this.handleAuthUIStateChange(newAuthState)
    })

    this.IdPLogin = Config.providers.length !== 0 ? true : false;
    this.amazonLogin = Config.providers.includes("LoginWithAmazon");
    this.facebookLogin = Config.providers.includes("Facebook");
    this.googleLogin = Config.providers.includes("Google");
    this.SAMLIdPs = Config.providers.filter(value => !socialIdPs.includes(value));
    this.SAMLLogin = this.SAMLIdPs.length !== 0 ? true : false;

    this.handleIdPLogin = this.handleIdPLogin.bind(this);
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

  handleIdPLogin(identity_provider) {
    // Store redirect_uri/authorization_code in local storage to be used to later
    let queryStringParams = new URLSearchParams(window.location.search);
    let redirect_uri = queryStringParams.get('redirect_uri');
    let authorization_code = queryStringParams.get('authorization_code');
    if (redirect_uri) {
      localStorage.setItem(`client-redirect-uri`, redirect_uri);
    }
    if (authorization_code) {
      localStorage.setItem(`authorization_code`, authorization_code);
    }
    Auth.federatedSignIn({ provider: identity_provider });
  }


  async handleAuthUIStateChange(authState) {
    if (authState === AuthState.SignedIn) {
      var redirect_uri;
      var authorization_code;
      let queryStringParams = new URLSearchParams(window.location.search);
      let qsRedirectUri = queryStringParams.get('redirect_uri');
      let qsAuthorizationCode = queryStringParams.get('authorization_code');

      if (qsRedirectUri) { // For a local sign in the redirect_uri/authorization_code will be in the query string params
        redirect_uri = qsRedirectUri;
        authorization_code = qsAuthorizationCode;
      } else { // For a federated sign in the redirect_uri/authorization_code will be in the local storage
        redirect_uri = localStorage.getItem('client-redirect-uri');
        authorization_code = localStorage.getItem('authorization_code');
        localStorage.removeItem(`client-redirect-uri`);
        localStorage.removeItem(`authorization_code`);
      }

      let authInfo = await Auth.currentSession();
      let idToken = authInfo.idToken.jwtToken;
      let accessToken = authInfo.accessToken.jwtToken;
      let refreshToken = authInfo.refreshToken.token;

      if (idToken && accessToken && refreshToken) {
        // Set the ID and access token cookies for fast SSO
        setTokenCookie("id_token", idToken);
        setTokenCookie("access_token", accessToken);
        // Set the refresh token cookie. Refresh token cannot be parsed for an an expiry so use the access token to get an expiry.
        // Although the refresh token has a different (longer) expiry than the access token, this is for the purpose of fast SSO, 
        // so the refresh token cookie will get set again when the id or access token cookie expires
        setRefreshTokenCookie(refreshToken, accessToken);
      }
      else {
        console.error("Inconsistent application state: Tokens missing from current session");
        return;
      }

      if (authorization_code && redirect_uri) { // PKCE Flow
        const response = await storeTokens(authorization_code, idToken, accessToken, refreshToken) // Store tokens in dynamoDB
        if (response.status === 200) {
          window.location.replace(redirect_uri + '/?code=' + authorization_code);
        }
        else {
          console.error("Could not store tokens. Server response: " + response.data);
        }
      }
      else if (redirect_uri) { // Implicit Flow
        window.location.replace(redirect_uri + '/?id_token=' + idToken);
      }
      else { // Sign in directly to broker (not from redirect from client as part of oauth2 flow)
        window.location.href = '/settings';
      }
    }
    else if (authState === AuthState.SignedOut) {
      eraseCookie("id_token");
      eraseCookie("access_token");
      eraseCookie("refresh_token");
    }
    this.setState({ authState: authState });
    console.log("New authState = " + authState);
  }

  render() {
    console.log(Auth);
    var SAMLLoginButtons = this.SAMLIdPs.map(IdP => <button className="saml btn" key={IdP} onClick={() => this.handleIdPLogin(IdP)}>{I18n.get(IdP)}</button>);
    return (
      <div>
        <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
        <div className="container">
          {
            this.state.authState === AuthState.SignIn &&
            this.SAMLLogin &&
            <div>
              {SAMLLoginButtons}
            </div>
          }
          {
            this.state.authState === AuthState.SignIn &&
            this.amazonLogin &&
            <button className="amazon btn" onClick={() => this.handleIdPLogin('LoginWithAmazon')}> <i className="fa fa-amazon fa-fw"></i>{I18n.get("AMAZON_SIGNIN")}</button>
          }
          {
            this.state.authState === AuthState.SignIn &&
            this.googleLogin &&
            <button className="google btn" onClick={() => this.handleIdPLogin('Google')}> <i className="fa fa-google fa-fw"></i>{I18n.get("GOOGLE_SIGNIN")}</button>
          }
          {
            this.state.authState === AuthState.SignIn &&
            this.facebookLogin &&
            <button className="fb btn" onClick={() => this.handleIdPLogin('Facebook')}> <i className="fa fa-facebook fa-fw"></i>{I18n.get("FACEBOOK_SIGNIN")}</button>
          }
          {
            this.state.authState === AuthState.SignIn &&
            this.IdPLogin &&
            <div className="hr-sect">{I18n.get("OR")}</div>
          }
          <AmplifyAuthenticator usernameAlias="email" style={{ textAlign: 'center' }}>
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
              ]}>
              <div slot="federated-buttons"></div>
            </AmplifySignIn>
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
                /**  Here an example of a custom attribute insertion:
                 * 
                 * This assume that the custom field customer-type 
                 * is defined in file amplify/backend/auth/amplifyIdentityBrokerAuth/amplifyIdentityBrokerAuth-cloudformation-template.yml
                 * 
                 *         - Name: customer-type
                 *           Mutable: true
                 *           Required: false
                 *           AttributeDataType: String
                 * 
                ,{
                  
                  label: I18n.get("YOUR_LABEL"),
                  type: "custom:customer-type",
                  value: "anything",
                  required: false,
                }
                */
              ]}></AmplifySignUp>
            <AmplifyConfirmSignUp
              usernameAlias="email"
              slot="confirm-sign-up"
              formFields={[
                {
                  type: "email",
                  required: false,
                  label: I18n.get("VERIFY_EMAIL"),
                  inputProps: {
                    type: 'hidden',
                  }
                }
              ]}></AmplifyConfirmSignUp>

            <div>
              {I18n.get("WAIT_REDIRECTION")}
              <AmplifySignOut />
            </div>
          </AmplifyAuthenticator>
        </div>
      </div>
    );
  }
}

export default App;
