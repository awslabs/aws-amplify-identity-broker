/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';
import App from './App';
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

// Lazy Loading
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const ErrorPage = React.lazy(() => import('./Pages/ErrorPage/errorPage'));
const TermsOfService = React.lazy(() => import('./Pages/TermsOfService/termsOfService'));
const Settings = React.lazy(() => import('./Settings/Settings'));
const Logout = React.lazy(() => import('./Logout/Logout'));

// Lazy Loading Fallback
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
 );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/tos" render={() => <TermsOfService />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route render={() => <ErrorPage />}/>
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
