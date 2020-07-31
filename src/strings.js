/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 
Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
or in the "license" file accompanying this file. This file is distributed 
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied. See the License for the specific language governing 
permissions and limitations under the License. */

// Impossible to find import for now
import { Translations } from "@aws-amplify/ui-components"

// See official Amplify UI labels: https://github.com/aws-amplify/amplify-js/blob/master/packages/amplify-ui-components/src/common/Translations.ts
export const strings = {
    en: {
        [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "your.adress@example.com",
        [Translations.PHONE_PLACEHOLDER]: "(555) 555-1234",
        AWSSSO: "Sign In with AWS SSO (SAML)",
        AMAZON_SIGNIN: "Sign In with Amazon",
        GOOGLE_SIGNIN: "Sign In with Google",
        FACEBOOK_SIGNIN: "Sign In with Facebook",
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
        AWSSSO: "Connectez-vous avec AWS SSO (SAML)",
        AMAZON_SIGNIN: "Connectez-vous avec Amazon",
        GOOGLE_SIGNIN: "Connectez-vous avec Google",
        FACEBOOK_SIGNIN: "Connectez-vous avec Facebook",
    },
};
