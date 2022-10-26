/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import { AmplifySignIn } from '@aws-amplify/ui-react';

const Login = () => {

	return (
		<AmplifySignIn className="login"
			usernameAlias="email"
			slot="sign-in"
			formFields={[
				{
					type: "email",
					required: true,
					inputProps: {
						'data-test': 'sign-in-email-input',
					},
				},
				{
					type: "password",
					required: true,
					inputProps: {
						'data-test': 'sign-in-password-input',
					},
				}
			]}>
			<div slot="federated-buttons"></div>
		</AmplifySignIn>
	);
}

export default Login;
