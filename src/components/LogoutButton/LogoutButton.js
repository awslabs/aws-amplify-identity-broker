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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Branding } from '../../branding.js';

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
	button: {
		width: 200,
		backgroundColor: Branding.negative,
		color: 'white',
		fontWeight: 'bold'
	}
}));

export default function LogoutButton() {
	const classes = useStyles();
	const logoutPath = '/logout';

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Button className={classes.button} variant="contained" href={logoutPath} >
							{I18n.get("LOGOUT_BUTTON_LABEL")}
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
