/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import { SET_LANG, SET_AUTH } from "./actionTypes";

export const setLang = lang => ({
	type: SET_LANG,
	payload: {
		lang: lang
	}
});

export const setAuth = auth => ({
	type: SET_AUTH,
	payload: {
		auth: auth
	}
});
