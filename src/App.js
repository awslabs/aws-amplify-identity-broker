/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { connect } from 'react-redux';
import { setLang } from './redux/actions';

import { I18n } from '@aws-amplify/core';

/*
 * Load Branded Theme
 */
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './branding'

/*
 * Load LandingPage for SingIn/SingUp
 */
import LandingPage from './components/LandingPage/LandingPage';

/*
 * Load i18n Localization
 */
import i18nStrings from './i18n/i18n';
I18n.putVocabularies(i18nStrings);

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
 * Map lang state to p
 */
const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.props.setLang(loadDefaultLanguage());

		this.state = {};
	}

	render() {
		return (
			<div>
				<MuiThemeProvider theme={theme}>
					<LandingPage />
				</MuiThemeProvider>
			</div>
		);
	}
}

export default connect(mapStateToProps, { setLang })(App);
