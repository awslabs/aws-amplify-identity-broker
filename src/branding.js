/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

/*
 * DO NOT FOREGET TO UPDATE './index.js' for the Amplify ColorSet
 */


/*
 * https://material-ui.com/customization/theming/
 * unstable_createMuiStrictModeTheme(options, ...args) => theme
 * WARNING: Do not use this method in production.
 * Generates a theme that reduces the amount of warnings inside React.StrictMode like Warning: findDOMNode is deprecated in StrictMode.
 */
import { blueGrey, blue, green, orange, red } from '@material-ui/core/colors';

import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
//import { createMuiTheme } from '@material-ui/core/styles';

export const Branding = {
	appName: "Amplify Identity Broker",

	primary: blueGrey[900], 					// #263238,
	secondary: blueGrey[300], 					// #90a4ae,
	accent: orange[500],						// #ff9800

	neutral: blueGrey[50], 						// #eceff1
	positive: green[700], 						// #689f38
	negative: red[700], 						// #d32f2f
	info: blue[700],							// #1976d2
	warning: orange[700],						// #f57c00

	cardHeaderColorPrimary: blueGrey[100],		// #cfd8dc
	cardHeaderColorAccent: orange[500],			// #ff9800

	white: '#fff',								// #fff
	black: '#000',								// #000
}

export const theme = unstable_createMuiStrictModeTheme({
	//export const theme = createMuiTheme({
	palette: {
		primary: {
			main: Branding.primary,
			contrastText: Branding.white,
		},
		secondary: {
			main: Branding.secondary,
			contrastText: Branding.white,
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	spacing: 8,
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	overrides: {

	},
});
