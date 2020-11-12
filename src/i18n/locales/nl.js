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
	[Translations.NO_ACCOUNT_TEXT]: "Nog geen account??",
	[Translations.RESET_YOUR_PASSWORD]: "Wachtwoord opnieuw instellen",
	[Translations.NEW_PASSWORD_LABEL]: "Nieuw paswoord",
	[Translations.NEW_PASSWORD_PLACEHOLDER]: "Voer je nieuwe wachtwoord in",
	[Translations.CREATE_ACCOUNT_TEXT]: "Account aanmaken",
	[Translations.FORGOT_PASSWORD_TEXT]: "Ben je je wachtwoord vergeten?",
	[Translations.RESET_PASSWORD_TEXT]: "Wachtwoord opnieuw instellen",
	[Translations.SIGN_IN_ACTION]: "REGISTRATIE",
	[Translations.SIGN_IN_HEADER_TEXT]: "Log in op het account",
	[Translations.SIGN_IN_TEXT]: "Aanmelden",
	[Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "jouw.email@exemple.nl",
	[Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "U heeft nog geen account?",
	[Translations.SIGN_UP_HEADER_TEXT]: "Account aanmaken",
	[Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "Wachtwoord",
	[Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "MAAK EEN ACCOUNT AAN",
	[Translations.SIGN_UP_USERNAME_PLACEHOLDER]: "Gebruikersidentificatie",
	[Translations.SEND_CODE]: "Code verzonden",
	[Translations.BACK_TO_SIGN_IN]: "Terug naar Inloggen",
	[Translations.EMAIL_LABEL]: "E-mailadres *",
	[Translations.EMAIL_PLACEHOLDER]: "jouw.email@exemple.nl",
	[Translations.PASSWORD_LABEL]: "Wachtwoord *",
	[Translations.PASSWORD_PLACEHOLDER]: "Voer uw wachtwoord in",
	[Translations.PHONE_LABEL]: "Telefoonnummer *",
	[Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
	[Translations.CONFIRM_SIGN_UP_CODE_LABEL]: "Verificatie code",
	[Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: "Voer uw code in",
	[Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: "Bevestig de registratie",
	[Translations.CONFIRM_SIGN_UP_LOST_CODE]: "Ben je je code kwijt??",
	[Translations.CONFIRM_SIGN_UP_RESEND_CODE]: "Stuur de code opnieuw",
	[Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: "Bevestigen",
	[Translations.SIGN_OUT]: "Afmelden",

	// Translate Amplify Messages
	"Username cannot be empty": "De gebruikersnaam moet worden ingevoerd",
	"User does not exist.": "De gebruiker bestaat niet",
	"An account with the given email already exists.": "Er bestaat al een account met dit e-mailadres.",
	"User is disabled.": "De gebruiker is gedeactiveerd.",
	"Access Token has been revoked": "Het toegangstoken is ingetrokken.",
	// ### Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "Het wachtwoord mag niet leeg zijn.",
	// ### This may change in the future: see https://github.com/aws-amplify/amplify-js/issues/6898
	"1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Uw wachtwoord moet minimaal 6 tekens lang zijn.",

	// ./components/LandingPage/LandingPage.js
	LANDING_PAGE_BUTTON_IDP_AWSSSO_LABEL: "Aanmelden met AWS SSO (SAML)",
	LANDING_PAGE_BUTTON_IDP_OIDCIdentityProvider_LABEL: "Aanmelden met Demo OIDC (oauth2)",
	LANDING_PAGE_BUTTON_IDP_AMAZON_SIGNIN_LABEL: "Aanmelden met Amazon",
	LANDING_PAGE_BUTTON_IDP_GOOGLE_SIGNIN_LABEL: "Aanmelden met Google",
	LANDING_PAGE_BUTTON_IDP_FACEBOOK_SIGNIN_LABEL: "Aanmelden met Facebook",
	LANDING_PAGE_DIVIDER_TEXT: "of",
	LANDING_PAGE_CHIP_EXPAND_MORE_LABEL: "meer",
	LANDING_PAGE_CHIP_EXPAND_LESS_LABEL: "minder",
	LANDING_PAGE_WAIT_REDIRECTION: "Je bent succesvol ingelogd, je wordt nu doorgestuurd...",

	// ./components/RegisterConfirm/RegisterConfirm.js
	REGISTER_CONFIRM_EMAIL_LABEL: "U heeft uw account succesvol aangemaakt. Controleer uw e-mails om uw registratie te bevestigen...",

	// ./pages/Dashboard/Dashboard.js
	DASHBOARD_TITLE: "Dashboard",
	DASHBOARD_ERROR_MESSAGE: "Er is een fout opgetreden",

	// ./pages/Dashboard/appTiles.js
	DASHBOARD_APPTILES_BTN_OPEN: "Open",
	DASHBOARD_APPTILES_LOGO: "Logo",

	// ./pages/ErrorPage/ErrorPage.js
	ERROR_PAGE_MESSAGE: "Oeps - Pagina niet gevonden",

	// ./pages/Settings/Settings.js
	SETTINGS_TITLE: "Profiel",

	// ./pages/Settings/content.js
	SETTINGS_CONTENT_TAB_SIGNIN_LABEL: "INLOGGEGEVENS",
	SETTINGS_CONTENT_TAB_USER_DATA_LABEL: "GEBRUKERSGEGEVENS",
	SETTINGS_CONTENT_TAB_DEVICE_DATA_LABEL: "APPARAATGEGEVENS",
	SETTINGS_CONTENT_TAB_MFA_DATA_LABEL: "MFA GEGEVENS",

	// ./pages/Settings/tabDeviceData.js
	TAB_DEVICE_DATA_LABEL: "APPARAATGEGEVENS",
	TAB_DEVICE_DATA_CHIP_CURRENT_LABEL: "Deze",
	TAB_DEVICE_DATA_TEXTFIELD_STATUS_LABEL: "Toestand",
	TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL: "Naam",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL: "Laatst gebruikte IP-adres",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL: "Apparaat laatst gebruikt om",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL: "Apparaat laatst gewijzigd om",
	TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL: "Apparaatingang gemaakt op",
	TAB_DEVICE_DATA_BUTTON_REMEMBER_DEVICE_LABEL: "Onthoud apparaat",
	TAB_DEVICE_DATA_BUTTON_FORGET_DEVICE_LABEL: "Vergeet het apparaat",
	TAB_DEVICE_DATA_REMEMBER_DEVICE_MESSAGE: "Apparaat succesvol onthouden",
	TAB_DEVICE_DATA_FORGET_DEVICE_MESSAGE: "Apparaat succesvol vergeten",
	TAB_DEVICE_DATA_MESSAGE_EROR: "Er is een fout opgetreden",

	// ./pages/Settings/tabMfaData.js
	TAB_MFA_DATA_LABEL: 'MFA',
	TAB_MFA_DATA_SELECT_MFA_TYPE: "Configureer uw favoriete MFA-type",
	TAB_MFA_DATA_SELECT_TOTP: "TOTP",
	TAB_MFA_DATA_SELECT_SMS: "SMS",
	TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (Verifieer eerst uw telefoonnummer)",
	TAB_MFA_DATA_SELECT_NO_MFA: "Nee MFA",
	TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Verandering",
	TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Opslaan",
	TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
	TAB_MFA_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
	TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Definitie van MFA-type is geslaagdl",
	TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "De TOTP-installatie is gelukt",

	// ./pages/Settings/tabSignInData.js
	TAB_SIGNIN_DATA_LABEL: "INLOGGEGEVENS",
	TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Gebruikersnaam",
	TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-mail",
	TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Telefoonnummer",
	TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Wachtwoord",
	TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'geverifieerd',
	TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'niet geverifieerd',
	TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Veranderen",
	TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
	TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Opslaan",
	TAB_SIGNIN_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "De update is gelukt",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Controleer uw wijzigingen",
	TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Voer uw huidige en nieuwe wachtwoord in",
	TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "De verificatie is gelukt",

	// ./pages/Settings/tabUserData.js
	TAB_USER_DATA_LABEL: "GEBRUKERSGEGEVENS",
	TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Voornaam",
	TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Achternaam",
	TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adres",
	TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Geboortedatum",
	TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Geslacht",
	TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Nieuwsbrief",
	TAB_USER_DATA_SELECT_GENDER_0: "<Selecteer alstublieft>",
	TAB_USER_DATA_SELECT_GENDER_1: "Mannetje",
	TAB_USER_DATA_SELECT_GENDER_2: "Vrouw",
	TAB_USER_DATA_SELECT_GENDER_3: "X-geslacht",
	TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Voorkeurstaal",
	TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Veranderen",
	TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
	TAB_USER_DATA_SAVE_BUTTON_LABEL: "Opslaan",
	TAB_USER_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
	TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "De update is gelukt",

	// ./pages/TermsOfService/TermsOfService.js
	TERMS_OF_SERVICE_VERSION_ID: 1,
	TERMS_OF_SERVICE_MESSAGE_RESIGN: "Lees en accepteer de Servicevoorwaarden",
	TERMS_OF_SERVICE_MESSAGE_ACCEPTED: "De Servicevoorwaarden zijn geaccepteerd.",
	TERMS_OF_SERVICE_MESSAGE_ERROR: "Er is een fout opgetreden, probeer het opnieuw",
	TERMS_OF_SERVICE_MESSAGE_DECLINE: "De gebruiksvoorwaarden moeten worden geaccepteerd.",

	// ./pages/TermsOfService/content.js
	TERMS_OF_SERVICE_CONTENT_VERSION_LABEL: "Versie: 1.0.0",
	TERMS_OF_SERVICE_CONTENT_TITLE: "Servicevoorwaarden",
	TERMS_OF_SERVICE_CONTENT_P1: "1. Algemene voorschriften",
	TERMS_OF_SERVICE_CONTENT_P2: "2. Diensten van het platform",
	TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM: "NL - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL: "Aanvaarden",
	TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL: "Afwijzen",

	// ./components/AppBar/AppBar.js
	HEADER_MENU_ITEM_PROFILE: "Profiel",
	HEADER_MENU_ITEM_DASHBOARD: "Dashboard",
	HEADER_MENU_ITEM_LOGOUT: "Uitloggen",

	// ./components/ChangePasswordDialog/ChangePasswordDialog.js
	CHANGE_PASSWORD_TITLE: "Verander wachtwoord",
	CHANGE_PASSWORD_DESCRIPTION: "Voer uw huidige en nieuwe wachtwoord in",
	CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Huidig ​​wachtwoord",
	CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "nieuw paswoord",
	CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Opslaan",
	CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Dichtbij",
	CHANGE_PASSWORD_MESSAGE_EROR: "Er is een fout opgetreden",

	// ./components/LangeuageSelect/LanguageSelect.js
	LANGUAGESELECT_SELECT_LABEL: "Taal",

	// ./components/LogoutButton/LogoutButton.js
	LOGOUT_BUTTON_LABEL: "Uitloggen",

	// ./components/MfaTotpConfigDialog/MfaTotpConfigDialog.js
	MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP-configuratie",
	MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Multi-Factor Authentication (MFA) verbetert de beveiliging door een andere authenticatiemethode toe te voegen in plaats van alleen te vertrouwen op gebruikersnaam en wachtwoord.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP-aanvraagtoken",
	MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "U kunt op tijd gebaseerde eenmalige wachtwoorden (TOTP) gebruiken als tweede factor wanneer uw gebruikers inloggen.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "TOTP-token aanvragen",
	MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP-apparaat instellen",
	MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scan de QR-code met uw apparaat",
	MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP-apparaat activeren",
	MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activeer uw apparaat door het On-Time-wachtwoord in te voeren en klik op 'Activeren'",
	MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "On-Time-wachtwoord",
	MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activeren",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Naast",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Terug",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Dichtbij",
	MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Er is een fout opgetreden",

	// ./components/VerifyAttributeDialog/VerifyAttributeDialog.js
	VERIFY_DIALOG_TITLE: "Verify",
	VERIFY_DIALOG_DESCRIPTION: "Please enter the code:",
	VERIFY_DIALOG_INPUT_LABEL: "Code",
	VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verify",
	VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Close",
	VERIFY_DIALOG_MESSAGE_EROR: "Er is een fout opgetreden",

}
