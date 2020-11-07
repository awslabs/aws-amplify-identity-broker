/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import { AmplifyForgotPassword } from '@aws-amplify/ui-react';

const ForgotPassword = () => {

	return (
		<AmplifyForgotPassword className="forgot-password"
			usernameAlias="email"
			slot="forgot-password"
			formFields={[
				{
					type: "email",
					required: true,
				},
			]}>
		</AmplifyForgotPassword>
	);
}

export default ForgotPassword;
