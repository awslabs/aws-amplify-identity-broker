/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { I18n } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../branding';

import TosContent from './content';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import AppSnackbar from '../../components/Snackbar/Snackbar';

import { setLang, setAuth, setUser } from '../../redux/actions';

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
		auth: state.app.auth,
		user: state.user,
	}
}

class TermsOfService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: null,

			tosResign: false,
			tosCurrentVersion: 0,

			snackBarOps: {
				type: 'info',
				open: false,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 0,
				message: ''
			},
		}
	}

	componentDidMount() {
		let redirect = new URLSearchParams(window.location.search).get("redirect") || null;
		if (redirect) this.setState({ redirect: redirect });

		this.setState({ tosCurrentVersion: I18n.get("TERMS_OF_SERVICE_VERSION_ID") || 0 })
		this.checkTos();
	}

	getTosInfo = () => new Promise((resolve, reject) => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				this.props.setAuth(true);

				Auth.currentUserInfo()
					.then((user) => {
						this.props.setUser(user);
						this.props.setLang(user.attributes.locale);

						/*
						 * Check if the user need to "Sign" or "Resign" the ToS
						 * For reasons of simplicity we load the current ToS version from 'i18n - VERSION_ID'
						 */
						const tosSigned = (user.attributes['custom:tos_signed'] === "true") || false;
						const tosSignedVersionInt = parseInt(user.attributes['custom:tos_version']) || 0;
						const tosCurrentVersionInt = I18n.get('TERMS_OF_SERVICE_VERSION_ID') || 0

						/*
						 * If the current ToS are newer or the actual ToS are not sigened we redirect the user to '/tos'
						 * To redirect the user back to '/settings' after sign the ToS we add Query Param 'redirect'
						 */
						if ((tosCurrentVersionInt > tosSignedVersionInt) || !tosSigned)
							this.setState({ tosResign: true })

						resolve();
					})
					.catch(err => {
						console.log(err);

						this.props.setAuth(false);
						this.props.setUser(null);
						reject(err)
					});
			})
			.catch(err => {
				if (err !== 'not authenticated')
					console.log(err);

				this.props.setAuth(false);
				this.props.setUser(null);
				reject(err);
			});
	})

	checkTos = async (reload = true) => {
		if (reload) await this.getTosInfo();

		if (this.state.tosResign === true) {
			this.setState({
				snackBarOps: {
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: null,
					message: I18n.get("TERMS_OF_SERVICE_MESSAGE_RESIGN")
				}
			})
		}
	}

	updateTosAttribute = () => new Promise((resolve, reject) => {
		let attributes = { 'custom:tos_version': this.state.tosCurrentVersion.toString(), 'custom:tos_signed': 'true' };

		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.updateUserAttributes(CognitoUser, attributes)
					.then(() => { resolve() })
					.catch(err => { console.log(err); reject(err) })
			})
			.catch(err => { console.log(err); reject(err) })
	})

	handleTosAccepted = async () => {
		this.updateTosAttribute()
			.then(async () => {
				await this.checkTos();

				this.setState({
					tosResign: false,
					snackBarOps: {
						type: 'success',
						open: true,
						vertical: 'top',
						horizontal: 'center',
						autoHide: 5000,
						message: I18n.get('TERMS_OF_SERVICE_MESSAGE_ACCEPTED')
					}
				});

				if (this.state.redirect) window.location.href = this.state.redirect;
			})
			.catch((err) => {
				console.log(err);

				this.setState({
					snackBarOps: {
						type: 'error',
						open: true,
						vertical: 'top',
						horizontal: 'center',
						autoHide: 5000,
						message: I18n.get('TERMS_OF_SERVICE_MESSAGE_ERROR')
					}
				});
			})
	}

	handleTosDecline = () => {
		this.setState({
			snackBarOps: {
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: null,
				message: I18n.get('TERMS_OF_SERVICE_MESSAGE_DECLINE')
			}
		})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<LanguageSelect />

				<TosContent reSign={this.state.tosResign} tosAccept={this.handleTosAccepted} tosDecline={this.handleTosDecline} />

				{this.state.snackBarOps.open && (
					<AppSnackbar ops={this.state.snackBarOps} />
				)}
			</MuiThemeProvider>
		);
	}
}

export default withRouter(connect(mapStateToProps, { setLang, setAuth, setUser })(TermsOfService));
