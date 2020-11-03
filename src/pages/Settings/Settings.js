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

import Header from '../../components/AppBar/AppBar';
import Content from './content';
import { setUser } from '../../redux/actions';

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
		user: state.user
	}
}

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
		}
	}

	componentDidMount() {
		this.loadUserAttributes();
	};

	loadUserAttributes = () => {
		Auth.currentAuthenticatedUser().then(CognitoUser => {
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
						default:
							break;
					}
				});
				this.props.setUser(_userAttributes);
			})
		})
	}


	// Currently only displaying current user attributes
	// To update user attributes use Auth.updateUserAttributes() https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes
	render() {
		return (
			<div>
				<Header
					auth={this.state.auth}
					pageTitle={I18n.get("SETTINGS_TITLE")}
					lang={this.state.lang}
					changedLang={(newLang) => this.setState({ lang: newLang })}
					routeTo={(newPath) => this.props.history.push(newPath)}
				/>

				<Content />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, { setUser })(Settings));

