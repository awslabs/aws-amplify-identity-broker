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

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import Header from '../../components/AppBar/AppBar';
import Content from './content';

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

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			userAttributes: []
		}
	}

	componentDidMount() {
		Auth.currentAuthenticatedUser().then(CognitoUser => {
			Auth.userAttributes(CognitoUser).then(CognitoUserAttribute => {
				this.setState({ userAttributes: CognitoUserAttribute })
			})
		})
	}

	// Currently only displaying current user attributes
	// To update user attributes use Auth.updateUserAttributes() https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes
	render() {

		if (this.state.userAttributes.length === 0) {
			return null
		}
		/*
		var userAttributeFields = this.state.userAttributes.map(Attribute =>
			(Attribute.Name !== "identities") &&
			<div>
				<label>{Attribute.Name}</label>
				{Attribute.Value}
			</div>
		);
		*/

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
				{/*
				<div className='wrapper'>
					<div className='form-wrapper'>
						<h2>{I18n.get('USER_ATTRIBUTES')}:</h2>
						<form onSubmit={this.handleSubmit} noValidate>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}>
								{userAttributeFields}
							</div>
						</form>
					</div>
				</div>
			*/}
			</div>
		);
	}
}

export default withRouter(Settings);

