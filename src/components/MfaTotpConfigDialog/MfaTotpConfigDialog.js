/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
*/

import React from 'react';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import QRCode from 'qrcode.react';

import { Branding } from '../../branding';
import logo from '../../assets/Logos/logo.png';
import AppSnackbar from '../../components/Snackbar/Snackbar';

/*
 * Localization
 */
const strings = {
	en: {
		MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP Configuration",
		MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Multi-Factor Authentication (MFA) enhances security by adding another authentication method rather than relying solely on username and password.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP Request Token",
		MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "You can use time-based one-time passwords (TOTP) as second factors when your users log in.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "Request TOTP Token",
		MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP Device Setup",
		MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scan the QR-Code with your Device",
		MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP Device Activate",
		MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activate your Device by entering the One-Time-Password and click 'Activate'",
		MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "One-Time-Password",
		MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activate",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Next",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Back",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Close",
		MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "An error has occurred",
	},
	fr: {
		MFA_TOTP_CONFIG_DIALOG_TITLE: "Configuration TOTP",
		MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "L'authentification multifacteur (MFA) améliore la sécurité en ajoutant une autre méthode d'authentification plutôt que de se fier uniquement au nom d'utilisateur et au mot de passe.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "Jeton de demande TOTP",
		MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "Vous pouvez utiliser des mots de passe à usage unique basés sur le temps (TOTP) comme deuxième facteur lorsque vos utilisateurs se connectent.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "Demander un jeton TOTP",
		MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "Configuration de l'appareil TOTP",
		MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scannez le QR-Code avec votre appareil",
		MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "Activation du périphérique TOTP",
		MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activez votre appareil en entrant le mot de passe à usage unique et cliquez sur 'Activer'",
		MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "Passe à usage unique",
		MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activer",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Suivant",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Retour",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Proche",
		MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Une erreur est survenue",
	},
	de: {
		MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP Konfigurieren",
		MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Die Multi-Faktor-Authentifizierung (MFA) erhöht die Sicherheit, indem eine weitere Authentifizierungsmethode hinzufügt wird und diese sich nicht nur auf Benutzername und Passwort stützt.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP Token abrufen",
		MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "Sie können zeitbasierte Einmal-Passwörter (TOTP) als zweite Faktoren bei der Anmeldung Ihrer Benutzer verwenden.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "TOTP Token abrufen",
		MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP Gerät einrichten",
		MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scannen Sie den QR-Code mit Ihrem Gerät",
		MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP Gerät aktivieren",
		MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Aktivieren Sie Ihr Gerät in dem Sie das Einmal-Password eingeben und 'Aktivieren' klicken",
		MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "Einmal-Password",
		MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Aktivieren",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Nächster",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Zurück",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Schließen",
		MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Es ist ein Fehler aufgetreten",
	},
	nl: {
		MFA_TOTP_CONFIG_DIALOG_TITLE: "TOTP-configuratie",
		MFA_TOTP_CONFIG_DIALOG_DESCRIPTION: "Multi-Factor Authentication (MFA) verbetert de beveiliging door een andere authenticatiemethode toe te voegen in plaats van alleen te vertrouwen op gebruikersnaam en wachtwoord.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL: "TOTP-aanvraagtoken",
		MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION: "U kunt op tijd gebaseerde eenmalige wachtwoorden (TOTP) gebruiken als tweede factor wanneer uw gebruikers inloggen.",
		MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL: "TOTP-token aanvragen",
		MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL: "TOTP-apparaat instellen",
		MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION: "Scan de QR-code met uw apparaat",
		MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL: "TOTP-apparaat activeren",
		MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION: "Activeer uw apparaat door het On-Time-wachtwoord in te voeren en klik op 'Activeren'",
		MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL: "On-Time-wachtwoord",
		MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL: "Activeren",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL: "Naast",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL: "Terug",
		MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL: "Dichtbij",
		MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR: "Er is een fout opgetreden",
	},
}
const useStyles = makeStyles((theme) => ({
	root: {

	},
	dialogActions: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
	textField: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	buttonSave: {
		color: Branding.negative,
	},
}));
I18n.putVocabularies(strings);

function getSteps() {
	return [
		I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP1_LABEL'),
		I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP2_LABEL'),
		I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP3_LABEL')
	];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP1_DESCRIPTION');
		case 1:
			return I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP2_DESCRIPTION');
		case 2:
			return I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP3_DESCRIPTION');
		default:
			return 'Unknown step';
	}
};

