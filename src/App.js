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

const MFATypeOptions = {
  SMS: true,
  TOTP: true,
  Optional: true,
};

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
      let redirect_url = queryStringParams.get('redirect_url');
      let authorization_code = queryStringParams.get('authorization_code');
      let authInfo = await Auth.currentSession();
      let idToken = authInfo.idToken.jwtToken;

      if (authorization_code && redirect_url) { // PKCE Flow
        let accessToken = authInfo.accessToken.jwtToken;
        let refreshToken = authInfo.refreshToken.token;
        if (idToken && accessToken) {
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
            window.location.replace(redirect_url + '/?code=' + authorization_code);
          }
        }
      }
      else if (redirect_url && idToken) { // Implicit Flow
        window.location.replace(redirect_url + '/?id_token=' + idToken);
      }
    }
  }
  // Issue on translation of subfield is https://github.com/aws-amplify/amplify-js/issues/5679

  render = () => (
    <div>
      <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
      <div style={styles.container}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>
          <AmplifyForgotPassword
            usernameAlias="email"
            slot="forgot-password"
            headerText={I18n.get("resetYourPassword")}
            submitButtonText={I18n.get("sendCode")} //Bug?
            formFields={[
              {
                type: "email",
                label: I18n.get("emailLabel"),
                placeholder: I18n.get("emailPlaceHolder"), //Bug?
                required: true,
              },
            ]}></AmplifyForgotPassword>
          <AmplifySignIn
            usernameAlias="email"
            headerText={I18n.get("signInHeader")}
            slot="sign-in"
            submitButtonText={I18n.get("signInButtonText")}
            formFields={[
              {
                type: "email",
                label: I18n.get("emailLabel"),
                placeholder: I18n.get("emailPlaceHolder"),
                required: true,
              },
              {
                type: "password",
                label: I18n.get("passwordLabel"),
                placeholder: I18n.get("passwordPlaceHolder"),
                required: true,
              }
            ]}></AmplifySignIn>
          <AmplifySignUp
            usernameAlias="email"
            headerText={I18n.get("signUpHeader")}
            slot="sign-up"
            submitButtonText={I18n.get("signUpButtonText")}
            formFields={[
              {
                type: "email",
                label: I18n.get("emailLabel"),
                placeholder: I18n.get("emailPlaceHolder"),
                required: true,
              },
              {
                type: "password",
                label: I18n.get("passwordLabel"),
                placeholder: I18n.get("passwordPlaceHolder"),
                required: true,
              },
              {
                type: "phone_number",
                label: I18n.get("phoneNumberLabel"),
                placeholder: I18n.get("phoneNumberPlaceHolder"),
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
            {/* This is not really private, you should instead use the credential to load something dynamically from the backend */}
            Private Content
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
