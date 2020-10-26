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
		<div className="login">
			<AmplifySignIn
				usernameAlias="email"
				slot="sign-in"
				formFields={[
					{
						type: "email",
						required: true,
					},
					{
						type: "password",
						required: true,
					}
				]}>
				<div slot="federated-buttons"></div>
			</AmplifySignIn>
		</div>
	);
}

export default Login;
