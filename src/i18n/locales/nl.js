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
	AWSSSO: "Aanmelden met AWS SSO (SAML)",
	OIDCIdentityProvider: "Aanmelden met Demo OIDC (oauth2)",
	AMAZON_SIGNIN: "Aanmelden met Amazon",
	GOOGLE_SIGNIN: "Aanmelden met Google",
	FACEBOOK_SIGNIN: "Aanmelden met Facebook",
	OR: "OF",
	WAIT_REDIRECTION: "Je bent succesvol ingelogd, je wordt nu doorgestuurd...",
	VERIFY_EMAIL: "U heeft uw account succesvol aangemaakt. Controleer uw e-mails om uw registratie te bevestigen...",
	LOGO: "Logo",
	YOUR_APPLICATIONS: "Uw applicaties",
	LOGOUT: "Afmelden",
	LOGIN_TO: "Aanmelden",
	USER_ATTRIBUTES: "Gebruikers informatie",
	// Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "Het wachtwoord mag niet leeg zijn.",
	// This may change in the future: see https://github.com/aws-amplify/amplify-js/issues/6898
	"1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Uw wachtwoord moet minimaal 6 tekens lang zijn.",
	"Username cannot be empty": "De gebruikersnaam moet worden ingevoerd",
	"User does not exist.": "De gebruiker bestaat niet",
	"An account with the given email already exists.": "Er bestaat al een account met dit e-mailadres.",
	"User is disabled.": "De gebruiker is gedeactiveerd.",
	"Access Token has been revoked": "Het toegangstoken is ingetrokken.",
}
