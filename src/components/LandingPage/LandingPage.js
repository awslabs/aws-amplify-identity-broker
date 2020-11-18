/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuth, setUser } from '../../redux/actions';

import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';

import checkForceAuth from './helpers/checkForceAuth';
import handleAuthUIStateChange from './helpers/handleAuthStateChange';
import handleIdpLogin from './helpers/handleIdpLogin';

import SignInContainer from './signInContainer';

const mapStateToProps = (state) => {
	return {
		auth: state.app.auth,
		user: state.user,
	}
};

const LandingPage = (props) => {
	const [authState, setAuthState] = React.useState();
	const [loaded, setLoaded] = React.useState(false);

	const propSetUser = props.setUser;
	const propSetAuth = props.setAuth;

	handleIdpLogin.bind(this);

	React.useEffect(() => {
		checkForceAuth();

		return onAuthUIStateChange((nextAuthState, authData) => {
			handleAuthUIStateChange(nextAuthState);

			setAuthState(nextAuthState);

			if (nextAuthState === AuthState.ConfirmSignUp) {
				if (authData && authData.username && authData.signUpAttrs.attributes) {
					let user = {
						id: '',
						username: authData.username,
						attributes: authData.signUpAttrs.attributes
					}
					propSetUser(user);
				}
			}

			if (nextAuthState === AuthState.SignedIn) {
				propSetAuth(true);

				if (authData && authData.username && authData.attributes) {
					let user = {
						id: authData.attributes.sub,
						username: authData.username,
						attributes: authData.attributes
					}
					propSetUser(user);
				}
			}

			setLoaded(true);
		});
	}, [propSetAuth, propSetUser]);

	return (
		authState === AuthState.SignedIn && loaded && props.user && props.user.username
			? <Redirect to='/dashboard' />
			: <SignInContainer authState={authState} loaded={loaded} />
	);
};

export default withRouter(connect(mapStateToProps, { setAuth, setUser })(LandingPage));
