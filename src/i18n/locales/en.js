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
	"Custom auth lambda trigger is not configured for the user pool.": "Password cannot be empty.", // Temporary: see https://github.com/aws-amplify/amplify-js/issues/5623
	LOGO: "Logo",
	YOUR_APPLICATIONS: "Your Applications",
	LOGOUT: "Logout",
	LOGIN_TO: "Login to",
	USER_ATTRIBUTES: "User Attributes",
	EMAIL_ADDRESS: "Email Address",
	PASSWORD: "Password",
}
