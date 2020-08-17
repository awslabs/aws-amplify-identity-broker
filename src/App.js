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
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { setCookie, getCookie, eraseCookie, storeTokens } from './helpers'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
    if (navigator.language === "fr" || navigator.language.startsWith("fr-")) {
      this.state = { lang: "fr" };
    } else {
      this.state = { lang: "en" };
    }
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

  async componentDidMount() {
    var clientRedirectUri = null;
    var idToken = null;
    var accessToken = null;

    // Check if the page was loaded from a redirect from idp. It will have id_token and access_token in the url
    let urlValues = window.location.hash.substr(1);
    let urlKeyPairs = urlValues.split('&');
    let tokens = {};
    urlKeyPairs.forEach(function (item, index) {
      let pair = item.split('=');
      tokens[pair[0]] = pair[1];
    });

    if (tokens['id_token'] && tokens['access_token']) { // If the page was loaded from a redirect from idp 
      idToken = tokens['id_token'];
      accessToken = tokens['access_token'];
      var idTokenDecoded = jwt_decode(idToken);
      var tokenExpiry = idTokenDecoded['exp'];
      setCookie("id_token", idToken, tokenExpiry);

      clientRedirectUri = localStorage.getItem(`client-redirect-uri`);
      localStorage.removeItem('client-redirect-uri');
      var authorization_code = localStorage.getItem(`authorization_code`);
      localStorage.removeItem(`authorization_code`);

      if (clientRedirectUri) {
        if (authorization_code) { // PKCE Flow
          setCookie("access_token", accessToken, tokenExpiry);
          const response = await storeTokens(authorization_code, idToken, accessToken) // Store tokens in dynamoDB
          if (response.status === 200) {
            window.location.replace(clientRedirectUri + '/?code=' + authorization_code);
          }
        }
        else { // Implicit Flow
          const clientURL = new URL(clientRedirectUri);
          clientURL.search = new URLSearchParams({
            id_token: idToken
          });
          window.location.assign(clientURL.href);
        }
      }
    }
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
    let queryStringParams = new URLSearchParams(window.location.search);
    let redirect_uri = queryStringParams.get('redirect_uri');
    let authorization_code = queryStringParams.get('authorization_code');
    if (redirect_uri) {
      localStorage.setItem(`client-redirect-uri`, redirect_uri);
    }
    if (authorization_code) {
      localStorage.setItem(`authorization_code`, authorization_code);
    }

    const hostedUIEndpoint = new URL(Config.hostedUIUrl + '/oauth2/authorize');
    hostedUIEndpoint.search = new URLSearchParams({
      response_type: "token",
      client_id: awsconfig.aws_user_pools_web_client_id,
      redirect_uri: window.location.origin,
      identity_provider: identity_provider
    });
    window.location.assign(hostedUIEndpoint.href);
  }

  async handleAuthUIStateChange(authState) {
    if (authState === "signedin") {
      let queryStringParams = new URLSearchParams(window.location.search);
      let redirect_uri = queryStringParams.get('redirect_uri');
      let authorization_code = queryStringParams.get('authorization_code');
      let authInfo = await Auth.currentSession();
      let idToken = authInfo.idToken.jwtToken;
      var tokenExpiry;

      if (idToken) { // Set ID Token cookie for fast SSO
        var idTokenDecoded = jwt_decode(idToken);
        tokenExpiry = idTokenDecoded['exp'];
        setCookie("id_token", idToken, tokenExpiry);
      }

      if (authorization_code && redirect_uri) { // PKCE Flow
        let accessToken = authInfo.accessToken.jwtToken;
        let refreshToken = authInfo.refreshToken.token;
        if (idToken && accessToken && refreshToken) {
          setCookie("access_token", accessToken, tokenExpiry); // Set Access Token cookie for fast SSO
          const response = await storeTokens(authorization_code, idToken, accessToken, refreshToken) // Store tokens in dynamoDB
          if (response.status === 200) {
            window.location.replace(redirect_uri + '/?code=' + authorization_code);
          }
        }
      }
      else if (redirect_uri && idToken) { // Implicit Flow
        window.location.replace(redirect_uri + '/?id_token=' + idToken);
      }
    }
    else if (authState === "signedout") {
      eraseCookie("id_token");
      eraseCookie("access_token");
    }
  }

  render() {
    var SAMLLoginButtons = this.SAMLIdPs.map(IdP => <button className="saml btn" key={IdP} onClick={() => this.handleIdPLogin(IdP)}>{I18n.get(IdP)}</button>);
    return (
      <div>
        <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
        <div className="container">
          {
            this.SAMLLogin &&
            <div>
              {SAMLLoginButtons}
            </div>
          }
          {
            this.amazonLogin &&
            <button className="amazon btn" onClick={() => this.handleIdPLogin('LoginWithAmazon')}> <i className="fa fa-amazon fa-fw"></i>{I18n.get("AMAZON_SIGNIN")}</button>
          }
          {
            this.googleLogin &&
            <button className="google btn" onClick={() => this.handleIdPLogin('Google')}> <i className="fa fa-google fa-fw"></i>{I18n.get("GOOGLE_SIGNIN")}</button>
          }
          {
            this.facebookLogin &&
            <button className="fb btn" onClick={() => this.handleIdPLogin('Facebook')}> <i className="fa fa-facebook fa-fw"></i>{I18n.get("FACEBOOK_SIGNIN")}</button>
          }
          {
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
                },
                {
                  //Not possible to do a dropdown menu in the amplify sigin page. I will set a request for the amplify to get this feature added.
                  label: I18n.get("MEMBERSHIP"),
                  type: "custom:customer-type",
                  // We set the default to Standard for now, because if the user leaves the form field blank, it will send a null data type and error will be flagged.
                  // The user will override this form field if they want to set the membership other then Standard.
                  value: I18n.get("MEMBERSHIP_VALUE"),
                  required: false,
                }
              ]}></AmplifySignUp>
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
