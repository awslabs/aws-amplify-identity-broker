import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifySelectMfaType, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';

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
                label: I18n.get("Locale"),
                placeholder: "fr-FR, en, ...",
                //value: this.state.lang,
                //Auto populate does not work for some reason there a bug with this.state.lang
                //For now we have to type in the string itself and cannot be hidden, Ampilfy team is working on this solution
                required: true,
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
