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
import { AmplifySignUp } from '@aws-amplify/ui-react';

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
	}
};

const Register = (props) => {
	return (
		<AmplifySignUp className="register"
			usernameAlias="email"
			slot="sign-up"
			formFields={[
				{
					type: "email",
					required: true,
				},
				{
					type: "password",
					required: true,
				},
				{
					type: "phone_number",
					required: false,
				},
				{
					type: "locale",
					value: props.lang,
					inputProps: {
						type: 'hidden',
					}
				},
				/**  Here an example of a custom attribute insertion:
				 *
				 * This assume that the custom field customer-type
				 * is defined in file amplify/backend/auth/amplifyIdentityBrokerAuth/amplifyIdentityBrokerAuth-cloudformation-template.yml
				 *
				 *         - Name: customer-type
				 *           Mutable: true
				 *           Required: false
				 *           AttributeDataType: String
				 *
				,{
					label: I18n.get("YOUR_LABEL"),
					type: "custom:customer-type",
					value: "anything",
					required: false,
				}
				*/
			]}>
		</AmplifySignUp>
	);
}

export default connect(mapStateToProps, {})(Register);
