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
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import { Branding } from '../../branding';
import { setUser, setLang } from '../../redux/actions';
import AppSnackbar from '../../components/Snackbar/Snackbar';

/*
 * Localization
 */
const strings = {
	en: {
		TAB_USER_DATA_LABEL: "USER DATA",
		TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Given Name",
		TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Family Name",
		TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Address",
		TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Birthdate",
		TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Gender",
		TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Newsletter",
		TAB_USER_DATA_SELECT_GENDER_0: "<Please Select>",
		TAB_USER_DATA_SELECT_GENDER_1: "Male",
		TAB_USER_DATA_SELECT_GENDER_2: "Female",
		TAB_USER_DATA_SELECT_GENDER_3: "X-gender",
		TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Preferred Language",
		TAB_USER_DATA_SELECT_LANGUAGE_DE: "Deutsch",
		TAB_USER_DATA_SELECT_LANGUAGE_EN: "English",
		TAB_USER_DATA_SELECT_LANGUAGE_FR: "French",
		TAB_USER_DATA_SELECT_LANGUAGE_NL: "Nederlands",
		TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Change",
		TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Cancel",
		TAB_USER_DATA_SAVE_BUTTON_LABEL: "Save",
		TAB_USER_DATA_MESSAGE_EROR: "An error has occurred",
		TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "The update was successful",
	},
	fr: {
		TAB_USER_DATA_LABEL: "DONNÉES D'UTILISATEUR",
		TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Prénom",
		TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Nom de famille",
		TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adresse",
		TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Date de naissance",
		TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Le genre",
		TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Bulletin",
		TAB_USER_DATA_SELECT_GENDER_0: "<Veuillez sélectionner>",
		TAB_USER_DATA_SELECT_GENDER_1: "Mâle",
		TAB_USER_DATA_SELECT_GENDER_2: "Femelle",
		TAB_USER_DATA_SELECT_GENDER_3: "X-genre",
		TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Langue préférée",
		TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Changer",
		TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Avorter",
		TAB_USER_DATA_SAVE_BUTTON_LABEL: "Sauver",
		TAB_USER_DATA_MESSAGE_EROR: "Une erreur est survenue",
		TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "La mise à jour a réussi",
	},
	de: {
		TAB_USER_DATA_LABEL: "BENUTZERINFORMATIONEN",
		TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Vorname",
		TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Nachname",
		TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adresse",
		TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Geburtsdatum",
		TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Geschlecht",
		TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Newsletter",
		TAB_USER_DATA_SELECT_GENDER_0: "<Bitte auswählen>",
		TAB_USER_DATA_SELECT_GENDER_1: "Männlich",
		TAB_USER_DATA_SELECT_GENDER_2: "Weiblich",
		TAB_USER_DATA_SELECT_GENDER_3: "X-gender",
		TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Bevorzugte Sprache",
		TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Ändern",
		TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Abbrechen",
		TAB_USER_DATA_SAVE_BUTTON_LABEL: "Speichern",
		TAB_USER_DATA_MESSAGE_EROR: "Ist ein Fehler aufgetreten",
		TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "Das Update war erfolgreich",
	},
	nl: {
		TAB_USER_DATA_LABEL: "GEBRUKERSGEGEVENS",
		TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL: "Voornaam",
		TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL: "Achternaam",
		TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL: "Adres",
		TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL: "Geboortedatum",
		TAB_USER_DATA_TEXTFIELD_GENDER_LABEL: "Geslacht",
		TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL: "Nieuwsbrief",
		TAB_USER_DATA_SELECT_GENDER_0: "<Selecteer alstublieft>",
		TAB_USER_DATA_SELECT_GENDER_1: "Mannetje",
		TAB_USER_DATA_SELECT_GENDER_2: "Vrouw",
		TAB_USER_DATA_SELECT_GENDER_3: "X-geslacht",
		TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL: "Voorkeurstaal",
		TAB_USER_DATA_CHANGE_BUTTON_LABEL: "Veranderen",
		TAB_USER_DATA_CANCEL_BUTTON_LABEL: "Afbreken",
		TAB_USER_DATA_SAVE_BUTTON_LABEL: "Opslaan",
		TAB_USER_DATA_MESSAGE_EROR: "Er is een fout opgetreden",
		TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS: "De update is gelukt",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {

	},
	header: {
		backgroundColor: Branding.primary,
		color: Branding.white,
		height: '40px',
		textAlign: 'center',
	},
	title: {
		fontSize: 14,
	},
	cardContent: {
		textAlign: 'center',
	},
	cardActions: {
		justifyContent: 'center',
	},
	textField: {
		margin: theme.spacing(2),
		minWidth: '300px'
	},
	inputLableGender: {
		marginLeft: theme.spacing(2),
	},
	checkBox: {
		marginLeft: theme.spacing(2),
	},
	buttonChange: {
		marginBottom: '8px',
		background: Branding.secondary,
		color: Branding.white,
	},
	buttonCancel: {
		marginTop: '8px',
		marginLeft: '8px',
		color: Branding.negative,
	},
	buttonSave: {
		marginTop: '8px',
		marginLeft: '8px',
		color: Branding.positive,
	},
}));

