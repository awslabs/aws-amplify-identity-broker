/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import { AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';

const RegisterConfirm = () => {

	return (
		<AmplifyConfirmSignUp className="register-confirm"
			usernameAlias="email"
			slot="confirm-sign-up"
			formFields={[
				{
					type: "email",
					required: false,
					label: I18n.get("REGISTER_CONFIRM_EMAIL_LABEL"),
					inputProps: {
						type: 'hidden',
					}
				}
			]}>
		</AmplifyConfirmSignUp>
	);
}

export default RegisterConfirm;
