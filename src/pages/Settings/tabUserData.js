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
import { LanguageTypes } from '../../i18n/i18n';

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
		textAlign: 'center',
	},
	cardActions: {
		justifyContent: 'center',
	},
	textField: {
		margin: theme.spacing(1),
		minWidth: 300,
	},
	inputLableGender: {
		marginLeft: theme.spacing(2),
	},
	checkBox: {
		marginLeft: theme.spacing(2),
	},
	buttonChange: {
		marginBottom: theme.spacing(1),
	},
	buttonCancel: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		color: Branding.negative,
		'&:hover': {
			color: Branding.negative,
			opacity: Branding.opacityHover,
		},
	},
	buttonSave: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		color: Branding.positive,
		'&:hover': {
			color: Branding.positive,
			opacity: Branding.opacityHover,
		},
	},
}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,

		user: state.user || { id: '', username: '', attributes: [] },
		attributes: state.user.attributes || [],
		given_name: state.user.attributes.given_name || '',
		family_name: state.user.attributes.family_name || '',
		address: state.user.attributes.address || '',
		birthdate: state.user.attributes.birthdate || '',
		gender: state.user.attributes.gender || '0',
		picture: state.user.attributes.picture || '',
		locale: state.user.attributes.locale || 'en',
		/*
		 * Cognito response Custom Attributes 'Boolean' values as String
		 * To be compatible with we use use this also as Strings
		*/
		custom_newsletter: state.user.attributes['custom:newsletter'] || "false",
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
	 * attributes = JSON
	 * Example: {"given_name": "John", "family_name": "Doo"}
	 */
	const updateUserAttributes = (attributes) => {
		Auth.currentAuthenticatedUser()
			.then(CognitoUser => {
				console.log()
				Auth.updateUserAttributes(CognitoUser, attributes)
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
		setEditAttributes(true);

		try {
			/*
			 * If you change the Language change the i18n language too
			 */
			if (attr === "locale" && props.lang !== value)
				props.setLang(value);

			let attributes = props.attributes;
			attributes[attr] = value;
			props.setUser({ ...props.user, attributes: attributes });
		} catch (error) {
			console.log(error);

			setSnackBarOps({
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_USER_DATA_MESSAGE_EROR')
			})
		}
	}

	const handleClickCancel = () => {
		setEditAttributes(false);
		props.reloadUserData();
	};

	const handleClickSave = () => {
		const attributes = props.attributes;

		// Convert Array to JSON String
		const strAttributes = JSON.stringify(attributes);
		// Convert JSON String to JSON
		const jsonAttributes = JSON.parse(strAttributes);

		updateUserAttributes(jsonAttributes);
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
					<form noValidate autoComplete="off">
						<Box>
							<TextField
								id="textfield_given_name"
								value={props.given_name}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_GIVEN_NAME_LABEL')}
								className={classes.textField}
								onChange={(event) => handleAttributeChange('given_name', event.target.value)}
								inputProps={{ style: { left: 0 } }}
							/>
						</Box>
						<Box>
							<TextField
								id="textfield_family_name"
								value={props.family_name}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_FAMILY_NAME_LABEL')}
								className={classes.textField}
								onChange={(event) => handleAttributeChange('family_name', event.target.value)}
								inputProps={{ style: { left: 0 } }}
							/>
						</Box>
						<Box>
							<TextField
								id="textfield_address"
								value={props.address}
								multiline
								rows={3}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
								className={classes.textField}
								onChange={(event) => handleAttributeChange('address', event.target.value)}
								inputProps={{ style: { left: 0 } }}
							/>
						</Box>
						<Box>
							<TextField
								id="textfield_birthday_date"
								value={props.birthdate}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_BIRTHDATE_LABEL')}
								type="date"
								onChange={(event) => handleAttributeChange('birthdate', event.target.value)}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{ style: { left: 0 } }}
							/>
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
									onChange={(event) => handleAttributeChange('gender', event.target.value.toString())}
									className={classes.textField}
								>
									<MenuItem value={0}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_0')}</MenuItem>
									<MenuItem value={1}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_1')}</MenuItem>
									<MenuItem value={2}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_2')}</MenuItem>
									<MenuItem value={3}>{I18n.get('TAB_USER_DATA_SELECT_GENDER_3')}</MenuItem>
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
									onChange={(event) => handleAttributeChange('locale', event.target.value)}
									className={classes.textField}
								>
									{LanguageTypes.map((item) => (
										<MenuItem key={`${item.code}-menuItem`} value={item.code}>{item.lang}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={props.custom_newsletter === "true"}
										onChange={(event) => handleAttributeChange('custom:newsletter', event.target.checked.toString())}
										name="checkbox_custom_newsletter"
										color="primary"
										className={classes.checkBox}
									/>
								}
								label={I18n.get('TAB_USER_DATA_TEXTFIELD_CUSTOM_NEWSLETTER_LABEL')}
							/>
						</FormGroup>
					</form>
				</CardContent >
				<CardActions className={classes.cardActions}>
					{editAttributes && (
						<div>
							<Button
								variant="outlined"
								onClick={() => handleClickSave()}
								className={classes.buttonSave}
							>
								{I18n.get('TAB_USER_DATA_SAVE_BUTTON_LABEL')}
							</Button>
							<Button
								variant="outlined"
								onClick={() => handleClickCancel()}
								className={classes.buttonCancel}
							>
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