function MfaTotpConfigDialog(props) {
	const classes = useStyles();
	const [qrUrl, setQrUrl] = React.useState('');
	const [verifyCode, setVerifyCode] = React.useState('');
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	const setupTOTP = () => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.setupTOTP(CognitoUser)
					.then((code) => {
						setQrUrl(`otpauth://totp/AWSCognito:${CognitoUser.username}?secret=${code}&issuer=${Branding.appName}`);
						setActiveStep(1);
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR')
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
					message: I18n.get('MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR')
				})
			})
	};


	const verifyTotpToken = (challengeAnswer) => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.verifyTotpToken(CognitoUser, challengeAnswer)
					.then((data) => {
						if (data && data.Status && data.Status === "SUCCESS") {
							handleClose(true);
							setQrUrl('');
						}
					})
					.catch(err => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR')
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
					message: I18n.get('MFA_TOTP_CONFIG_DIALOG_MESSAGE_EROR')
				})
			})
	};

	const handleClickRequestToken = () => {
		setupTOTP();
	};

	const handleChangeVerifyCodeInput = (value) => {
		setVerifyCode(value);
	};

	const handleClickActivate = () => {
		verifyTotpToken(verifyCode);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleClose = (successful = false) => {
		props.close(successful);
	};

	return (
		<div className={classes.root}>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}
			<Dialog
				open={props.open}
				onClose={handleClose}
				disableBackdropClick
				aria-labelledby="mfa-totp-configure-dialog"
			>
				<DialogTitle id="mfa-totp-configure-dialog-title" className={classes.dialogTitle}>
					{I18n.get('MFA_TOTP_CONFIG_DIALOG_TITLE')}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{I18n.get('MFA_TOTP_CONFIG_DIALOG_DESCRIPTION')}
					</DialogContentText>
					<Stepper activeStep={activeStep} orientation="vertical">
						<Step key="step0">
							<StepLabel>
								{steps[0]}
							</StepLabel>
							<StepContent>
								<Typography>
									{getStepContent(0)}
								</Typography>
								<div className={classes.actionsContainer}>
									<Button
										variant="contained"
										color="secondary"
										onClick={handleClickRequestToken}

										className={classes.button}
									>
										{I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP1_BUTTON_TOKEN_REQUEST_LABEL')}
									</Button>
								</div>
							</ StepContent>
						</Step>

						<Step key="step1">
							<StepLabel>
								{steps[1]}
							</StepLabel>
							<StepContent>
								<Typography>
									{getStepContent(1)}
								</Typography>

								<QRCode
									//https://www.npmjs.com/package/qrcode.react
									value={qrUrl || 'error'}
									size={256}
									level={"M"}
									includeMargin={true}
									renderAs={"svg"}
									imageSettings={{
										src: logo,
										x: null,
										y: null,
										height: 48,
										width: 64,
										excavate: true,
									}}
								/>

								<div className={classes.actionsContainer}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{I18n.get('MFA_TOTP_CONFIG_DIALOG_BUTTON_NEXT_LABEL')}
									</Button>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										{I18n.get('MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL')}
									</Button>
								</div>
							</ StepContent>
						</Step>

						<Step key="step2">
							<StepLabel>
								{steps[2]}
							</StepLabel>
							<StepContent>
								<Typography>
									{getStepContent(2)}
								</Typography>
								<Box>
									<TextField
										id="textfield_mfa_totp_token"
										value={verifyCode}
										label={I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP3_TEXTFIELD_VERIFY_CODE_LABEL')}
										className={classes.textField}
										onChange={(event) => handleChangeVerifyCodeInput(event.target.value)}
										inputProps={{ style: { left: 0 } }}
										autoFocus
									/>
								</Box>

								<div className={classes.actionsContainer}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleClickActivate}
										className={classes.button}
									>
										{I18n.get('MFA_TOTP_CONFIG_DIALOG_STEP3_BUTTON_ACTIVATE_TOTP_LABEL')}
									</Button>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										{I18n.get('MFA_TOTP_CONFIG_DIALOG_BUTTON_BACK_LABEL')}
									</Button>
								</div>
							</ StepContent>
						</Step>
					</Stepper>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button
						variant="outlined"
						onClick={() => handleClose(false)}
						className={classes.buttonClose}>
						{I18n.get('MFA_TOTP_CONFIG_DIALOG_BUTTON_CLOSE_LABEL')}
					</Button>
				</DialogActions>
			</Dialog>
		</div >
	);
}

export default (MfaTotpConfigDialog);
