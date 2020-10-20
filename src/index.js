/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import Logout from './Logout/Logout';
import Settings from './Settings/Settings';
import Dashboard from './Dashboard/Dashboard';
import TermsOfService from './Pages/TermsOfService/termsOfService'
import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports';
var Config = require("Config");

let amplifyConfig = {
  ...awsconfig,
  Auth: {
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: Config.authenticationFlowType !== undefined ? Config.authenticationFlowType : "USER_SRP_AUTH",
  }
}

// If we have in parameter that means start a PKCE or Implict flow
// We switch the clientId to submit the one from the client website
let queryStringParams = new URLSearchParams(window.location.search);
let clientId = queryStringParams.get('client_id');
if (clientId) {
  // We save the client ID, our Amplify auth will be based on that one
  localStorage.setItem('client-id', clientId);
} else {
  // If there is no client-Id in query, we set back the last one used for login
  // it may be undefined if we never logged in
  clientId = localStorage.getItem('client-id');
}
if (clientId) {
  // We configure the Amplify Auth component in the context of using a client website client-id
  // if no clientId is found (direct login not from a client) the web client id of the broker will be used as default
  amplifyConfig.aws_user_pools_web_client_id = clientId;
}
Amplify.configure(amplifyConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/tos" component={TermsOfService} />
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
