/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier": MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import { SET_USER, SET_USER_EMAIL, SET_USER_PHONENUMBER } from "../actionTypes";

const initAttributes = () => {
	let attributes = [];

	attributes.username = '';
	attributes.email = '';
	attributes.email_verified = false;
	attributes.phone_number = '';
	attributes.phone_number_verified = false;
	attributes.given_name = '';
	attributes.family_name = '';
	attributes.address = '';
	attributes.birthdate = '';
	attributes.gender = 0;
	attributes.picture = '';
	attributes.locale = 'en';

	attributes.custom_newsletter = false;

	return attributes
}
const initialState = {
	attributes: initAttributes()
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_USER: {
			const { user } = action.payload;

			return { attributes: user }
		}
		case SET_USER_EMAIL: {
			const { email } = action.payload;

			const _user = state;
			_user.attributes.email = email;

			return { attributes: _user.attributes };
		}
		case SET_USER_PHONENUMBER: {
			const { phoneNumber } = action.payload;

			const _user = state;
			_user.attributes.phone_number = phoneNumber;

			return { attributes: _user.attributes };
		}
		default:
			return state;
	}
}
