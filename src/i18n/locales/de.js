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
	[Translations.NO_ACCOUNT_TEXT]: "Noch keinen Konto?",
	[Translations.RESET_YOUR_PASSWORD]: "Passwort zurücksetzen",
	[Translations.NEW_PASSWORD_LABEL]: "Neues Passwort",
	[Translations.NEW_PASSWORD_PLACEHOLDER]: "Gib Dein neues Passwort ein",
	[Translations.CREATE_ACCOUNT_TEXT]: "Ein Konto erstellen",
	[Translations.FORGOT_PASSWORD_TEXT]: "Haben Sie Ihr Passwort vergessen?",
	[Translations.RESET_PASSWORD_TEXT]: "Passwort zurücksetzen",
	[Translations.SIGN_IN_ACTION]: "ANMELDEN",
	[Translations.SIGN_IN_HEADER_TEXT]: "Am Konto anmelden",
	[Translations.SIGN_IN_TEXT]: "Anmelden",
	[Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "ihre.email@example.de",
	[Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "Hast Du noch kein Konto?",
	[Translations.SIGN_UP_HEADER_TEXT]: "Ein Konto erstellen",
	[Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "Passwort",
	[Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "KONTO ERSTELLEN",
	[Translations.SIGN_UP_USERNAME_PLACEHOLDER]: "Benutzeridentifikation",
	[Translations.SEND_CODE]: "Code senden",
	[Translations.BACK_TO_SIGN_IN]: "Zurück zur Anmeldung",
	[Translations.EMAIL_LABEL]: "E-Mail Adresse *",
	[Translations.EMAIL_PLACEHOLDER]: "ihre.email@exemple.de",
	[Translations.PASSWORD_LABEL]: "Passwort *",
	[Translations.PASSWORD_PLACEHOLDER]: "Geben Sie Ihr Passwort ein",
	[Translations.PHONE_LABEL]: "Telefonnummer *",
	[Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
	[Translations.CONFIRM_SIGN_UP_CODE_LABEL]: "Bestätigungscode",
	[Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: "Gib Deinen Code ein",
	[Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: "Registrierung bestätigen",
	[Translations.CONFIRM_SIGN_UP_LOST_CODE]: "Hast Du Deinen Code verloren?",
	[Translations.CONFIRM_SIGN_UP_RESEND_CODE]: "Code erneut senden",
	[Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: "Bestätigen",
	[Translations.SIGN_OUT]: "Abmelden",

	// Translate Amplify Messages
	"Username cannot be empty": "Der Benutzername muss eingegeben werden",
	"User does not exist.": "Der Benutzer existiert nicht",
	"An account with the given email already exists.": "Ein Konto mit dieser E-Mail-Adresse ist bereits vorhanden.",
	"User is disabled.": "Der Benutzer ist deaktiviert.",
	"Access Token has been revoked": "Der Zugriffstoken wurde widerrufen",
	// ### Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "Das Passwort darf nicht leer sein.",
	// ### This may change in the future: see https://github.com/aws-amplify/amplify-js/issues/6898
	"1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Dein Passwort muss mindestens 6 Zeichen lang sein.",

	// ./components/LandingPage/LandingPage.js
	LANDING_PAGE_BUTTON_IDP_AWSSSO_LABEL: "Anmelden mit AWS SSO (SAML)",
	LANDING_PAGE_BUTTON_IDP_OIDCIdentityProvider_LABEL: "Anmelden mit Demo OIDC (OAuth2)",
	LANDING_PAGE_BUTTON_IDP_AMAZON_SIGNIN_LABEL: "Anmelden mit Amazon",
	LANDING_PAGE_BUTTON_IDP_GOOGLE_SIGNIN_LABEL: "Anmelden mit Google",
	LANDING_PAGE_BUTTON_IDP_FACEBOOK_SIGNIN_LABEL: "Anmelden mit Facebook",
	LANDING_PAGE_CHIP_EXPAND_MORE_LABEL: "mehr",
	LANDING_PAGE_CHIP_EXPAND_LESS_LABEL: "weniger",
	LANDING_PAGE_WAIT_REDIRECTION: "Du hast Dich erfolgreich angemeldet, Du wirst nun weitergeleitet...",

	// ./components/RegisterConfirm/RegisterConfirm.js
	REGISTER_CONFIRM_EMAIL_LABEL: "Du hast Dein Konto erfolgreich angelegt. Bitte prüfe Deine E-Mails umd die Registrierung zu bestätigen...",


	// ./pages/Dashboard/Dashboard.js
	DASHBOARD_TITLE: "Dashboard",
	DASHBOARD_ERROR_MESSAGE: "Ist ein Fehler aufgetreten",

	// ./pages/Dashboard/appTiles.js
	DASHBOARD_APPTILES_BTN_OPEN: "Öffnen",
	DASHBOARD_APPTILES_LOGO: "Logo",

	// ./pages/ErrorPage/ErrorPage.js
	ERROR_PAGE_MESSAGE: "Oops - Die Seite wurde nicht gefunden",

	// ./pages/Settings/Settings.js
	SETTINGS_TITLE: "Profil",

	// ./pages/Settings/content.js
	SETTINGS_CONTENT_TAB_SIGNIN_LABEL: "ANMELDEINFORMATIONEN",
	SETTINGS_CONTENT_TAB_USER_DATA_LABEL: "BENUTZERINFORMATIONEN",
	SETTINGS_CONTENT_TAB_DEVICE_DATA_LABEL: "GERÄTEINFORMATIONEN",
	SETTINGS_CONTENT_TAB_MFA_DATA_LABEL: "MFA INFORMATIONEN",

	// ./pages/Settings/tabDeviceData.js
	TAB_DEVICE_DATA_LABEL: "GERÄTEINFORMATIONEN",
	TAB_DEVICE_DATA_CHIP_CURRENT_LABEL: "Dieses",
	TAB_DEVICE_DATA_TEXTFIELD_STATUS_LABEL: "Status",
	TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL: "Name",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL: "Letzte genutzte IP-Adresse",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL: "Gerät zu letzt verwendet am",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL: "Gerät zu letzt geändert am",
	TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL: "Geräteeintrag erzeugt am",
	TAB_DEVICE_DATA_BUTTON_REMEMBER_DEVICE_LABEL: "Gerät speichern",
	TAB_DEVICE_DATA_BUTTON_FORGET_DEVICE_LABEL: "Gerät entfernen",
	TAB_DEVICE_DATA_REMEMBER_DEVICE_MESSAGE: "Gerät erfolgreich gespeichert",
	TAB_DEVICE_DATA_FORGET_DEVICE_MESSAGE: "Gerät erfolgreich entfernt",
	TAB_DEVICE_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",

	// ./pages/Settings/tabMfaData.js
	TAB_MFA_DATA_LABEL: 'MFA',
	TAB_MFA_DATA_SELECT_MFA_TYPE: "Konfigurieren Sie Ihren bevorzugten MFA Typen",
	TAB_MFA_DATA_SELECT_TOTP: "TOTP",
	TAB_MFA_DATA_SELECT_SMS: "SMS",
	TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (Bitte verifizieren Sie zu erst Ihre Telefonnummer)",
	TAB_MFA_DATA_SELECT_NO_MFA: "Kein MFA",
	TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Ändern",
	TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Speichern",
	TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Abbrechen",
	TAB_MFA_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Der MFA Type wurde erfolgreich gesetzt",
	TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "Die TOTP Einrichtung war erfolgreich",

	// ./pages/Settings/tabSignInData.js
	TAB_SIGNIN_DATA_LABEL: "ANMELDEINFORMATIONEN",
	TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Benutzername",
	TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-Mail",
	TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Telefonnummer",
	TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Passwort",
	TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'verifiziert',
	TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'nicht verifiziert',
	TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Ändern",
	TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Abbrechen",
	TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Speichern",
	TAB_SIGNIN_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "Das Update war erflogreich",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Bitte verifizieren Sie Ihre Änderungen",
	TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Das Passwort wurde erfolgreich gesetzt",
	TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "Die Verifizierung war erfolgreich",

	// ./pages/Settings/tabUserData.js
	TAB_USER_DATA_LABEL: "BENUTZERINFORMATIONEN",
	TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Vorname",
	TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Nachname",
	TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adresse",
	TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Geburtsdatum",
	TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Geschlecht",
	TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Newsletter",
	TAB_USER_DATA_SELECT_GENDER_0: "<Bitte auswählen>",
	TAB_USER_DATA_SELECT_GENDER_1: "Männlich",
	TAB_USER_DATA_SELECT_GENDER_2: "Weiblich",
	TAB_USER_DATA_SELECT_GENDER_3: "X-gender",
	TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Bevorzugte Sprache",
	TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Ändern",
	TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Abbrechen",
	TAB_USER_DATA_SAVE_BUTTON_LABEL: "Speichern",
	TAB_USER_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "Das Update war erfolgreich",

	// ./pages/TermsOfService/TermsOfService.js
	TERMS_OF_SERVICE_VERSION_ID: 1,
	TERMS_OF_SERVICE_MESSAGE_RESIGN: "Bitte lese und akzeptiere die Nutzungsbedingungen",
	TERMS_OF_SERVICE_MESSAGE_ACCEPTED: "Du hast die Nutzungsbedingungen erfolgreich akzeptiert.",
	TERMS_OF_SERVICE_MESSAGE_ERROR: "Es ist ein Fehler aufgetreten, bitte versuche es erneut",
	TERMS_OF_SERVICE_MESSAGE_DECLINE: "Die Nutzungsbedingungen müssen akzeptiert werden.",

	// ./pages/TermsOfService/content.js
	TERMS_OF_SERVICE_CONTENT_VERSION_LABEL: "Version: 1.0.0",
	TERMS_OF_SERVICE_CONTENT_TITLE: "Nutzungsbedingungen",
	TERMS_OF_SERVICE_CONTENT_P1: "1. Allgemeine Vorschriften",
	TERMS_OF_SERVICE_CONTENT_P2: "2. Dienstleistungen der Plattform",
	TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM: "DE - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL: "Akzeptieren",
	TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL: "Ablehnen",

	// ./components/AppBar/AppBar.js
	HEADER_MENU_ITEM_PROFILE: "Profil",
	HEADER_MENU_ITEM_DASHBOARD: "Dashboard",
	HEADER_MENU_ITEM_LOGOUT: "Abmelden",

	// ./components/ChangePasswordDialog/ChangePasswordDialog.js
	CHANGE_PASSWORD_TITLE: "Passwort ändern",
	CHANGE_PASSWORD_DESCRIPTION: "Bitte geben Sie ihr aktuelles und neues Passwort ein",
	CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Aktuelles Password",
	CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "Neues Password",
	CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Speichern",
	CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Schließen",
	CHANGE_PASSWORD_MESSAGE_EROR: "Ist ein Fehler aufgetreten",

	// ./components/LangeuageSelect/LanguageSelect.js
	LANGUAGESELECT_SELECT_LABEL: "Sprache",

	// ./components/LogoutButton/LogoutButton.js
	LOGOUT_BUTTON_LABEL: "Abmelden",

	// ./components/MfaTotpConfigDialog/MfaTotpConfigDialog.js
	MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP Konfigurieren",
	MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Die Multi-Faktor-Authentifizierung (MFA) erhöht die Sicherheit, indem eine weitere Authentifizierungsmethode hinzufügt wird und diese sich nicht nur auf Benutzername und Passwort stützt.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP Token abrufen",
	MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "Sie können zeitbasierte Einmal-Passwörter (TOTP) als zweite Faktoren bei der Anmeldung Ihrer Benutzer verwenden.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "TOTP Token abrufen",
	MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP Gerät einrichten",
	MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scannen Sie den QR-Code mit Ihrem Gerät",
	MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP Gerät aktivieren",
	MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Aktivieren Sie Ihr Gerät in dem Sie das Einmal-Password eingeben und 'Aktivieren' klicken",
	MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "Einmal-Password",
	MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Aktivieren",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Weiter",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Zurück",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Schließen",
	MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Es ist ein Fehler aufgetreten",

	// ./components/VerifyAttributeDialog/VerifyAttributeDialog.js
	VERIFY_DIALOG_TITLE: "Verifizieren",
	VERIFY_DIALOG_DESCRIPTION: "Bitte geben Sie den Code:",
	VERIFY_DIALOG_INPUT_LABEL: "Code",
	VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verifizieren",
	VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Schließen",
	VERIFY_DIALOG_MESSAGE_EROR: "Ist ein Fehler aufgetreten",

}
