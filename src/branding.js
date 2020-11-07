/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

/*
 * https://material-ui.com/customization/theming/
 * unstable_createMuiStrictModeTheme(options, ...args) => theme
 * WARNING: Do not use this method in production.
 * Generates a theme that reduces the amount of warnings inside React.StrictMode like Warning: findDOMNode is deprecated in StrictMode.
 */
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
//import { createMuiTheme } from '@material-ui/core/styles';

export const Branding = {
	appName: "Amplify Identity Broker",

	primary: "#272727",
	secondary: "#747474",
	accent: "#E1A338",

	neutral: "#E0E1E2",
	positive: "#9ACD32",
	negative: "#C10015",
	info: "#31CCEC",
	warning: "#F2C037",

	white: '#fff',
	black: '#000',
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
