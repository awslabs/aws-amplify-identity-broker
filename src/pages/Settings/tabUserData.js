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
		TAB_USER_DATA_LABEL: "USER DATA",
	},
	fr: {
		TAB_USER_DATA_LABEL: "DONNÉES D'UTILISATEUR",
	},
	de: {
		TAB_USER_DATA_LABEL: "BENUTZERINFORMATIONEN",
	},
	nl: {
		TAB_USER_DATA_LABEL: "GEBRUKERSGEGEVENS",
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default function TabUserData() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container>
				<Box boxShadow={4}>

					<Typography>
						{I18n.get('TAB_USER_DATA_LABEL')}
					</Typography>

				</Box>
			</Grid>
		</div>
	)
}
