/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { AccountBox, MailOutline, VpnKey, Smartphone } from '@material-ui/icons';

import { Branding } from '../../branding';
import LogOutButton from '../../components/LogoutButton/LogoutButton';
import VerifyAttributeDialog from '../../components/VerifyAttributeDialog/VerifyAttributeDialog';
import ChangePasswordDialog from '../../components/ChangePasswordDialog/ChangePasswordDialog';
import AppSnackbar from '../../components/Snackbar/Snackbar';
import { setUser, setUserEmail, setUserPhonenumber } from '../../redux/actions';

/*
 * Localization
 */
const strings = {
	en: {
		TAB_SIGNIN_DATA_LABEL: "SIGN IN INFORMATION",
		TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Username",
		TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-Mail",
		TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Phonenumber",
		TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Password",
		TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'verified',
		TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'unverified',
		TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Change",
		TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Cancel",
		TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Save",
		TAB_SIGNIN_DATA_MESSAGE_EROR: "An error has occurred",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "The update was successful",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Please verify your changes",
		TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "The password was successful set",
		TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "The verification was successful",
	},
	fr: {
		TAB_SIGNIN_DATA_LABEL: "INFORMATIONS DE CONNEXION",
		TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Nom d'utilisateur",
		TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "Email",
		TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Numéro de téléphone",
		TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Mot de passe",
		TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'vérifié',
		TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'non vérifié',
		TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Changer",
		TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Avorter",
		TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Sauver",
		TAB_SIGNIN_DATA_MESSAGE_EROR: "Une erreur est survenue",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "La mise à jour a réussi",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Veuillez vérifier vos modifications",
		TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Veuillez saisir votre nouveau mot de passe actuel",
		TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "La vérification a réussi",
	},
	de: {
		TAB_SIGNIN_DATA_LABEL: "ANMELDEINFORMATIONEN",
		TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Benutzername",
		TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-Mail",
		TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Telefonnummer",
		TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Passwort",
		TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'verifiziert',
		TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'nicht verifiziert',
		TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Ändern",
		TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Abbrechen",
		TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Speichern",
		TAB_SIGNIN_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "Das Update war erflogreich",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Bitte verifizieren Sie Ihre Änderungen",
		TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Das Passwort wurde erfolgreich gesetzt",
		TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "Die Verifizierung war erfolgreich",
	},
	nl: {
		TAB_SIGNIN_DATA_LABEL: "INLOGGEGEVENS",
		TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL: "Gebruikersnaam",
		TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL: "E-mail",
		TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL: "Telefoonnummer",
		TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL: "Wachtwoord",
		TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL: 'geverifieerd',
		TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL: 'niet geverifieerd',
		TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL: "Veranderen",
		TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
		TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL: "Opslaan",
		TAB_SIGNIN_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "De update is gelukt",
		TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST: "Controleer uw wijzigingen",
		TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS: "Voer uw huidige en nieuwe wachtwoord in",
		TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS: "De verificatie is gelukt",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {

	},
	header: {
		backgroundColor: Branding.primary,
		color: Branding.white,
		height: 50,
		textAlign: 'center',
	},
	title: {
		fontSize: 14,
	},
	cardContent: {
		textAlign: 'left',
		paddingBottom: 0,
	},
	cardActions: {
		justifyContent: 'center',
	},
	boxInputField: {
		margin: theme.spacing(2),
	},
	textFieldIcon: {
		color: Branding.secondary,
	},
	formControl: {

	},
	input: {
		minWidth: 300,
	},
	chipVerified: {
		marginTop: -50,
		backgroundColor: Branding.positive,
		color: Branding.white,
	},
	chipUnverified: {
		marginTop: -50,
		backgroundColor: Branding.negative,
		color: Branding.white,
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
	buttonAccountDelete: {
		color: Branding.negative
	},
}));

const mapStateToProps = (state) => {
	return {
		...state,
		username: state.user.attributes.username || '',
		email: state.user.attributes.email || '',
		email_verified: state.user.attributes.email_verified || false,
		phone_number: state.user.attributes.phone_number || '',
		phone_number_verified: state.user.attributes.phone_number_verified,
	}
}

