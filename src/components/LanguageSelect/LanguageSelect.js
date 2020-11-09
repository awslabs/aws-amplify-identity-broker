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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { setLang } from '../../redux/actions';
import { LanguageTypes } from '../../i18n/i18n';

const languageTypes = LanguageTypes;

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		justifyContent: 'flex-end'
	},
	select: props => ({
		'&:before': {
			borderColor: props.themeColor,
		},
		'&:after': {
			borderColor: props.themeColor,
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid white',
		},
		color: props.themeColor
	}),
	icon: props => ({
		fill: props.themeColor,
	}),
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		textAlign: 'left',
	},
	inputLabel: {
		marginLeft: 0,
	},
	root: {
		flexGrow: 1,
	},
	paper: props => ({
		padding: theme.spacing(1),
		textAlign: 'right',
		boxShadow: '0 0',
		backgroundColor: props.themeBackgroundColor
	})
}));

const mapStateToProps = (state) => {
	I18n.setLanguage(state.app.lang);
	return {
		lang: state.app.lang
	}
}

const LanguageSelect = (props) => {
	const classes = useStyles(props);

	/*
	 * Set new language after changed by user
	 */
	const handleChange = (event) => {
		let selectedLang = 'en';

		if (event.target.value === props.lang) return;

		!event.target.value ? selectedLang = 'en' : selectedLang = event.target.value;

		I18n.setLanguage(selectedLang);
		props.setLang(selectedLang);
	};

	return (
		<div className={classes.root}>
			<Grid container className={classes.gridContainer}>
				<Grid item >
					<Paper className={classes.paper}>
						<FormControl className={classes.formControl}>
							{props.showLabel && (
								<InputLabel className={classes.inputLabel} id="languageSelectInputLabel">
									{I18n.get("LANGUAGESELECT_SELECT_LABEL")}
								</InputLabel>
							)}
							<Select
								labelId="languageSelectLabel"
								id="languageSelect"
								value={props.lang}
								onChange={handleChange}
								className={classes.select}
								inputProps={{
									classes: {
										icon: classes.icon,
									},
								}}
							>
								{languageTypes.map((item, index) =>
									<MenuItem key={index} value={item.code}>{item.lang}</MenuItem>
								)}
							</Select>
						</FormControl>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default connect(mapStateToProps, { setLang })(LanguageSelect)
