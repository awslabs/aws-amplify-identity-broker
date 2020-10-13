import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { I18n } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import styled from "styled-components";

import Login from './Login';
import Register from './Register';

var Config = require("Config");

const ResponsiveWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
  }

  .container-desktop {
    width: 1200px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
  }
  .social-login-desktop {
    flex: 50%;
    justify-content: center;
    margin-top:10%;
  }
  .form-login-desktop {
    flex: 50%;
    justify-content: center;
    border-left: 1px solid rgba(0, 0, 0, 0.35);
  }
  .separator-desktop {
    position: absolute;
    left: 48%;
    top: 50%;
    margin-left: 5px;
    background-color: #fff;
    padding-top: 15px;
    padding-bottom: 15px;
    color: rgba(0, 0, 0, 0.35);
  }

  .container-tablet {
    width: 700px;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
  }

  .container-phone {
    width: 500px;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
  }
`;

const Separator = styled.div`
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    margin: 8px 30px;
    padding-bottom: 15px;
  }
`;

const BeforeSeparator = styled.div`
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 8px;
  }
`;

const AfterSeparator = styled.div`
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 8px;
  }
`;


const ResponsiveLanding = ({dynamicClassName, authState}) => {

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

  var SAMLLoginButtons = SAMLIdPs.map( IdP =>
    <button className="saml btn" key={IdP} onClick={() => handleIdPLogin(IdP)}>{I18n.get(IdP)}</button>
  );

  return(
    <ResponsiveWrapper>
      <div className={`container-${dynamicClassName}`}>
        <div className={`social-login-${dynamicClassName}`}>
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
            <Separator className={`separator-${dynamicClassName}`}>
              <BeforeSeparator />
                { I18n.get("OR") }
              <AfterSeparator />
            </Separator>
        }

        <div className={`form-login-${dynamicClassName}`}>
          <AmplifyAuthenticator usernameAlias="email" style={{ textAlign: 'center' }}>

            <AmplifyForgotPassword
              usernameAlias="email"
              slot="forgot-password"
              formFields={[
                {
                  type: "email",
                  label: I18n.get("EMAILL_ADDRESS"),
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
      </div>
    </ResponsiveWrapper>
  );
}
export default ResponsiveLanding;