/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

import { i18nStrings as de } from './locales/de';
import { i18nStrings as en } from './locales/en';
import { i18nStrings as fr } from './locales/fr';
import { i18nStrings as nl } from './locales/nl';
import { i18nStrings as ja } from './locales/ja';

const i18nStrings = {
	de: de,
	en: en,
	fr: fr,
	nl: nl,
	ja: ja,
}

export const LanguageTypes = [
	{
		"code": "en",
		"lang": "English"
	},
	{
		"code": "fr",
		"lang": "Français"
	},
	{
		"code": "de",
		"lang": "Deutsch"
	},
	{
		"code": "nl",
		"lang": "Nederlands"
	},
	{
		"code": "ja",
		"lang": "日本語"
	}
];

export default i18nStrings;
