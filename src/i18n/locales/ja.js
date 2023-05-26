/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

// Impossible to find import for now
import { Translations } from "@aws-amplify/ui-components";

export const i18nStrings = {
	// Amplify UI
	[Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "your.adress@example.com",
	[Translations.PHONE_LABEL]: "電話番号",
	[Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",

	// Translate Amplify Messages
	// ### Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "パスワードを入力してください",

	// ./components/LandingPage/LandingPage.js
	LANDING_PAGE_BUTTON_IDP_AWSSSO_LABEL: "AWS SSO (SAML) でログイン",
	LANDING_PAGE_BUTTON_IDP_OIDCIdentityProvider_LABEL: "デモ OIDC (oauth2) でログイン",
	LANDING_PAGE_BUTTON_IDP_AMAZON_SIGNIN_LABEL: "Amazon でログイン",
	LANDING_PAGE_BUTTON_IDP_GOOGLE_SIGNIN_LABEL: "Google でログイン",
	LANDING_PAGE_BUTTON_IDP_FACEBOOK_SIGNIN_LABEL: "Facebook でログイン",
	LANDING_PAGE_DIVIDER_TEXT: "or",
	LANDING_PAGE_CHIP_EXPAND_MORE_LABEL: "more",
	LANDING_PAGE_CHIP_EXPAND_LESS_LABEL: "less",
	LANDING_PAGE_WAIT_REDIRECTION: "ログインが成功しました。リダイレクトします・・・",

	// ./components/RegisterConfirm/RegisterConfirm.js
	REGISTER_CONFIRM_EMAIL_LABEL: "アカウントが作成されました。メールで認証を行なってください・・・",

	// ./pages/Dashboard/Dashboard.js
	DASHBOARD_TITLE: "ダッシュボード",
	DASHBOARD_ERROR_MESSAGE: "エラーが発生しました",

	// ./pages/Dashboard/appTiles.js
	DASHBOARD_APPTILES_BTN_OPEN: "開く",
	DASHBOARD_APPTILES_LOGO: "ロゴ",

	// ./pages/ErrorPage/ErrorPage.js
	ERROR_PAGE_MESSAGE: "ページが見つかりませんでした",

	// ./pages/Settings/Settings.js
	SETTINGS_TITLE: "プロフィール",

	// ./pages/Settings/content.js
	SETTINGS_CONTENT_TAB_SIGNIN_LABEL: "サインイン情報",
	SETTINGS_CONTENT_TAB_USER_DATA_LABEL: "ユーザーデータ",
	SETTINGS_CONTENT_TAB_DEVICE_DATA_LABEL: "デバイスデータ",
	SETTINGS_CONTENT_TAB_MFA_DATA_LABEL: "MFA データ",

	// ./pages/Settings/tabDeviceData.js
	TAB_DEVICE_DATA_LABEL: "DEVICE DATA",
	TAB_DEVICE_DATA_CHIP_CURRENT_LABEL: "This",
	TAB_DEVICE_DATA_TEXTFIELD_STATUS_LABEL: "Status",
	TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL: "Name",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL: "Last used IP-Address",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL: "Device last used at",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL: "Device last times modified at",
	TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL: "Device entry created at",
	TAB_DEVICE_DATA_BUTTON_REMEMBER_DEVICE_LABEL: "Remember Device",
	TAB_DEVICE_DATA_BUTTON_FORGET_DEVICE_LABEL: "Forget Device",
	TAB_DEVICE_DATA_REMEMBER_DEVICE_MESSAGE: "Device successful remembered",
	TAB_DEVICE_DATA_FORGET_DEVICE_MESSAGE: "Device successful forgotten",
	TAB_DEVICE_DATA_MESSAGE_EROR: "エラーが発生しました",

	// ./pages/Settings/tabMfaData.js
	TAB_MFA_DATA_LABEL: 'MFA',
	TAB_MFA_DATA_SELECT_MFA_TYPE: 'Configure your preferred MFA Type',
	TAB_MFA_DATA_SELECT_TOTP: "TOTP",
	TAB_MFA_DATA_SELECT_SMS: "SMS",
	TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (please verify your Phonenumber first)",
	TAB_MFA_DATA_SELECT_NO_MFA: "No MFA",
	TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Change",
	TAB_MFA_DATA_SAVE_BUTTON_LABEL: "保存",
	TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "キャンセル",
	TAB_MFA_DATA_MESSAGE_EROR: "エラーが発生しました",
	TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Set MFA Type was successful",
	TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "Configuration of TOTP was successful",

	// ./pages/Settings/tabSignInData.js
	TAB_SIGNIN_DATA_LABEL: "SIGN IN INFORMATION",
	TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Username",
	TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-Mail",
	TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Phonenumber",
	TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'verified',
	TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'unverified',
	TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "キャンセル",
	TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "保存",
	TAB_SIGNIN_DATA_CHANGE_PASSWORD_LABEL: "パスワードを変更",
	TAB_SIGNIN_DATA_MESSAGE_EROR: "エラーが発生しました",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "The update was successful",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Please verify your changes",
	TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "The password was successful set",
	TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "The verification was successful",
	TAB_SIGNIN_DATA_MESSAGE_EMAIL_VALIDATION_ERROR: "Invalid E-Mail Address",
	TAB_SIGNIN_DATA_MESSAGE_PHONE_NUMBER_VALIDATION_ERROR: "Invalid Phone number. A phone number can only contain the + sign and digits",

	// ./pages/Settings/tabUserData.js
	TAB_USER_DATA_LABEL: "USER DATA",
	TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "名",
	TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "姓",
	TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "住所",
	TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "生年月日",
	TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "性別",
	TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Newsletter",
	TAB_USER_DATA_SELECT_GENDER_0: "<選択>",
	TAB_USER_DATA_SELECT_GENDER_1: "男性",
	TAB_USER_DATA_SELECT_GENDER_2: "女性",
	TAB_USER_DATA_SELECT_GENDER_3: "そのほか",
	TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Preferred Language",
	TAB_USER_DATA_SELECT_LANGUAGE_DE: "Deutsch",
	TAB_USER_DATA_SELECT_LANGUAGE_EN: "English",
	TAB_USER_DATA_SELECT_LANGUAGE_FR: "French",
	TAB_USER_DATA_SELECT_LANGUAGE_NL: "Nederlands",
	TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Change",
	TAB_USER_DATA_CANCEL_BUTTON_LABEL: "キャンセル",
	TAB_USER_DATA_SAVE_BUTTON_LABEL: "保存",
	TAB_USER_DATA_MESSAGE_EROR: "エラーが発生しました",
	TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "保存されました",

	// ./pages/TermsOfService/TermsOfService.js
	TERMS_OF_SERVICE_VERSION_ID: 1,
	TERMS_OF_SERVICE_MESSAGE_RESIGN: "利用規約に同意をしてください",
	TERMS_OF_SERVICE_MESSAGE_ACCEPTED: "利用規約の同意を確認しました",
	TERMS_OF_SERVICE_MESSAGE_ERROR: "エラーが発生しました。時間をおいて再び試してみてください",
	TERMS_OF_SERVICE_MESSAGE_DECLINE: "利用規約に同意いただく必要があります",

	// ./pages/xxx/xxx.js
	IMPRINT_TITLE: "Imprint",

	// ./pages/TermsOfService/content.js
	TERMS_OF_SERVICE_CONTENT_VERSION_LABEL: "Version: 1.0.0",
	TERMS_OF_SERVICE_CONTENT_TITLE: "Terms of Service",
	TERMS_OF_SERVICE_CONTENT_P1: "1. General regulations",
	TERMS_OF_SERVICE_CONTENT_P2: "2. Services of the platform",
	TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM: "EN - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL: "Accept",
	TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL: "Decline",

	// ./components/AppBar/AppBar.js
	HEADER_MENU_ITEM_PROFILE: "プロフィール",
	HEADER_MENU_ITEM_DASHBOARD: "ダッシュボード",
	HEADER_MENU_ITEM_LOGOUT: "ログアウト",

	// ./components/ChangePasswordDialog/ChangePasswordDialog.js
	CHANGE_PASSWORD_TITLE: "パスワードを変更する",
	CHANGE_PASSWORD_DESCRIPTION: "現在のパスワードと新しいパスワードを入力してください",
	CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "現在のパスワード",
	CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "新しいパスワード",
	CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "保存",
	CHANGE_PASSWORD_CANCEL_BUTTON_LABEL: "キャンセル",
	CHANGE_PASSWORD_MESSAGE_EROR: "エラーが発生しました",

	// ./components/LangeuageSelect/LanguageSelect.js
	LANGUAGESELECT_SELECT_LABEL: "言語",

	// ./components/LogoutButton/LogoutButton.js
	LOGOUT_BUTTON_LABEL: "ログアウト",

	// ./components/MfaTotpConfigDialog/MfaTotpConfigDialog.js
	MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP Configuration",
	MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Multi-Factor Authentication (MFA) enhances security by adding another authentication method rather than relying solely on username and password.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP Request Token",
	MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "You can use time-based one-time passwords (TOTP) as second factors when your users log in.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "Request TOTP Token",
	MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP Device Setup",
	MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scan the QR-Code with your Device",
	MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP Device Activate",
	MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activate your Device by entering the One-Time-Password and click 'Activate'",
	MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "One-Time-Password",
	MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activate",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Next",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Back",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Close",
	MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "エラーが発生しました",

	// ./components/VerifyAttributeDialog/VerifyAttributeDialog.js
	VERIFY_DIALOG_TITLE: "認証",
	VERIFY_DIALOG_DESCRIPTION: "認証コードを入力してください:",
	VERIFY_DIALOG_INPUT_LABEL: "コード",
	VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "認証する",
	VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "閉じる",
	VERIFY_DIALOG_MESSAGE_EROR: "エラーが発生しました",

}
