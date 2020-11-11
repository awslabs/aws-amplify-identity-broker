/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';

import { I18n } from '@aws-amplify/core';

class ErrorPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<h1>
				{I18n.get('ERROR_PAGE_MESSAGE')}
			</h1>
		)
	}
}

export default ErrorPage;
