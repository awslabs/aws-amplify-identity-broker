/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
*/

/*
 * Details to use MFA you will find here:
 * https://docs.amplify.aws/lib/auth/mfa/q/platform/js
*/

import React from 'react';
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import QRCode from 'qrcode.react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';

/*
 * Localization
 */
const strings = {
	en: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_MESSAGE_EROR: "An error has occurred",
		TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Set MFA Type was successful",
		TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "Token verification successful",
	},
	fr: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_MESSAGE_EROR: "Une erreur est survenue",
	},
	de: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	},
	nl: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
	},
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({

}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
	}
};

function TabMfaData(props) {
	const classes = useStyles();
	const [qrCode, setQrCode] = React.useState({
		show: false,
		str: '',
	})
	const [totpToken, setTotpToken] = React.useState('');
	const [mfaType, setMfaType] = React.useState('');
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	const getPreferredMFA = () => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.getPreferredMFA(CognitoUser, {
					// Optional, by default is false.
					// If set to true, it will get the MFA type from server side instead of from local cache.
					bypassCache: false
				})
					.then((data) => {
						setMfaType(data);

						console.log('Current preferred MFA type is: ' + data);
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
						})
					})
			})
			.catch(err => {
				console.log(err);

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
				})
			})
	};

	/*
	* mfaType: SMS || TOTP || NOMFA
	*/
	const setPreferredMFA = (mfaType) => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.setPreferredMFA(CognitoUser, mfaType)
					.then((data) => {
						if (data === 'SUCCESS')
							setSnackBarOps({
								type: 'success',
								open: true,
								vertical: 'top',
								horizontal: 'center',
								autoHide: 3000,
								message: I18n.get('TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS')
							})

						getPreferredMFA();
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
						})
					})
			})
			.catch(err => {
				console.log(err);

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
				})
			})
	}


	const setupTOTP = () => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.setupTOTP(CognitoUser)
					.then((code) => {
						console.log(code);
						console.log(CognitoUser.username);
						setQrCode({
							show: true,
							str: `otpauth://totp/AWSCognito:${CognitoUser.username}?secret=${code}&issuer=TestApp`
						});
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
						})
					})
			})
			.catch(err => {
				console.log(err);

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
				})
			})
	};

	const verifyTotpToken = (challengeAnswer) => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.verifyTotpToken(CognitoUser, challengeAnswer)
					.then(() => {
						setQrCode({ show: false, str: '' });
						setSnackBarOps({
							type: 'success',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS')
						})

						// don't forget to set TOTP as the preferred MFA method
						setPreferredMFA('TOTP');
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
						})
					})
			})
			.catch(err => {
				console.log(err);

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('TAB_MFA_DATA_MESSAGE_EROR')
				})
			})
	};

	return (
		<div>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}



			<Box>
				MFA Type: {mfaType}
				<Button variant="contained" color="secondary" onClick={() => getPreferredMFA()}>Get preferred MFA Type</Button>
			</Box>
			<Box>
				<Button variant="contained" color="secondary" onClick={() => setPreferredMFA('TOTP')}>set TOTP</Button>
				<Button variant="contained" color="secondary" onClick={() => setPreferredMFA('SMS')}>set SMS</Button>
				<Button variant="contained" color="secondary" onClick={() => setPreferredMFA('NOMFA')}>set NOMFA</Button>
			</Box>
			<Box>
				<Button variant="contained" color="secondary" onClick={() => setupTOTP()}>QR</Button>
				<Box>
					{qrCode.show && (<QRCode
						//https://www.npmjs.com/package/qrcode.react
						value={qrCode.str}
					/>)}
				</Box>
			</Box>
			<Box>


				<TextField
					id="textfield_verify_token"
					value={totpToken}
					label='verify Token' //{I18n.get('TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL')}
					onChange={(event) => setTotpToken(event.target.value)}
					inputProps={{ style: { left: 0 } }}
				/>
				<Button variant="contained" color="secondary" onClick={() => verifyTotpToken(totpToken)}>verify</Button>
			</Box>
		</div>
	)
}

export default connect(mapStateToProps, {})(TabMfaData)
