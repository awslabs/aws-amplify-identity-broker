/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import { I18n } from '@aws-amplify/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import languages from './languages.json';
import { strings } from './languageStrings';
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		textAlign: 'left'
	},
	inputLabel: {
		marginLeft: 0,
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'right',
		boxShadow: '0 0 black'
	}
}));

export default function LanguageSelect(props) {
	const classes = useStyles();
	const [lang, setLang] = React.useState(props.lang);

	const handleChange = (event) => {
		let _lang = 'en';

		if (event.target.value === lang) return;

		!event.target.value ? _lang = 'en' : _lang = event.target.value;

		setLang(_lang);
		I18n.setLanguage(_lang);
		props.newLang(_lang);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<FormControl className={classes.formControl}>
							<InputLabel className={classes.inputLabel} id="languageSelectInputLabel">{I18n.get("SELECT_LABEL")}</InputLabel>
							<Select
								labelId="languageSelectLabel"
								id="languageSelect"
								value={lang}
								onChange={handleChange}
							>
								{languages.types.map((item, index) =>
									<MenuItem key={index} value={item.code}>{I18n.get(item.code.toLocaleUpperCase())}</MenuItem>
								)}
							</Select>
						</FormControl>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
