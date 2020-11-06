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
import { setAuth } from './redux/actions';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './branding';

import { eraseCookie, storeTokens, setTokenCookie, setRefreshTokenCookie } from './helpers'
import ResponsiveLanding from './components/ResponsiveLanding/ResponsiveLanding';
import Header from './components/AppBar/AppBar';

// responsive utilities
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint';
import TabletBreakpoint from './responsive_utilities/tablet_breakpoint';
import PhoneBreakpoint from './responsive_utilities/phone_breakpoint';

import { strings } from './strings';
I18n.putVocabularies(strings);

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		let lang = "en";
		if (navigator.language === "fr" || navigator.language.startsWith("fr-")) {
			lang = { lang: "fr" };
		}

		this.state = {
			lang: lang,
			auth: false,
			authState: AuthState.SignIn
		};

		let queryStringParams = new URLSearchParams(window.location.search);
		// If the token swap failed in Authorize lambda then we logout before continuing PKCE
		let forceAuth = queryStringParams.get("forceAuth");
		if (forceAuth) {
			// If we are here someone may be trying to steal a token, we destroy them all
			eraseCookie("id_token");
			eraseCookie("access_token");
			eraseCookie("refresh_token");
			localStorage.removeItem("client-id");
			Auth.signOut();
		}

		onAuthUIStateChange((newAuthState) => {
			this.handleAuthUIStateChange(newAuthState);
		});

		this.handleIdPLogin = this.handleIdPLogin.bind(this);
	}

	handleIdPLogin(identity_provider) {
		// Store redirect_uri/authorization_code in local storage to be used to later
		let queryStringParams = new URLSearchParams(window.location.search);
		let redirect_uri = queryStringParams.get("redirect_uri");
		let authorization_code = queryStringParams.get("authorization_code");
		let clientState = queryStringParams.get("state");

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

			if (qsRedirectUri) { // For a local sign in the redirect_uri/authorization_code will be in the query string params
				redirect_uri = qsRedirectUri;
				authorization_code = qsAuthorizationCode;
				clientState = qsClientState;
			} else { // For a federated sign in the redirect_uri/authorization_code will be in the local storage
				redirect_uri = localStorage.getItem('client-redirect-uri');
				authorization_code = localStorage.getItem('authorization_code');
				clientState = localStorage.getItem('client-state');
				localStorage.removeItem(`client-redirect-uri`);
				localStorage.removeItem(`authorization_code`);
				localStorage.removeItem(`client-state`);
			}

			let authInfo = await Auth.currentSession();
			let idToken = authInfo.idToken.jwtToken;
			let accessToken = authInfo.accessToken.jwtToken;
			let refreshToken = authInfo.refreshToken.token;

			if (idToken && accessToken && refreshToken) {
				// Set the ID and access token cookies for fast SSO
				setTokenCookie("id_token", idToken);
				setTokenCookie("access_token", accessToken);
				// Set the refresh token cookie. Refresh token cannot be parsed for an an expiry so use the access token to get an expiry.
				// Although the refresh token has a different (longer) expiry than the access token, this is for the purpose of fast SSO,
				// so the refresh token cookie will get set again when the id or access token cookie expires
				setRefreshTokenCookie(refreshToken, accessToken);
			}
			else {
				console.error("Inconsistent application state: Tokens missing from current session");
				return;
			}

			if (authorization_code && redirect_uri) { // PKCE Flow
				const response = await storeTokens(authorization_code, idToken, accessToken, refreshToken) // Store tokens in dynamoDB
				if (response.status === 200) {
					window.location.replace(redirect_uri + '/?code=' + authorization_code + ((clientState !== undefined) ? "&state=" + clientState : ""));
				}
				else {
					console.error("Could not store tokens. Server response: " + response.data);
				}
			}
			else if (redirect_uri) { // Implicit Flow
				window.location.replace(redirect_uri + '/?id_token=' + idToken + ((clientState !== undefined) ? "&state=" + clientState : ""));
			}
			else { // Sign in directly to broker (not from redirect from client as part of oauth2 flow)
				this.props.history.push('/dashboard');
			}
		}
		else if (authState === AuthState.SignedOut) {
			eraseCookie("id_token");
			eraseCookie("access_token");
			eraseCookie("refresh_token");
		}
		this.setState({ authState: authState });
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Header
					auth={this.state.auth}
					lang={this.state.lang}
					changedLang={(newLang) => this.setState({ lang: newLang })}
				/>


				<DesktopBreakpoint>
					<ResponsiveLanding dynamicClassName="desktop" authState={this.state.authState} pageLang={this.state.lang} />
				</DesktopBreakpoint>

				<TabletBreakpoint>
					<ResponsiveLanding dynamicClassName="tablet" authState={this.state.authState} pageLang={this.state.lang} />
				</TabletBreakpoint>

				<PhoneBreakpoint>
					<ResponsiveLanding dynamicClassName="mobile" authState={this.state.authState} pageLang={this.state.lang} />
				</PhoneBreakpoint>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(connect(null, { setAuth })(App));
