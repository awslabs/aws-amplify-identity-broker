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
	[Translations.NO_ACCOUNT_TEXT]: "Pas encore de compte ?",
	[Translations.RESET_YOUR_PASSWORD]: "Réinitialiser votre mot de passe",
	[Translations.NEW_PASSWORD_LABEL]: "Nouveau mot de passe",
	[Translations.NEW_PASSWORD_PLACEHOLDER]: "Entrez votre nouveau mot de passe",
	[Translations.CREATE_ACCOUNT_TEXT]: "créer un compte",
	[Translations.FORGOT_PASSWORD_TEXT]: "Mot de passe oublié ?",
	[Translations.RESET_PASSWORD_TEXT]: "Réinitialiser le mot de passe",
	[Translations.SIGN_IN_ACTION]: "CONNEXION",
	[Translations.SIGN_IN_HEADER_TEXT]: "Connexion à votre compte",
	[Translations.SIGN_IN_TEXT]: "Se connecter",
	[Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "votre.email@exemple.com",
	[Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "Vous avez un compte ?",
	[Translations.SIGN_UP_HEADER_TEXT]: "Créer un compte",
	[Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "Mot de passe",
	[Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "CREER COMPTE",
	[Translations.SIGN_UP_USERNAME_PLACEHOLDER]: "Identifiant",
	[Translations.SEND_CODE]: "Envoyer le code",
	[Translations.BACK_TO_SIGN_IN]: "Retour à connexion",
	[Translations.EMAIL_LABEL]: "Adresse de messagerie *",
	[Translations.EMAIL_PLACEHOLDER]: "votre.email@exemple.com",
	[Translations.PASSWORD_LABEL]: "Mot de passe *",
	[Translations.PASSWORD_PLACEHOLDER]: "Entrez votre mot de passe",
	[Translations.PHONE_LABEL]: "Numéro de téléphone",
	[Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
	[Translations.CONFIRM_SIGN_UP_CODE_LABEL]: 'Code de confirmation',
	[Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: 'entrez votre code',
	[Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: "Confirmer l'inscription",
	[Translations.CONFIRM_SIGN_UP_LOST_CODE]: 'Vous avez perdu votre code?',
	[Translations.CONFIRM_SIGN_UP_RESEND_CODE]: 'Renvoyer le code',
	[Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: 'Confirmer',
	[Translations.SIGN_OUT]: 'Déconnexion',

	// Translate Amplify Messages
	"Username cannot be empty": "Le nom d'utilisateur doit être renseigné",
	"User does not exist.": "L'utilisateur n'existe pas.",
	"An account with the given email already exists.": "Un compte avec cette adresse couriel existe déjà.",
	"User is disabled.": "L'utilisateur est désactivé.",
	"Access Token has been revoked": "Le jeton d'accès a été révoqué",
	// ### Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	"Custom auth lambda trigger is not configured for the user pool.": "Veuillez renseigner le mot de passe.",
	// ### This may change in the future: see https://github.com/aws-amplify/amplify-js/issues/6898
	"1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Le mot de passe doit faire au moins 6 caractères.",

	// ./components/LandingPage/LandingPage.js
	LANDING_PAGE_BUTTON_IDP_AWSSSO_LABEL: "Connectez-vous avec AWS SSO (SAML)",
	LANDING_PAGE_BUTTON_IDP_OIDCIdentityProvider_LABEL: "Connectez-vous avec Demo OIDC (oauth2)",
	LANDING_PAGE_BUTTON_IDP_AMAZON_SIGNIN_LABEL: "Connectez-vous avec Amazon",
	LANDING_PAGE_BUTTON_IDP_GOOGLE_SIGNIN_LABEL: "Connectez-vous avec Google",
	LANDING_PAGE_BUTTON_IDP_FACEBOOK_SIGNIN_LABEL: "Connectez-vous avec Facebook",
	LANDING_PAGE_DIVIDER_TEXT: "ou",
	LANDING_PAGE_CHIP_EXPAND_MORE_LABEL: "plus",
	LANDING_PAGE_CHIP_EXPAND_LESS_LABEL: "moins",
	LANDING_PAGE_WAIT_REDIRECTION: "Vous vous êtes connecté avec succès, attendez d'être redirigé...",

	// ./components/RegisterConfirm/RegisterConfirm.js
	REGISTER_CONFIRM_EMAIL_LABEL: "Vous avez créé un compte avec succès. Veuillez vérifier votre email pour confirmer votre inscription...",

	// ./pages/Dashboard/Dashboard.js
	DASHBOARD_TITLE: "Tableau de bord",
	DASHBOARD_ERROR_MESSAGE: "Une erreur est survenue",

	// ./pages/Dashboard/appTiles.js
	DASHBOARD_APPTILES_BTN_OPEN: "Ouvrir",
	DASHBOARD_APPTILES_LOGO: "Logo",

	// ./pages/ErrorPage/ErrorPage.js
	ERROR_PAGE_MESSAGE: "Oups - Page introuvable",

	// ./pages/Settings/Settings.js
	SETTINGS_TITLE: "Profil",

	// ./pages/Settings/content.js
	SETTINGS_CONTENT_TAB_SIGNIN_LABEL: "INFORMATIONS DE CONNEXION",
	SETTINGS_CONTENT_TAB_USER_DATA_LABEL: "DONNÉES D'UTILISATEUR",
	SETTINGS_CONTENT_TAB_DEVICE_DATA_LABEL: "DONNEES DE L'APPAREIL",
	SETTINGS_CONTENT_TAB_MFA_DATA_LABEL: "DONNEES DE MFA",

	// ./pages/Settings/tabDeviceData.js
	TAB_DEVICE_DATA_LABEL: "DONNEES DE L'APPAREIL",
	TAB_DEVICE_DATA_CHIP_CURRENT_LABEL: "Cette",
	TAB_DEVICE_DATA_TEXTFIELD_STATUS_LABEL: "Statut",
	TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL: "Nom",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL: "Dernière adresse IP utilisée",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL: "Appareil utilisé pour la dernière fois à",
	TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL: "Périphérique modifié pour la dernière fois à",
	TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL: "Entrée d'appareil créée à",
	TAB_DEVICE_DATA_BUTTON_REMEMBER_DEVICE_LABEL: "Se souvenir de l'appareil",
	TAB_DEVICE_DATA_BUTTON_FORGET_DEVICE_LABEL: "Oubliez l'appareil",
	TAB_DEVICE_DATA_REMEMBER_DEVICE_MESSAGE: "Appareil réussi mémorisé",
	TAB_DEVICE_DATA_FORGET_DEVICE_MESSAGE: "Oubliez l'appareil",
	TAB_DEVICE_DATA_MESSAGE_EROR: "Une erreur est survenue",

	// ./pages/Settings/tabMfaData.js
	TAB_MFA_DATA_LABEL: 'MFA',
	TAB_MFA_DATA_SELECT_MFA_TYPE: "Configurez votre type MFA préféré",
	TAB_MFA_DATA_SELECT_TOTP: "TOTP",
	TAB_MFA_DATA_SELECT_SMS: "SMS",
	TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (veuillez d'abord vérifier votre numéro de téléphone)",
	TAB_MFA_DATA_SELECT_NO_MFA: "Non MFA",
	TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Changer",
	TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Sauver",
	TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Avorter",
	TAB_MFA_DATA_MESSAGE_EROR: "Une erreur est survenue",
	TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "La définition du type MFA a réussi",
	TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "La configuration TOTP a réussi",

	// ./pages/Settings/tabSignInData.js
	TAB_SIGNIN_DATA_LABEL: "INFORMATIONS DE CONNEXION",
	TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Nom d'utilisateur",
	TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "Email",
	TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Numéro de téléphone",
	TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'vérifié',
	TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'non vérifié',
	TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Avorter",
	TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Sauver",
	TAB_SIGNIN_DATA_CHANGE_PASSWORD_LABEL: "Changer le mot de passe",
	TAB_SIGNIN_DATA_MESSAGE_EROR: "Une erreur est survenue",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "La mise à jour a réussi",
	TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Veuillez vérifier vos modifications",
	TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Veuillez saisir votre nouveau mot de passe actuel",
	TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "La vérification a réussi",
	TAB_SIGNIN_DATA_MESSAGE_EMAIL_VALIDATION_ERROR: "Adresse e-mail invalide",
	TAB_SIGNIN_DATA_MESSAGE_PHONE_NUMBER_VALIDATION_ERROR: "Numéro de téléphone invalide. Un numéro de téléphone ne peut contenir que le signe + et des chiffres",

	// ./pages/Settings/tabUserData.js
	TAB_USER_DATA_LABEL: "DONNÉES D'UTILISATEUR",
	TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Prénom",
	TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Nom de famille",
	TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adresse",
	TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Date de naissance",
	TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Le genre",
	TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Bulletin",
	TAB_USER_DATA_SELECT_GENDER_0: "<Veuillez sélectionner>",
	TAB_USER_DATA_SELECT_GENDER_1: "Homme",
	TAB_USER_DATA_SELECT_GENDER_2: "Femme",
	TAB_USER_DATA_SELECT_GENDER_3: "Autre",
	TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Langue préférée",
	TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Changer",
	TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Abandonner",
	TAB_USER_DATA_SAVE_BUTTON_LABEL: "Sauver",
	TAB_USER_DATA_MESSAGE_EROR: "Une erreur est survenue",
	TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "La mise à jour a réussi",

	// ./pages/TermsOfService/TermsOfService.js
	TERMS_OF_SERVICE_VERSION_ID: 1,
	TERMS_OF_SERVICE_MESSAGE_RESIGN: "Veuillez lire et accepter les conditions d'utilisation",
	TERMS_OF_SERVICE_MESSAGE_ACCEPTED: "Les conditions d'utilisation ont été acceptées avec succès.",
	TERMS_OF_SERVICE_MESSAGE_ERROR: "Une erreur s'est produite, veuillez réessayer",
	TERMS_OF_SERVICE_MESSAGE_DECLINE: "Les conditions d'utilisation doivent être acceptées.",

	// ./pages/TermsOfService/content.js
	TERMS_OF_SERVICE_CONTENT_VERSION_LABEL: "Version: 1.0.0",
	TERMS_OF_SERVICE_CONTENT_TITLE: "Conditions d'utilisation",
	TERMS_OF_SERVICE_CONTENT_P1: "1. Règlement général",
	TERMS_OF_SERVICE_CONTENT_P2: "2. Services de la plateforme",
	TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM: "FR - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL: "Accepter",
	TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL: "Décliner",

	// ./pages/xxx/xxx.js
	IMPRINT_TITLE: "Imprimer",

	// ./components/AppBar/AppBar.js
	HEADER_MENU_ITEM_PROFILE: "Profil",
	HEADER_MENU_ITEM_DASHBOARD: "Tableau de bord",
	HEADER_MENU_ITEM_LOGOUT: "Se déconnecter",

	// ./components/ChangePasswordDialog/ChangePasswordDialog.js
	CHANGE_PASSWORD_TITLE: "Changer le mot de passe",
	CHANGE_PASSWORD_DESCRIPTION: "Veuillez saisir votre nouveau mot de passe actuel",
	CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Mot de passe actuel",
	CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "Nouveau mot de passe",
	CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Sauver",
	CHANGE_PASSWORD_CANCEL_BUTTON_LABEL: "Avorter",
	CHANGE_PASSWORD_MESSAGE_EROR: "Une erreur est survenue",

	// ./components/LangeuageSelect/LanguageSelect.js
	LANGUAGESELECT_SELECT_LABEL: "Langue",

	// ./components/LogoutButton/LogoutButton.js
	LOGOUT_BUTTON_LABEL: "Se déconnecter",

	// ./components/MfaTotpConfigDialog/MfaTotpConfigDialog.js
	MFA_TOTP_CONFIG_DIALOG_TITLE: "Configuration TOTP",
	MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "L'authentification multifacteur (MFA) améliore la sécurité en ajoutant une autre méthode d'authentification plutôt que de se fier uniquement au nom d'utilisateur et au mot de passe.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "Jeton de demande TOTP",
	MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "Vous pouvez utiliser des mots de passe à usage unique basés sur le temps (TOTP) comme second facteur lorsque vos utilisateurs se connectent.",
	MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "Demander un jeton TOTP",
	MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "Configuration de l'appareil TOTP",
	MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scannez le QR-Code avec votre appareil",
	MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "Activation du périphérique TOTP",
	MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activez votre appareil en entrant le mot de passe à usage unique et cliquez sur 'Activer'",
	MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "Passe à usage unique",
	MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activer",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Suivant",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Retour",
	MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Fermer",
	MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Une erreur est survenue",

	// ./components/VerifyAttributeDialog/VerifyAttributeDialog.js
	VERIFY_DIALOG_TITLE: "Verification",
	VERIFY_DIALOG_DESCRIPTION: "Entrez le code s'il vous plaît:",
	VERIFY_DIALOG_INPUT_LABEL: "Code",
	VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verifier",
	VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Close",
	VERIFY_DIALOG_MESSAGE_EROR: "Une erreur est survenue",

}
