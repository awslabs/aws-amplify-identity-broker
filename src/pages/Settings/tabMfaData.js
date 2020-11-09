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

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';
import MfaTotpConfigDialog from '../../components/MfaTotpConfigDialog/MfaTotpConfigDialog';


/*
 * Localization
 */
const strings = {
	en: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_SELECT_MFA_TYPE: 'Configure your preferred MFA Type',
		TAB_MFA_DATA_SELECT_TOTP: "TOTP",
		TAB_MFA_DATA_SELECT_SMS: "SMS",
		TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (please verify your Phonenumber first)",
		TAB_MFA_DATA_SELECT_NO_MFA: "No MFA",
		TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Change",
		TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Save",
		TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Cancel",
		TAB_MFA_DATA_MESSAGE_EROR: "An error has occurred",
		TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Set MFA Type was successful",
		TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "Configuration of TOTP was successful",
	},
	fr: {
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
	},
	de: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_SELECT_MFA_TYPE: "Konfigurieren Sie Ihren bevorzugten MFA Typen",
		TAB_MFA_DATA_SELECT_TOTP: "TOTP",
		TAB_MFA_DATA_SELECT_SMS: "SMS",
		TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (bitt verifizieren Sie Ihre Telefonnummer zu erst)",
		TAB_MFA_DATA_SELECT_NO_MFA: "Kein MFA",
		TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Veranderen",
		TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Opslaan",
		TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
		TAB_MFA_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
		TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Der MFA Type wurde erfolgreich gesetzt",
		TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "Die TOTP Einrichtung war erfolgreich",
	},
	nl: {
		TAB_MFA_DATA_LABEL: 'MFA',
		TAB_MFA_DATA_SELECT_MFA_TYPE: "",
		TAB_MFA_DATA_SELECT_TOTP: "TOTP",
		TAB_MFA_DATA_SELECT_SMS: "SMS",
		TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED: "SMS (Verifieer eerst uw telefoonnummer)",
		TAB_MFA_DATA_SELECT_NO_MFA: "Nee MFA",
		TAB_MFA_DATA_CHANGE_BUTTON_LABEL: "Change",
		TAB_MFA_DATA_SAVE_BUTTON_LABEL: "Save",
		TAB_MFA_DATA_CANCEL_BUTTON_LABEL: "Cancel",
		TAB_MFA_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
		TAB_MFA_DATA_MESSAGE_SET_MFATYPE_SUCCESS: "Definitie van MFA-type is geslaagdl",
		TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS: "De TOTP-installatie is gelukt",
	},
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {

	},
	card: {
		minWidth: 400,
	},
	cardHeader: {
		backgroundColor: Branding.primary,
		color: Branding.white,
		height: 50,
		textAlign: 'center',
	},
	cardContent: {
		textAlign: 'center',
		padding: theme.spacing(1),
	},
	cardActions: {
		justifyContent: 'center',
	},
	buttonChange: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		background: Branding.secondary,
		color: Branding.white,
	},
	buttonCancel: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		color: Branding.negative,
	},
	buttonSave: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		color: Branding.positive,
	},
}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
		phone_number_verified: state.user.attributes.phone_number_verified || false,
	}
};

function TabMfaData(props) {
	const classes = useStyles();
	const [editMode, setEditMode] = React.useState(false)
	const [mfaType, setMfaType] = React.useState('');
	const [totpDialog, setTotpDialog] = React.useState(false);
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
						// set preferred MFA Type
						setMfaType(data)
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
	 * get the current preferred MFA and setMfaType
	*/
	if (mfaType === '') {
		getPreferredMFA();
	}

	/*
	* mfaType: SMS || TOTP || NOMFA
	*/
	const setPreferredMFA = (mfaType) => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.setPreferredMFA(CognitoUser, mfaType)
					.then((data) => {
						if (data === "SUCCESS")
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
	};

	const handleChangeClick = () => {
		setEditMode(true);
	};

	const handleCancelClick = () => {
		setEditMode(false);
		getPreferredMFA();
	};

	const handleSaveClick = () => {
		setEditMode(false);

		switch (mfaType) {
			case 'SOFTWARE_TOKEN_MFA':
				setTotpDialog(true);
				break;
			case 'SMS_MFA':
				setPreferredMFA('SMS');
				break;
			default:
				setPreferredMFA('NOMFA');
				break;
		}
	};

	const handleTotpDialogClose = (successful = false) => {
		setTotpDialog(false);

		if (successful) {
			setSnackBarOps({
				type: 'success',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_MFA_DATA_MESSAGE_VERIFY_TOTP_TOKEN_SUCCESS')
			})

			setPreferredMFA('TOTP');
		}

		getPreferredMFA();
	}

	const handleMfaTypeChange = (value) => {
		setMfaType(value);
	};

	return (
		<div className={classes.root}>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}

			{totpDialog && (<MfaTotpConfigDialog open={totpDialog} close={(successful) => handleTotpDialogClose(successful)} />)}

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={I18n.get('TAB_MFA_DATA_LABEL')}
				/>
				<CardContent className={classes.cardContent}>
					<Card variant="outlined">
						<CardContent className={classes.cardContent}>
							<FormControl component="fieldset">
								<FormLabel component="legend">
									{I18n.get('TAB_MFA_DATA_SELECT_MFA_TYPE')}
								</FormLabel>
								<RadioGroup
									name="mfaType"
									value={mfaType}
									onChange={(event) => handleMfaTypeChange(event.target.value)}
									aria-label="mfaType"
								>
									<FormControlLabel
										value="SOFTWARE_TOKEN_MFA"
										disabled={!editMode}
										control={<Radio />}
										label={I18n.get('TAB_MFA_DATA_SELECT_TOTP')}
									/>
									<FormControlLabel
										value="SMS_MFA"
										disabled={!editMode || !props.phone_number_verified}
										control={<Radio />}
										label={props.phone_number_verified ? I18n.get('TAB_MFA_DATA_SELECT_SMS') : I18n.get('TAB_MFA_DATA_SELECT_SMS_NOT_VERIFIED')}
									/>
									<FormControlLabel
										value="NOMFA"
										disabled={!editMode}
										control={<Radio />}
										label={I18n.get('TAB_MFA_DATA_SELECT_NO_MFA')}
									/>
								</RadioGroup>
							</FormControl>
						</CardContent >
						<CardActions className={classes.cardActions}>
							{!editMode && (
								<Button
									variant="contained"
									color="secondary"
									onClick={() => handleChangeClick()}
								>
									{I18n.get('TAB_MFA_DATA_CHANGE_BUTTON_LABEL')}
								</Button>
							)}

							{editMode && (
								<Button
									variant="outlined"
									onClick={() => handleSaveClick()}
									className={classes.buttonSave}
								>
									{I18n.get('TAB_MFA_DATA_SAVE_BUTTON_LABEL')}
								</Button>
							)}

							{editMode && (
								<Button
									variant="outlined"
									onClick={() => handleCancelClick()}
									className={classes.buttonCancel}
								>
									{I18n.get('TAB_MFA_DATA_CANCEL_BUTTON_LABEL')}
								</Button>
							)}
						</CardActions>
					</Card >
				</CardContent >
			</Card >
		</div>
	)
}

export default connect(mapStateToProps, {})(TabMfaData)
