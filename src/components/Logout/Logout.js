import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { I18n } from '@aws-amplify/core';

const strings = {
	en: {
		LOGOUT_BUTTON_LABEL: "Logout"
	},
	fr: {
		LOGOUT_BUTTON_LABEL: "Se déconnecter"
	},
	de: {
		LOGOUT_BUTTON_LABEL: "Abmelden"
	},
	nl: {
		LOGOUT_BUTTON_LABEL: "Uitloggen"
	}
};
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		boxShadow: '0 0'
	},
}));

export default function Logout() {
	const classes = useStyles();
	const logoutPath = '/logout';
	const okColor = '#258000';

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Button className={classes.button} variant="contained" href={logoutPath} style={{ width: '200px', color: 'white', fontWeight: 'bold', backgroundColor: okColor }}>
							{I18n.get("LOGOUT_BUTTON_LABEL")}
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