const TabSignInData = (props) => {
	const classes = useStyles();
	const [editEmail, setEditEmail] = React.useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
	const [passwordChange, setPasswordChange] = React.useState(false);
	const [verifyAttribute, setVerifyAttribute] = React.useState({
		type: '',
		open: false
	});
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	// To initiate the process of verifying the attribute like 'phone_number' or 'email'
	const verifyCurrentUserAttribute = (attr) => {
		Auth.verifyCurrentUserAttribute(attr)
			.then(() => {
				setVerifyAttribute({ type: attr, open: true });
			}).catch((err) => {
				console.log(err);
				props.reloadUserData();

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_EROR')
				})
			});
	}

	/*
	 * attributes = String
	 * converted to JSON
	 * Example: {"email": "your.name@example.com"}
	 */
	const updateUserAttributes = (attributes, attr = null) => {
		let jsonAttributes = JSON.parse(attributes)
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.updateUserAttributes(CognitoUser, jsonAttributes)
					.then(() => {
						setSnackBarOps({
							type: 'success',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS')
						})

						if (attr === 'email') {
							setVerifyAttribute({ type: attr, open: true })
							setSnackBarOps({
								type: 'info',
								open: true,
								vertical: 'top',
								horizontal: 'center',
								autoHide: 3000,
								message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_UPDATE_ATTRIBUTE_VERIFYCATION_REQUEST')
							})
						}

						props.reloadUserData();
					})
					.catch(err => {
						console.log(err)

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_EROR')
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
					message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_EROR')
				})
			})
	};

	const handleEmailChange = (value) => {
		if (!value) return;

		props.setUserEmail(value);
	};

	const handlePhoneNumberChange = (value) => {
		if (!value) return;

		props.setUserPhonenumber(value);
	};

	const handleAttributeChange = (attr) => {
		switch (attr) {
			case 'email':
				setEditEmail(true);
				break;
			case 'phone_number':
				setEditPhoneNumber(true);
				break;
			case 'password':
				setPasswordChange(true);
				break;
			default:
				break;
		}
	};

	const handleAttributeCancel = (attr) => {
		switch (attr) {
			case 'email':
				setEditEmail(false);
				break;
			case 'phone_number':
				setEditPhoneNumber(false);
				break;
			default:
				break;
		}

		props.reloadUserData();
	};

	const handleAttributeSave = (attr) => {
		switch (attr) {
			case 'email':
				updateUserAttributes(`{"${attr}": "${props.email}"}`, attr)
				setEditEmail(false);
				break;
			case 'phone_number':
				updateUserAttributes(`{"${attr}": "${props.phone_number}"}`, attr)
				setEditPhoneNumber(false);
				break;
			default:
				break;
		}
	};

	const handleCloseVerifyDialog = (successful = false) => {
		if (successful === true) {
			setSnackBarOps({
				type: 'success',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_VERIFY_ATTRIBUTE_MESSAGE_SUCCESS')
			});
		};

		setVerifyAttribute({ type: '', open: false })
	}

	const handleClosePasswordDialog = (successful = false) => {
		if (successful === true) {
			setSnackBarOps({
				type: 'success',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_SIGNIN_DATA_MESSAGE_PASSWORD_CHANGE_SUCCESS')
			});
		};

		setPasswordChange(false);
	}

	return (
		<div>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}

			{verifyAttribute.open && (
				<VerifyAttributeDialog
					attrType={verifyAttribute.type}
					open={verifyAttribute.open}
					close={(successful) => handleCloseVerifyDialog(successful)}
					reloadUserData={props.reloadUserData}
				/>
			)}

			{passwordChange && (
				<ChangePasswordDialog
					open={passwordChange}
					close={(successful) => handleClosePasswordDialog(successful)} />
			)}

			<Card className={classes.root} variant="outlined">
				<CardHeader
					className={classes.header}
					title={I18n.get('TAB_SIGNIN_LABEL')}
				/>
				<CardContent className={classes.cardContent}>
					{/*
					* Username - disabled
					*/}
					< Box className={classes.boxInputField} >
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="inputUsername">
								{I18n.get('TAB_SIGNIN_DATA_USERNAME_INPUT_LABEL')}
							</InputLabel>
							<Input
								value={props.username}
								id="inputUsername"
								disabled
								startAdornment={
									<InputAdornment position="start">
										<AccountBox className={classes.textFieldIcon} />
									</InputAdornment>
								}
								className={classes.input}
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
					</Box >
					{/*
					* E-Mail
					*/}
					< Box className={classes.boxInputField} >
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="inputEmail">
								{I18n.get('TAB_SIGNIN_DATA_EMAIL_INPUT_LABEL')}
							</InputLabel>
							<Input
								value={props.email}
								id="inputEmail"
								disabled={!editEmail}
								onChange={(event) => handleEmailChange(event.target.value)}
								startAdornment={
									<InputAdornment position="start">
										<MailOutline className={classes.textFieldIcon} />
									</InputAdornment>
								}
								endAdornment={
									!editEmail && (
										<InputAdornment position="end">
											{(props.email && props.email_verified) && (
												<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL')} size="small" className={classes.chipVerified} />
											)}
											{(props.email && !props.email_verified) && (
												<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL')} size="small" className={classes.chipUnverified} onClick={() => verifyCurrentUserAttribute('email')} />
											)}
										</InputAdornment>
									)}
								className={classes.input}
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
						{!editEmail && (
							<Button variant="contained" onClick={() => handleAttributeChange('email')} className={classes.buttonChange}>
								{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
							</Button>
						)}
						{editEmail && (
							<div>
								<Button variant="outlined" onClick={() => handleAttributeSave('email')} className={classes.buttonSave}>
									{I18n.get('TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL')}
								</Button>
								<Button variant="outlined" onClick={() => handleAttributeCancel('email')} className={classes.buttonCancel}>
									{I18n.get('TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL')}
								</Button>
							</div>
						)}
					</Box >
					{/*
					* Phonenumber
					*/}
					< Box className={classes.boxInputField} >
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="inputPhoneNumber">
								{I18n.get('TAB_SIGNIN_DATA_PHONENUMBER_INPUT_LABEL')}
							</InputLabel>
							<Input
								value={props.phone_number}
								onChange={(event) => handlePhoneNumberChange(event.target.value)}
								id="inputPhoneNumber"
								disabled={!editPhoneNumber}
								startAdornment={
									<InputAdornment position="start">
										<Smartphone className={classes.textFieldIcon} />
									</InputAdornment>
								}
								endAdornment={
									!editPhoneNumber && (
										<InputAdornment position="end">
											{(props.phone_number && props.phone_number_verified) && (
												<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL')} size="small" className={classes.chipVerified} />
											)}
											{(props.phone_number && !props.phone_number_verified) && (
												<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL')} size="small" onClick={() => verifyCurrentUserAttribute('phone_number')} className={classes.chipUnverified} />
											)}
										</InputAdornment>
									)}
								className={classes.input}
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
						{!editPhoneNumber && (
							<Button variant="contained" onClick={() => handleAttributeChange('phone_number')} className={classes.buttonChange}>
								{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
							</Button>
						)}
						{editPhoneNumber && (
							<div>
								<Button variant="outlined" onClick={() => handleAttributeSave('phone_number')} className={classes.buttonSave}>
									{I18n.get('TAB_SIGNIN_DATA_SAVE_BUTTON_LABEL')}
								</Button>
								<Button variant="outlined" onClick={() => handleAttributeCancel('phone_number')} className={classes.buttonCancel}>
									{I18n.get('TAB_SIGNIN_DATA_CANCEL_BUTTON_LABEL')}
								</Button>
							</div>
						)}
					</Box >

					{/*
					* Password
					*/}
					< Box className={classes.boxInputField} >
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="inputPassword">
								{I18n.get('TAB_SIGNIN_DATA_PASSWORD_INPUT_LABEL')}
							</InputLabel>
							<Input
								value="******"
								id="inputPassword"
								disabled
								startAdornment={
									<InputAdornment position="start">
										<VpnKey className={classes.textFieldIcon} />
									</InputAdornment>
								}
								className={classes.input}
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
						<Button variant="contained" onClick={() => handleAttributeChange('password')} className={classes.buttonChange}>
							{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
						</Button>
					</Box >

				</CardContent >
				<CardActions className={classes.cardActions}>
					<LogOutButton />
				</CardActions>
			</Card >
		</div>
	)
}

export default connect(mapStateToProps, { setUser, setUserEmail, setUserPhonenumber })(TabSignInData)
