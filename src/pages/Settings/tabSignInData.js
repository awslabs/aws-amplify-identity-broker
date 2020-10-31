import React from 'react';

import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

/*
 * Localization
 */
const strings = {
	en: {
		TAB_SIGNIN_DATA_LABEL: "SIGN IN INFORMATION",
	},
	fr: {
		TAB_SIGNIN_DATA_LABEL: "INFORMATIONS DE CONNEXION",
	},
	de: {
		TAB_SIGNIN_DATA_LABEL: "ANMELDEINFORMATIONEN",
	},
	nl: {
		TAB_SIGNIN_DATA_LABEL: "INLOGGEGEVENS",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default function TabSignInData() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container>
				<Box boxShadow={4}>

					<Typography>
						{I18n.get('TAB_SIGNIN_DATA_LABEL')}
					</Typography>

				</Box>
			</Grid>
		</div>
	)
}
