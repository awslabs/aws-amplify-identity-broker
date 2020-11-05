import React from 'react';
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { setVerifyDialog } from '../../redux/actions';
import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';

const strings = {
	en: {
		VERIFY_DIALOG_TITLE: "Verify",
		VERIFY_DIALOG_DESCRIPTION: "Please enter the code:",
		VERIFY_DIALOG_INPUT_LABEL: "Code",
		VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verify",
		VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Close",
		VERIFY_DIALOG_MESSAGE_SUCCESS: "The verification was successful",
		VERIFY_DIALOG_MESSAGE_EROR: "An error has occurred",
	},
	fr: {
		VERIFY_DIALOG_TITLE: "Verify",
		VERIFY_DIALOG_DESCRIPTION: "Please enter the code:",
		VERIFY_DIALOG_INPUT_LABEL: "Code",
		VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verify",
		VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Close",
		VERIFY_DIALOG_MESSAGE_SUCCESS: "La vérification a réussi",
		VERIFY_DIALOG_MESSAGE_EROR: "Une erreur est survenue",
	},
	de: {
		VERIFY_DIALOG_TITLE: "Verifizieren",
		VERIFY_DIALOG_DESCRIPTION: "Bitte geben Sie den Code:",
		VERIFY_DIALOG_INPUT_LABEL: "Code",
		VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verifizieren",
		VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Schließen",
		VERIFY_DIALOG_MESSAGE_SUCCESS: "Die Verifizierung war erfolgreich",
		VERIFY_DIALOG_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
	},
	nl: {
		VERIFY_DIALOG_TITLE: "Verify",
		VERIFY_DIALOG_DESCRIPTION: "Please enter the code:",
		VERIFY_DIALOG_INPUT_LABEL: "Code",
		VERIFY_DIALOG_VERIFY_BUTTON_LABEL: "Verify",
		VERIFY_DIALOG_CLOSE_BUTTON_LABEL: "Close",
		VERIFY_DIALOG_MESSAGE_SUCCESS: "De verificatie is gelukt",
		VERIFY_DIALOG_MESSAGE_EROR: "Er is een fout opgetreden",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles(() => ({
	dialogTitle: {
		minWidth: '400px'
	},
	dialogActions: {
		paddingRight: '22px'
	},
	buttonVerify: {
		color: Branding.positive
	},
	buttonClose: {
		color: Branding.negative
	}
}));

const mapStateToProps = (state) => {
	return {
		verifyDialog: state.app.verifyDialog
	}
}

const VerifyAttribute = (props) => {
	const classes = useStyles();
	const [code, setCode] = React.useState();
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	const verifyCurrentUserAttributeSubmit = (attr, code) => {
		if (!attr || !code) {
			setSnackBarOps({
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('VERIFY_DIALOG_MESSAGE_EROR')
			})
			return;
		}

		// To verify attribute with the code
		Auth.verifyCurrentUserAttributeSubmit(attr, code)
			.then(() => {
				setSnackBarOps({
					type: 'success',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('VERIFY_DIALOG_MESSAGE_SUCCESS')
				});

				handleClose();
			}).catch(err => {
				console.log(err);

				setSnackBarOps({
					type: 'error',
					open: true,
					vertical: 'top',
					horizontal: 'center',
					autoHide: 3000,
					message: I18n.get('VERIFY_DIALOG_MESSAGE_EROR')
				})
			});
	}

	const handleClickVerify = () => {
		verifyCurrentUserAttributeSubmit(props.verifyDialog.type, code);
	};

	const handleClose = () => {
		props.reloadUserData();

		props.setVerifyDialog({ type: '', open: false })
	};

	const handleChange = (value) => {
		setCode(value || '')
	}

	return (
		<div>
			<AppSnackbar ops={snackBarOps} />
			<Dialog
				open={props.verifyDialog.open}
				onClose={handleClose}
				disableBackdropClick
				aria-labelledby="verify-dialog"
			>
				<DialogTitle id="verify-dialog-title" className={classes.dialogTitle}>
					{I18n.get('VERIFY_DIALOG_TITLE')}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{I18n.get('VERIFY_DIALOG_DESCRIPTION')}
					</DialogContentText>
					<TextField
						value={code}
						onChange={(event) => handleChange(event.target.value)}
						margin="dense"
						id="code"
						label={I18n.get('VERIFY_DIALOG_INPUT_LABEL')}
						fullWidth
						className={classes.TextField}
					/>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button onClick={handleClickVerify} variant="outlined" className={classes.buttonVerify}>
						{I18n.get('VERIFY_DIALOG_VERIFY_BUTTON_LABEL')}
					</Button>
					<Button onClick={handleClose} variant="outlined" className={classes.buttonClose}>
						{I18n.get('VERIFY_DIALOG_CLOSE_BUTTON_LABEL')}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default connect(mapStateToProps, { setVerifyDialog })(VerifyAttribute);
