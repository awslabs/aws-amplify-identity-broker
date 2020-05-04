import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

I18n.putVocabularies(strings);

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { lang: "en" };
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
      <AmplifyAuthenticator usernameAlias="email">
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
            }
          ]}></AmplifySignUp>
        <div>
          {/* This is not really private, you should instead use the credential to load something dynamically from the backend */}
            Private Content
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator>
    </div>
  );
}

export default App;
