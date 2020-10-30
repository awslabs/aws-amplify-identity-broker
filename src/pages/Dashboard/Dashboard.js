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

import { API } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import AppTiles from './appTiles';
import Header from '../../components/AppBar/AppBar';

import './dashboard.css';

/*
 * Localization
 */
const strings = {
	en: {
		DASHBOARD_TITLE: "Dashboard",
	},
	fr: {
		DASHBOARD_TITLE: "Tableau de bord",
	},
	de: {
		DASHBOARD_TITLE: "Dashboard",
	},
	nl: {
		DASHBOARD_TITLE: "Dashboard",
	}
}
I18n.putVocabularies(strings);

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			auth: false,
			registeredClients: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		this.getClients();
	}

	/*
	 * API call to get the Apps (Clients) for Single Sign On (SSO)
	 * Each App will shown with Logo, Name and a Link to LogbackUri
	 */
	getClients() {
		const apiName = 'amplifyIdentityBrokerApi';
		const path = '/clients';

		API
			.get(apiName, path)
			.then(response => {
				this.setState({
					isLoaded: true,
					registeredClients: response
				});
			})
			.catch(err => {
				this.setState({
					isLoaded: true,
					err
				});
			});
	}

	render() {

		return (
			<div>
				<Header
					auth={this.state.auth}
					pageTitle={I18n.get("DASHBOARD_TITLE")}
					lang={this.state.lang}
					changedLang={(newLang) => this.setState({ lang: newLang })}
					routeTo={(newPath) => this.props.history.push(newPath)}
				/>

				<AppTiles appClients={this.state.registeredClients} />
			</div>
		)
	}
}

export default withRouter(Dashboard);
