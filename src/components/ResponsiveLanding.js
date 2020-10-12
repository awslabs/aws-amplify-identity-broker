import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { I18n } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

import Login from './Login';
import Register from './Register';

var Config = require("Config");

const handleIdPLogin = (identity_provider) => {
  // Store redirect_uri/authorization_code in local storage to be used to later
  let queryStringParams  = new URLSearchParams(window.location.search);
  let redirect_uri       = queryStringParams.get('redirect_uri');
  let authorization_code = queryStringParams.get('authorization_code');
  let clientState        = queryStringParams.get('state');

  if (redirect_uri) {
    localStorage.setItem(`client-redirect-uri`, redirect_uri);
  }
  if (authorization_code) {
    localStorage.setItem(`authorization_code`, authorization_code);
  }
  if (clientState) {
    localStorage.setItem(`client-state`, clientState);
  }
  Auth.federatedSignIn({ provider: identity_provider });
}

const ResponsiveLanding = (props) => {
  console.log("props:");
  console.log(props.dynamicClassName);
  console.log(props.authState);

  var dynamicClassName = props.dynamicClassName;
  let authState        = props.authState;

  const socialIdPs = ["LoginWithAmazon", "Facebook", "Google"];

  // You can make this selection of IdP different between clients
  // for that do a describeUserPoolClient API call to Cognito with the client_id from the query
  // uses the defined IdP from SupportedIdentityProviders array
  // See: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_DescribeUserPoolClient.html
  let IdPLogin      = Config.providers.length !== 0 ? true : false;
  let amazonLogin   = Config.providers.includes("LoginWithAmazon");
  let facebookLogin = Config.providers.includes("Facebook");
  let googleLogin   = Config.providers.includes("Google");
  let SAMLIdPs      = Config.providers.filter(value => !socialIdPs.includes(value));
  let SAMLLogin     = SAMLIdPs.length !== 0 ? true : false;

  var SAMLLoginButtons = SAMLIdPs.map(IdP => <button className="saml btn" key={IdP} onClick={() => handleIdPLogin(IdP)}>{I18n.get(IdP)}</button>);

  return(
    <div className={`container ${dynamicClassName}`}>
      <div className="federates">
        {
          authState === AuthState.SignIn &&
          SAMLLogin &&
          <div>
            {SAMLLoginButtons}
          </div>
        }
        {
          authState === AuthState.SignIn &&
          amazonLogin &&
          <button className="amazon btn" onClick={() => handleIdPLogin('LoginWithAmazon')}> <i className="fa fa-amazon fa-fw"></i>{I18n.get("AMAZON_SIGNIN")}</button>
        }
        {
          authState === AuthState.SignIn &&
          googleLogin &&
          <button className="google btn" onClick={() => handleIdPLogin('Google')}> <i className="fa fa-google fa-fw"></i>{I18n.get("GOOGLE_SIGNIN")}</button>
        }
        {
          authState === AuthState.SignIn &&
          facebookLogin &&
          <button className="fb btn" onClick={() => handleIdPLogin('Facebook')}> <i className="fa fa-facebook fa-fw"></i>{I18n.get("FACEBOOK_SIGNIN")}</button>
        }
      </div>

      {
        authState === AuthState.SignIn &&
        IdPLogin &&
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
          ]}>
      </AmplifyForgotPassword>

      <Login />
      <Register />

        <div>
          {I18n.get("WAIT_REDIRECTION")}
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator>
    </div>
  );
}
export default ResponsiveLanding;