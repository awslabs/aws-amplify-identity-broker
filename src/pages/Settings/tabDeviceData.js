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
		TAB_DEVICE_DATA_LABEL: "DEVICE DATA",
	},
	fr: {
		TAB_DEVICE_DATA_LABEL: "DONNEES DE L'APPAREIL",
	},
	de: {
		TAB_DEVICE_DATA_LABEL: "GERÄTEINFORMATIONEN",
	},
	nl: {
		TAB_DEVICE_DATA_LABEL: "APPARAATGEGEVENS",
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
						{I18n.get('TAB_DEVICE_DATA_LABEL')}
					</Typography>

				</Box>
			</Grid>
		</div>
	)
}
