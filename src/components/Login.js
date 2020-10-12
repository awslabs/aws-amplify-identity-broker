import React, { Component } from 'react';
import { AmplifySignIn } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';

class Login extends Component {
  render() {
    return (
      <div className="login">
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
      </div>
    );
  }
}

export default Login;