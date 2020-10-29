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

import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import AppTiles from './appTiles';
import Logout from '../../components/Logout/Logout';

import './dashboard.css';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
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

	/*
	 * Language Change
	 */
	handleLangChange = (event) => {
		this.setState({ lang: event });
	}

	render() {

		return (
			<div>
				<LanguageSelect lang={this.state.lang} newLang={this.handleLangChange} />

				<AppTiles appClients={this.state.registeredClients} />
				<br />
				<br />
				<Logout />
			</div>
		)
	}
}

export default withRouter(Dashboard);
