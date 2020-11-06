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
import { I18n } from '@aws-amplify/core';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../branding';

import Header from '../../components/AppBar/AppBar';
import Content from './content';
import { setUser, setLang } from '../../redux/actions';

/*
 * Localization
 */
const strings = {
	en: {
		SETTINGS_TITLE: "Profile",
	},
	fr: {
		SETTINGS_TITLE: "Profil",
	},
	de: {
		SETTINGS_TITLE: "Profil",
	},
	nl: {
		SETTINGS_TITLE: "Profiel",
	}
}
I18n.putVocabularies(strings);

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
	}

	componentDidMount() {
		this.loadUserAttributes();
	};

	loadUserAttributes = () => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.userAttributes(CognitoUser).then(CognitoUserAttributes => {
					let _userAttributes = []

					CognitoUserAttributes.forEach(Attribute => {
						switch (Attribute.Name) {
							case "username":
								_userAttributes.username = Attribute.Value;
								break;
							case "email":
								_userAttributes.email = Attribute.Value;
								break;
							case "email_verified":
								_userAttributes.email_verified = Attribute.Value === "true";
								break;
							case "phone_number":
								_userAttributes.phone_number = Attribute.Value;
								break;
							case "phone_number_verified":
								_userAttributes.phone_number_verified = Attribute.Value === "true";
								break;
							case "given_name":
								_userAttributes.given_name = Attribute.Value;
								break;
							case "family_name":
								_userAttributes.family_name = Attribute.Value;
								break;
							case "address":
								_userAttributes.address = Attribute.Value;
								break;
							case "birthdate":
								_userAttributes.birthdate = Attribute.Value;
								break;
							case "gender":
								_userAttributes.gender = Attribute.Value;
								break;
							case "picture":
								_userAttributes.picture = Attribute.Value;
								break;
							case "locale":
								_userAttributes.locale = Attribute.Value;
								if (_userAttributes.locale !== this.props.lang)
									this.props.setLang(_userAttributes.locale)
								break;
							case "custom:newsletter":
								_userAttributes.custom_newsletter = (Attribute.Value === 'true');
								break;
							default:
								break;
						}
					});
					this.props.setUser(_userAttributes);
				})
					.catch(err => {
						console.log(err);
					})
			})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Header
					auth={this.props.auth}
					pageTitle={I18n.get("SETTINGS_TITLE")}
					lang={this.props.lang}
					routeTo={(newPath) => this.props.history.push(newPath)}
				/>

				<Content reloadUserData={this.loadUserAttributes} />
			</MuiThemeProvider>
		);
	}
}

export default withRouter(connect(mapStateToProps, { setUser, setLang })(Settings));

