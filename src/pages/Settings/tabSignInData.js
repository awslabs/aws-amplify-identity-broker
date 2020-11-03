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

import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
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
		TAB_SIGNIN_DATA_ACCOUNT_DELETE_BUTTON_LABEL: "Delete Account",
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
		TAB_SIGNIN_DATA_ACCOUNT_DELETE_BUTTON_LABEL: "Supprimer le compte",
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
		TAB_SIGNIN_DATA_ACCOUNT_DELETE_BUTTON_LABEL: "Konto löschen",
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
		TAB_SIGNIN_DATA_ACCOUNT_DELETE_BUTTON_LABEL: "Account verwijderen",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {

	},
	header: {
		backgroundColor: Branding.secondary,
		color: 'white',
		height: '40px',
		textAlign: 'center',
	},
	title: {
		fontSize: 14,
	},
	cardContent: {
		textAlign: 'left',
	},
	cardActions: {
		justifyContent: 'center',
	},
	buttonAccountDelete: {
		color: Branding.negative
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
		minWidth: '300px',
	},
	chipVerified: {
		marginTop: '-50px',
		backgroundColor: Branding.positive,
		color: 'white',
	},
	chipUnverified: {
		marginTop: '-50px',
		backgroundColor: Branding.negative,
		color: 'white',
	},
	buttonChange: {
		marginTop: '8px',
		marginLeft: '8px',
		background: Branding.secondary,
		color: 'white',
	}
}));

const mapStateToProps = (state) => {
	return {
		username: state.user.attributes.username || '',
		email: state.user.attributes.email || '',
		emailVerified: state.user.attributes.email_verified || false,
		phoneNumber: state.user.attributes.phone_number || '',
		phoneNumberVerified: state.user.attributes.phone_number_verified,
	}
}

const TabSignInData = (props) => {
	const classes = useStyles();
	const [values] = React.useState({
		password: '********',
		showPassword: false,
	});

	const deleteAccount = () => {
		alert('deleteAccount')
	};

	return (
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
							value={values.username}
							id="inputUsername"
							disabled
							startAdornment={
								<InputAdornment position="start">
									<AccountBox className={classes.textFieldIcon} />
								</InputAdornment>
							}
							className={classes.input}
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
							disabled
							startAdornment={
								<InputAdornment position="start">
									<MailOutline className={classes.textFieldIcon} />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position="end">
									{(props.email && props.emailVerified) && (
										<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL')} size="small" className={classes.chipVerified} />
									)}
									{(props.email && !props.emailVerified) && (
										<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL')} size="small" className={classes.chipUnverified} />
									)}
								</InputAdornment>
							}
							className={classes.input}
						/>
					</FormControl>
					<Button variant="contained" onClick={deleteAccount} className={classes.buttonChange}>
						{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
					</Button>
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
							value={props.phoneNumber}
							id="inputPhoneNumber"
							disabled
							startAdornment={
								<InputAdornment position="start">
									<Smartphone className={classes.textFieldIcon} />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position="end">
									{(props.phoneNumber && props.phoneNumberVerified) && (
										<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL')} size="small" className={classes.chipVerified} />
									)}
									{(props.phoneNumber && !props.phoneNumberVerified) && (
										<Chip label={I18n.get('TAB_SIGNIN_DATA_CHIP_UNVERIFIED_LABEL')} size="small" onClick={deleteAccount} className={classes.chipUnverified} />
									)}
								</InputAdornment>
							}
							className={classes.input}
						/>
					</FormControl>
					<Button variant="contained" onClick={deleteAccount} className={classes.buttonChange}>
						{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
					</Button>
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
							type={'password'}
							value={'********'}
							id="inputPassword"
							disabled
							startAdornment={
								<InputAdornment position="start">
									<VpnKey className={classes.textFieldIcon} />
								</InputAdornment>
							}
							className={classes.input}
						/>
					</FormControl>
					<Button variant="contained" onClick={deleteAccount} className={classes.buttonChange}>
						{I18n.get('TAB_SIGNIN_DATA_CHANGE_BUTTON_LABEL')}
					</Button>
				</Box >

			</CardContent >
			<CardActions className={classes.cardActions}>
				<LogOutButton />
			</CardActions>
			<CardActions className={classes.cardActions}>
				<Button
					variant="outlined"
					onClick={deleteAccount}
					className={classes.buttonAccountDelete}
				>
					{I18n.get('TAB_SIGNIN_DATA_ACCOUNT_DELETE_BUTTON_LABEL')}
				</Button>
			</CardActions>
		</Card >
	)
}

export default connect(mapStateToProps, { setUser, setUserEmail, setUserPhonenumber })(TabSignInData)
