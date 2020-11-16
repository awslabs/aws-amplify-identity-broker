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

import { Auth } from 'aws-amplify';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../branding';

import Header from '../../components/AppBar/AppBar';
import Content from './content';
import { setUser, setLang } from '../../redux/actions';

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
		auth: state.app.auth,
		user: state.user,
	}
}

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	};

	componentDidMount() {
		if (this.props.auth)
			this.loadUserAttributes();
	};

	loadUserAttributes = () => {
		Auth.currentUserInfo()
			.then((user) => {
				this.props.setUser(user);

				/*
				 * If the user locale different to i18n language,
				 * set i18n language to user locale
				 */
				if (user.attributes.locale && (user.attributes.locale !== this.props.lang))
					this.props.setLang(user.attributes.locale);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Header
					routeTo={(newPath) => this.props.history.push(newPath)}
				/>

				<Content reloadUserData={this.loadUserAttributes} />
			</MuiThemeProvider>
		);
	}
}

export default withRouter(connect(mapStateToProps, { setUser, setLang })(Settings));

