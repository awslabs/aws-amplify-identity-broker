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

import { AmplifyConfirmSignUp, } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';

const mapStateToProps = (state) => {
	return {
		email: state.user.attributes.email || '',
	}
};

const RegisterConfirm = (props) => {

	const handleSubmitEvent = () => {
		//do nothing
	}

	return (
		<AmplifyConfirmSignUp className="register-confirm"
			usernameAlias="email"
			slot="confirm-sign-up"
			formFields={[
				{
					type: "email",
					required: false,
					value: props.email,
					label: I18n.get("REGISTER_CONFIRM_EMAIL_LABEL"),
					inputProps: {
						type: 'hidden',
					}
				}
			]}
			handleSubmit={() => handleSubmitEvent()}
		/>
	);
}

export default connect(mapStateToProps, {})(RegisterConfirm);