const mapStateToProps = (state) => {
	return {
		...state,
		user: state.user.attributes || [],
		given_name: state.user.attributes.given_name || '',
		family_name: state.user.attributes.family_name || '',
		address: state.user.attributes.address || '',
		birthdate: state.user.attributes.birthdate || '',
		gender: state.user.attributes.gender || '0',
		picture: state.user.attributes.picture || '',
		custom_newsletter: state.user.attributes.custom_newsletter || false,
		locale: state.user.attributes.locale || 'en',
	}
}

const TabUserData = (props) => {
	const classes = useStyles();
	const [editAttributes, setEditAttributes] = React.useState(false);
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	/*
	 * attributes = String
	 * converted to JSON
	 * Example: {"given_name": "John", "family_name": "Doo"}
	 */
	const updateUserAttributes = (attributes) => {
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
							message: I18n.get('TAB_USER_DATA_MESSAGE_UPDATE_ATTRIBUTE_SUCCESS')
						});

						setEditAttributes(false);
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
							message: I18n.get('TAB_USER_DATA_MESSAGE_EROR')
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
					message: I18n.get('TAB_USER_DATA_MESSAGE_EROR')
				})
			})
	};

	const handleAttributeChange = (attr, value) => {
		switch (attr) {
			case 'given_name':
				props.setUser({ ...props.user, given_name: value })
				break;
			case 'family_name':
				props.setUser({ ...props.user, family_name: value })
				break;
			case 'address':
				props.setUser({ ...props.user, address: value })
				break;
			case 'birthdate':
				props.setUser({ ...props.user, birthdate: value })
				break;
			case 'gender':
				props.setUser({ ...props.user, gender: value })
				break;
			case 'locale':
				props.setUser({ ...props.user, locale: value })
				props.setLang(value);
				break;
			case 'custom_newsletter':
				console.log(value);
				props.setUser({ ...props.user, custom_newsletter: !props.custom_newsletter })
				break;
			default:
				break;
		}
	}

	const handleClickChange = () => {
		setEditAttributes(true);
	};

	const handleClickCancel = () => {
		setEditAttributes(false);
		props.reloadUserData();
	};

	const handleClickSave = () => {
		const jsonEscape = (str) => {
			return str
				.replace(", }", "}")
				.replace(/[\\]/g, '\\\\')
				.replace(/[\b]/g, '\\b')
				.replace(/[\f]/g, '\\f')
				.replace(/[\n]/g, '\\n')
				.replace(/[\r]/g, '\\r')
				.replace(/[\t]/g, '\\t');
		};

		let attrList = "{";

		if (props.given_name)
			attrList += `"given_name": "${props.given_name}",`;

		if (props.family_name)
			attrList += `"family_name": "${props.family_name}", `;

		if (props.address)
			attrList += `"address": "${props.address}", `;

		if (props.birthdate)
			attrList += `"birthdate": "${props.birthdate}", `;

		//If no gender selected send O to update the current value
		if (props.gender) {
			attrList += `"gender": "${props.gender}", `;
		} else {
			attrList += `"gender": "0", `;
		}

		if (props.locale) {
			attrList += `"locale": "${props.locale}", `;
		}

		if (props.custom_newsletter)
			attrList += `"custom:newsletter": "true", `;
		else
			attrList += `"custom:newsletter": "false", `;

		attrList += "}"
		attrList = jsonEscape(attrList);

		updateUserAttributes(attrList);
	};



	return (
		<div className={classes.root}>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}

			<Card className={classes.root} variant="outlined">
				<CardHeader
					className={classes.header}
					title={I18n.get('TAB_USER_DATA_LABEL')}
				/>
				<CardContent className={classes.cardContent}>
					<Box>
						<TextField
							id="textfield_given_name"
							value={props.given_name}
							disabled={!editAttributes}
							label={I18n.get('TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL')}
							className={classes.textField}
							onChange={(event) => handleAttributeChange('given_name', event.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="textfield_family_name"
							value={props.family_name}
							disabled={!editAttributes}
							label={I18n.get('TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL')}
							className={classes.textField}
							onChange={(event) => handleAttributeChange('family_name', event.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="textfield_address"
							value={props.address}
							multiline
							rows={3}
							disabled={!editAttributes}
							label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
							className={classes.textField}
							onChange={(event) => handleAttributeChange('address', event.target.value)}
						/>
					</Box>
					<Box>
						<form className={classes.container} noValidate>
							<TextField
								id="textfield_birthday_date"
								value={props.birthdate}
								disabled={!editAttributes}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL')}
								type="date"
								onChange={(event) => handleAttributeChange('birthdate', event.target.value)}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</form>
					</Box>
					<Box>
						<FormControl className={classes.formControl}>
							<InputLabel id="textfield_gender_label" className={classes.inputLableGender}>
								{I18n.get('TAB_USER_DATA_TEXTFIELD_GENDER_LABEL')}
							</InputLabel>
							<Select
								labelId="textfield_gender_select-label"
								id="textfield_gender_select"
								value={props.gender}
								disabled={!editAttributes}
								onChange={(event) => handleAttributeChange('gender', event.target.value)}
								className={classes.textField}
							>
								<MenuItem value={0}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_0')}</MenuItem>
								<MenuItem value={1}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_1')}</MenuItem>
								<MenuItem value={2}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_2')}</MenuItem>
								<MenuItem value={2}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_3')}</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box>
						<FormControl className={classes.formControl}>
							<InputLabel id="textfield_language_label" className={classes.inputLableGender}>
								{I18n.get('TAB_USER_DATA_TEXTFIELD_LANGUAGE_LABEL')}
							</InputLabel>
							<Select
								labelId="textfield_language_select-label"
								id="textfield_language_select"
								value={props.locale}
								disabled={!editAttributes}
								onChange={(event) => handleAttributeChange('locale', event.target.value)}
								className={classes.textField}
							>
								<MenuItem value={'de'}>{"Deutsch"}</MenuItem>
								<MenuItem value={'en'}>{"English"}</MenuItem>
								<MenuItem value={'fr'}>{"French"}</MenuItem>
								<MenuItem value={'nl'}>{"Nederlands"}</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<FormGroup row>
						<FormControlLabel
							control={
								<Checkbox
									checked={props.custom_newsletter}
									onChange={(event) => handleAttributeChange('custom_newsletter', event.target.checked)}
									name="checkbox_custom_newsletter"
									color="primary"
									className={classes.checkBox}
								/>
							}
							label={I18n.get('TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL')}
							disabled={!editAttributes}
						/>
					</FormGroup>
				</CardContent >
				<CardActions className={classes.cardActions}>
					{!editAttributes && (
						<Button variant="contained" onClick={() => handleClickChange()} className={classes.buttonChange}>
							{I18n.get('TAB_USER_DATA_CHANGE_BUTTON_LABEL')}
						</Button>
					)}
					{editAttributes && (
						<div>
							<Button variant="outlined" onClick={() => handleClickSave()} className={classes.buttonSave}>
								{I18n.get('TAB_USER_DATA_SAVE_BUTTON_LABEL')}
							</Button>
							<Button variant="outlined" onClick={() => handleClickCancel()} className={classes.buttonCancel}>
								{I18n.get('TAB_USER_DATA_CANCEL_BUTTON_LABEL')}
							</Button>
						</div>
					)}
				</CardActions>
			</Card >
		</div>
	)
}

export default connect(mapStateToProps, { setUser, setLang })(TabUserData)
