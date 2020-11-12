/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLang, setAuth } from './redux/actions';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './branding';

import { eraseCookie, storeTokens, setTokenCookie, setRefreshTokenCookie } from './helpers'

import LandingPage from './components/LandingPage/LandingPage';

import i18nStrings from './i18n/i18n';
I18n.putVocabularies(i18nStrings);

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
		auth: state.app.auth,
		user: state.user,
	}
}

/*
 *  Load Default Language
 * Check Browser Language: If it exists in i18n then use the Browser Language, else use default "en"
 */
const loadDefaultLanguage = () => {
	const navLang = navigator.language.substr(0, 2);

	if (i18nStrings.hasOwnProperty(navLang))
		return navLang;

	return "en"
}

/*
 *  Store redirect_uri/authorization_code in local storage to be used to later
 */
const handleIdPLogin = (identity_provider) => {

	const queryStringParams = new URLSearchParams(window.location.search);
	const redirect_uri = queryStringParams.get("redirect_uri");
	const authorization_code = queryStringParams.get("authorization_code");
	const clientState = queryStringParams.get("state");

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

/*
 * If the token swap failed in Authorize lambda then we logout before continuing PKCE
 */
const checkForceAuth = () => new Promise((resolve, reject) => {
	const queryStringParams = new URLSearchParams(window.location.search);
	const forceAuth = queryStringParams.get("forceAuth");

	if (forceAuth) {
		eraseCookie("id_token");
		eraseCookie("access_token");
		eraseCookie("refresh_token");

		localStorage.removeItem("client-id");

		Auth.signOut()
			.then((data) => {
				console.log(data);
				resolve();
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	}

	resolve();
});

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

	constructor(props) {
		super(props);

		this.props.setLang(loadDefaultLanguage());

		this.state = {
			loaded: false,
			auth: false,
			authState: null,
		};
	}

	async componentDidMount() {
		await checkForceAuth();

		onAuthUIStateChange((newAuthState) => {
			this.handleAuthUIStateChange(newAuthState);
		});

		this.handleIdPLogin = handleIdPLogin.bind(this);

		if (!this.state.authState)
			this.setState({ authState: AuthState.SignIn, loaded: true })
	}

	async handleAuthUIStateChange(authState) {
		if (authState === AuthState.SignedIn) {
			this.props.setAuth(true);

			var redirect_uri;
			var authorization_code;
			var clientState;
			let queryStringParams = new URLSearchParams(window.location.search);
			let qsRedirectUri = queryStringParams.get('redirect_uri');
			let qsAuthorizationCode = queryStringParams.get('authorization_code');
			let qsClientState = queryStringParams.get('state');

			/*
			 * For a local sign in the redirect_uri/authorization_code will be in the query string params
			 */
			if (qsRedirectUri) {
				redirect_uri = qsRedirectUri;
				authorization_code = qsAuthorizationCode;
				clientState = qsClientState;
			} else {
				/*
				 * For a federated sign in the redirect_uri/authorization_code will be in the local storage
				 */
				redirect_uri = localStorage.getItem('client-redirect-uri');
				authorization_code = localStorage.getItem('authorization_code');
				clientState = localStorage.getItem('client-state');
				localStorage.removeItem(`client-redirect-uri`);
				localStorage.removeItem(`authorization_code`);
				localStorage.removeItem(`client-state`);
			}

			/*
			 * get the current user session
			 */
			let authInfo = await Auth.currentSession();

			let idToken = authInfo.idToken.jwtToken;
			let accessToken = authInfo.accessToken.jwtToken;
			let refreshToken = authInfo.refreshToken.token;

			/*
			 * Set the ID and access token cookies for fast SSO
			 */
			if (idToken && accessToken && refreshToken) {
				setTokenCookie("id_token", idToken);
				setTokenCookie("access_token", accessToken);

				/*
				 * Set the refresh token cookie. Refresh token cannot be parsed for an an expiry so use the access token to get an expiry.
				 * Although the refresh token has a different (longer) expiry than the access token, this is for the purpose of fast SSO,
				 * so the refresh token cookie will get set again when the id or access token cookie expires
				 */
				setRefreshTokenCookie(refreshToken, accessToken);
			}
			else {
				console.error("Inconsistent application state: Tokens missing from current session");
				return;
			}

			if (authorization_code && redirect_uri) {
				/*
				 * PKCE Flow
				 */

				//Store tokens in DynamoDB
				const response = await storeTokens(authorization_code, idToken, accessToken, refreshToken)

				if (response.status === 200) {
					window.location.replace(redirect_uri + '/?code=' + authorization_code + ((clientState !== undefined) ? "&state=" + clientState : ""));
				}
				else {
					console.error("Could not store tokens. Server response: " + response.data);
				}
			}
			else if (redirect_uri) {
				/*
				 * Implicit Flow
				 */
				window.location.replace(redirect_uri + '/?id_token=' + idToken + ((clientState !== undefined) ? "&state=" + clientState : ""));
			}
			else {
				/*
				 * Sign in directly to broker (not from redirect from client as part of oauth2 flow)
				 */
				this.props.history.push('/dashboard');
			}
		}
		else if (authState === AuthState.SignedOut) {
			eraseCookie("id_token");
			eraseCookie("access_token");
			eraseCookie("refresh_token");
		}

		/*
		 * store currenct authState and set to loaded
		 * TODO: Warning: Can't perform a React state update on an unmounted component.
		 */
		this.setState({ authState: authState, loaded: true });
	}

	render() {
		return (
			<div>
				{this.state.loaded && (
					<MuiThemeProvider theme={theme}>
						<LandingPage authState={this.state.authState} />
					</MuiThemeProvider>
				)}
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, { setLang, setAuth })(App));
