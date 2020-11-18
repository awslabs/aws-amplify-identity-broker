/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import i18nStrings from '../../i18n/i18n';

import { SET_LANG, SET_AUTH } from "../actionTypes";
const initialState = {
	lang: "en",
	auth: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_LANG: {
			const { lang } = action.payload;

			if (lang && i18nStrings.hasOwnProperty(lang))
				return { ...state, lang: lang };

			return { ...state, lang: initialState.lang }
		}
		case SET_AUTH: {
			const { auth } = action.payload;
			return { ...state, auth: auth };
		}
		default:
			return state;
	}
}
