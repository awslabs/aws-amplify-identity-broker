/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React, { Component } from 'react';
import { AmplifyButton } from '@aws-amplify/ui-react';

class Header extends Component {

	constructor(props) {
		super(props);

		let lang = "en";
		if (navigator.language.startsWith("fr")) {
			lang = { lang: "fr" };
		}

		this.state = {
			lang: lang
		}
	}

	/**
	 * callback for parent to change language
	 */
	toggleLang = () => {
		if (this.state.lang === "en") {
			this.setState({ lang: "fr" });
			this.props.onChange("fr");
		} else {
			this.setState({ lang: "en" });
			this.props.onChange("en");
		}
	}

	render() {
		return (
			<div className="header">
				<AmplifyButton onClick={this.toggleLang}>Language - {this.state.lang}</AmplifyButton>
			</div>
		);
	}
}

export default Header;
