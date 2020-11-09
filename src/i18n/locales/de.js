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
	[Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "ihre.email@exemple.de",
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
	AWSSSO: "Anmelden mit AWS SSO (SAML)",
	OIDCIdentityProvider: "Anmelden mit Demo OIDC (oauth2)",
	AMAZON_SIGNIN: "Anmelden mit Amazon",
	GOOGLE_SIGNIN: "Anmelden mit Google",
	FACEBOOK_SIGNIN: "Anmelden mit Facebook",
	OR: "ODER",
	WAIT_REDIRECTION: "Du hast Dich erfolgreich angemeldet, Du wirst nun weitergeleitet...",
	VERIFY_EMAIL: "Du hast Dein Konto erfolgreich angelegt. Bitte prüfe Deine E-Mails umd die Registrierung zu bestätigen...",
	LOGO: "Logo",
	YOUR_APPLICATIONS: "Deine Anwendungen",
	LOGOUT: "Abmelden",
	LOGIN_TO: "Anmelden an",
	USER_ATTRIBUTES: "Benutzerinformationen",
	// Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "Das Passwort darf nicht leer sein.",
	// This may change in the future: see https://github.com/aws-amplify/amplify-js/issues/6898
	"1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Dein Passwort muss mindestens 6 Zeichen lang sein.",
	"Username cannot be empty": "Der Benutzername muss eingegeben werden",
	"User does not exist.": "Der Benutzer existiert nicht",
	"An account with the given email already exists.": "Ein Konto mit dieser E-Mail-Adresse ist bereits vorhanden.",
	"User is disabled.": "Der Benutzer ist deaktiviert.",
	"Access Token has been revoked": "Der Zugriffstoken wurde widerrufen",
}
