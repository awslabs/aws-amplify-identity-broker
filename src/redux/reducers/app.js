/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import { SET_LANG, SET_AUTH, SET_VERIFY_DIALOG } from "../actionTypes";
const initialState = {
	lang: "en",
	auth: false,
	verifyDialog: {
		type: '',
		open: false
	}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_LANG: {
			const { lang } = action.payload;
			return { ...state, lang: lang };
		}
		case SET_AUTH: {
			const { auth } = action.payload;
			return { ...state, auth: auth };
		}
		case SET_VERIFY_DIALOG: {
			const { verifyDialog } = action.payload;
			return { ...state, verifyDialog: verifyDialog };
		}
		default:
			return state;
	}
}
