/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

// Impossible to find import for now
import { Translations } from "@aws-amplify/ui-components"

// See official Amplify UI labels: https://github.com/aws-amplify/amplify-js/blob/master/packages/amplify-ui-components/src/common/Translations.ts
export const strings = {
    en: {
        [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "your.adress@example.com",
        [Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
        AWSSSO: "Sign In with AWS SSO (SAML)",
        OIDCIdentityProvider: "Sign In with Demo OIDC (oauth2)",
        AMAZON_SIGNIN: "Sign In with Amazon",
        GOOGLE_SIGNIN: "Sign In with Google",
        FACEBOOK_SIGNIN: "Sign In with Facebook",
        OR: "OR",
        WAIT_REDIRECTION: "You have successfully logged in, please wait while redirecting...",
        VERIFY_EMAIL: "You have successfully created an account. Please check your email to confirm your registration...",
        LOGO: "Logo",
        YOUR_APPLICATIONS: "Your Applications",
        LOGOUT: "Logout",
        LOGIN_TO: "Login to"
    },
    fr: {
        [Translations.NO_ACCOUNT_TEXT]: "Pas encore de compte ?",
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
        [Translations.PHONE_LABEL]: "Numéro de téléphone *",
        [Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
        [Translations.CONFIRM_SIGN_UP_CODE_LABEL]: 'Code de confirmation',
        [Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: 'entrez votre code',
        [Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: 'Confirmer linscription',
        [Translations.CONFIRM_SIGN_UP_LOST_CODE]: 'Vous avez perdu votre code?',
        [Translations.CONFIRM_SIGN_UP_RESEND_CODE]: 'Renvoyer le code',
        [Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: 'Confirmer',
        [Translations.SIGN_OUT]: 'Déconnexion',
        AWSSSO: "Connectez-vous avec AWS SSO (SAML)",
        OIDCIdentityProvider: "Connectez-vous avec Demo OIDC (oauth2)",
        AMAZON_SIGNIN: "Connectez-vous avec Amazon",
        GOOGLE_SIGNIN: "Connectez-vous avec Google",
        FACEBOOK_SIGNIN: "Connectez-vous avec Facebook",
        OR: "OU",
        WAIT_REDIRECTION: "Vous vous êtes connecté avec succès, attendez d'être redirigé...",
        VERIFY_EMAIL: "Vous avez créé un compte avec succès. Veuillez vérifier votre email pour confirmer votre inscription...",
        LOGO: "Logo",
        YOUR_APPLICATIONS: "Vos Applications",
        LOGOUT: "Se Deconnecter",
        LOGIN_TO: "Se connecter à"
    },
};
