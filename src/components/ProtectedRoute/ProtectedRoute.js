/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
*/

/*
 * Protected Pages with Authentication and accepted Terms of Service
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { setLang, setAuth, setUser } from '../../redux/actions';

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

class ProtectedRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: true,
			resignToS: false
		}
	}

	componentDidMount() {
		Auth.currentAuthenticatedUser()
			.then(() => {
				this.setState({ isAuthenticated: true });
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
							this.setState({ resignToS: true })
					})
					.catch(err => {
						console.log(err);

						this.setState({ isAuthenticated: false })
						this.props.setAuth(false);
						this.props.setUser(null);
					});
			})
			.catch(err => {
				if (err !== "not authenticated") console.log(err)

				this.setState({ isAuthenticated: false })
				this.props.setAuth(false);
				this.props.setUser(null);
			});
	}

	render() {
		/*
		 * Route SingIn Page (loginPath) and Terms of Service (tosPath)
		 */
		const loginPath = '/';
		let tosPath = 'tos';

		/*
		 * "path" of the requesting component to redirect back
		 */
		const redirectTo = this.props.path.replace('/', '') || null;

		/*
		 * Target component
		 */
		const Component = this.props.component;

		/*
		 * If user NOT signed in redirect to "loginPath" - add QueryParam redirectTo
		 * If user NOT accepted the Terms of Service redirect to "tosPath" - add QueryParam redirectTo
		 * Otherwise route to target component
		 */
		return !this.state.isAuthenticated
			? (<Redirect to={{ pathname: loginPath, search: `redirect=${redirectTo}` }} push={true} />)
			: this.state.resignToS
				? (<Redirect to={{ pathname: tosPath, search: `redirect=${redirectTo}` }} push={true} />)
				: (<Component />)
	}
}

export default connect(mapStateToProps, { setAuth, setUser, setLang })(ProtectedRoute);
