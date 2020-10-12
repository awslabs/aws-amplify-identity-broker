import React, { Component } from 'react';
import { AmplifySignUp, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang
    }
  }

  render() {
    return (
      <div className="register">
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
          ]}>
        </AmplifySignUp>

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
          ]}>
        </AmplifyConfirmSignUp>
      </div>
    );
  }
}

export default Register;