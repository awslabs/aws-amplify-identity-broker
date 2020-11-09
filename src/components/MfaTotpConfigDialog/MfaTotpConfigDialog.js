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
import AppSnackbar from '../../components/Snackbar/Snackbar';

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
										src: "logos/qrImage.png",
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
