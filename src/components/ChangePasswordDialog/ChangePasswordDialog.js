import React from 'react';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { VpnKey, Visibility, VisibilityOff } from '@material-ui/icons';

import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';
import { Box } from '@material-ui/core';

const strings = {
	en: {
		CHANGE_PASSWORD_TITLE: "Change Password",
		CHANGE_PASSWORD_DESCRIPTION: "Please enter your current and new password",
		CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Old Password",
		CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "New Password",
		CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Save",
		CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Close",
		CHANGE_PASSWORD_MESSAGE_SUCCESS: "The password was successful set",
		CHANGE_PASSWORD_MESSAGE_EROR: "An error has occurred",
	},
	fr: {
		CHANGE_PASSWORD_TITLE: "Changer le mot de passe",
		CHANGE_PASSWORD_DESCRIPTION: "Veuillez saisir votre nouveau mot de passe actuel",
		CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Mot de passe actuel",
		CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "Nouveau mot de passe",
		CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Sauvegarder",
		CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Close",
		CHANGE_PASSWORD_MESSAGE_SUCCESS: "Veuillez saisir votre nouveau mot de passe actuel",
		CHANGE_PASSWORD_MESSAGE_EROR: "Une erreur est survenue",
	},
	de: {
		CHANGE_PASSWORD_TITLE: "Passwort ändern",
		CHANGE_PASSWORD_DESCRIPTION: "Bitte geben Sie ihr aktuelles und neues Passwort ein",
		CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Aktuelles Password",
		CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "Neues Password",
		CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Speichern",
		CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Schließen",
		CHANGE_PASSWORD_MESSAGE_SUCCESS: "Das Passwort wurde erfolgreich gesetzt",
		CHANGE_PASSWORD_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	},
	nl: {
		CHANGE_PASSWORD_TITLE: "Verander wachtwoord",
		CHANGE_PASSWORD_DESCRIPTION: "Voer uw huidige en nieuwe wachtwoord in",
		CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL: "Huidig ​​wachtwoord",
		CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL: "nieuw paswoord",
		CHANGE_PASSWORD_SAVE_BUTTON_LABEL: "Opslaan",
		CHANGE_PASSWORD_CLOSE_BUTTON_LABEL: "Dichtbij",
		CHANGE_PASSWORD_MESSAGE_SUCCESS: "Voer uw huidige en nieuwe wachtwoord in",
		CHANGE_PASSWORD_MESSAGE_EROR: "Er is een fout opgetreden",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles(() => ({
	dialogActions: {
		paddingRight: '22px'
	},
	box: {
		textAlign: 'center',
		marginBottom: '20px',
	},
	input: {
		minWidth: '300px',
	},
	buttonSave: {
		color: Branding.positive
	},
	buttonClose: {
		color: Branding.negative
	}
}));

const ChangePasswordDialog = (props) => {
	const classes = useStyles();
	const [oldPassword, setOldPassword] = React.useState({
		password: '',
		showPassword: false
	});
	const [newPassword, setNewPassword] = React.useState({
		password: '',
		showPassword: false
	});
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	const changePassword = (oldPassword, newPassword) => {
		console.log(oldPassword + ' - ' + newPassword)
		if (!oldPassword || !newPassword) {
			setSnackBarOps({
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('CHANGE_PASSWORD_MESSAGE_EROR')
			})
			return;
		}

		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				Auth.changePassword(CognitoUser, oldPassword, newPassword)
					.then(() => {
						setSnackBarOps({
							type: 'success',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('CHANGE_PASSWORD_MESSAGE_SUCCESS')
						});

						handleClose();
					})
					.catch((err) => {
						console.log(err);

						setSnackBarOps({
							type: 'error',
							open: true,
							vertical: 'top',
							horizontal: 'center',
							autoHide: 3000,
							message: I18n.get('CHANGE_PASSWORD_MESSAGE_EROR')
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
					message: I18n.get('CHANGE_PASSWORD_MESSAGE_EROR')
				})
			})
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChangeOldPassword = (value) => {
		setOldPassword({ ...oldPassword, password: value })
	};

	const handleChangeNewPassword = (value) => {
		setNewPassword({ ...newPassword, password: value })
	};

	const handleClickSave = () => {
		changePassword(oldPassword.password, newPassword.password)
	};

	const handleClose = () => {
		setOldPassword({ ...oldPassword, password: '' });
		setNewPassword({ ...newPassword, password: '' });
		props.close();
	};

	return (
		<div>
			<AppSnackbar ops={snackBarOps} />
			<Dialog
				open={props.open}
				onClose={handleClose}
				disableBackdropClick
				aria-labelledby="change-password-dialog"
			>
				<DialogTitle id="change-password-dialog-title">
					{I18n.get('CHANGE_PASSWORD_TITLE')}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{I18n.get('CHANGE_PASSWORD_DESCRIPTION')}
					</DialogContentText>
					<Box className={classes.box}>
						<FormControl>
							<InputLabel htmlFor="inputOldPassword">
								{I18n.get('CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL')}
							</InputLabel>
							<Input
								value={oldPassword.password}
								type={oldPassword.showPassword ? 'text' : 'password'}
								onChange={(event) => handleChangeOldPassword(event.target.value)}
								id="inputOldPassword"
								startAdornment={
									<InputAdornment position="start">
										<VpnKey className={classes.textFieldIcon} />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setOldPassword({ ...oldPassword, showPassword: !oldPassword.showPassword })}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{oldPassword.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								className={classes.input}
							/>
						</FormControl>
					</Box>
					<Box className={classes.box}>
						<FormControl>
							<InputLabel htmlFor="inputNewPassword">
								{I18n.get('CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL')}
							</InputLabel>
							<Input
								value={newPassword.password}
								type={newPassword.showPassword ? 'text' : 'password'}
								onChange={(event) => handleChangeNewPassword(event.target.value)}
								id="inputNewPassword"
								startAdornment={
									<InputAdornment position="start">
										<VpnKey className={classes.textFieldIcon} />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setNewPassword({ ...newPassword, showPassword: !newPassword.showPassword })}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{newPassword.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								className={classes.input}
							/>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button onClick={handleClickSave} variant="outlined" className={classes.buttonSave}>
						{I18n.get('CHANGE_PASSWORD_SAVE_BUTTON_LABEL')}
					</Button>
					<Button onClick={handleClose} variant="outlined" className={classes.buttonClose}>
						{I18n.get('CHANGE_PASSWORD_CLOSE_BUTTON_LABEL')}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ChangePasswordDialog;
