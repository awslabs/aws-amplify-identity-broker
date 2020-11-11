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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		paddingBottom: theme.spacing(6),
		boxShadow: '0 0 black',
		textAlign: 'center',
		fontSize: 'xxx-large',
		fontWeight: 'bold'
	},
	contentHead: {
		paddingBottom: theme.spacing(3),
		boxShadow: '0 0 black',
		textAlign: 'center',
		fontSize: 'large',
		fontWeight: 'bold'
	},
	contentText: {
		paddingBottom: theme.spacing(6),
		boxShadow: '0 0 black'
	},
	contentFooter: {
		boxShadow: '0 0 black'
	},
	gridRowActions: {
		paddingBottom: theme.spacing(1),
		textAlign: 'center',
		boxShadow: '0 0 black'
	},
	btnYes: {
		margin: theme.spacing(1),
		color: 'green',
		border: '2px solid green',
		fontWeight: 'bold',
		minWidth: 120,
		'&:hover': {
			color: 'white',
			backgroundColor: 'green'
		}
	},
	btnNo: {
		margin: theme.spacing(1),
		color: 'red',
		border: '2px solid red',
		fontWeight: 'bold',
		minWidth: 120,
		'&:hover': {
			color: 'white',
			backgroundColor: 'red'
		}
	}
}));

export default function TosContent(props) {
	const classes = useStyles();

	const showActions = props.reSign || false;

	const acceptToS = () => {
		props.tosAccept();
	}

	const declineToS = () => {
		props.tosDecline();
	}

	return (
		<div className={classes.root}>
			<Grid container justify="center" spacing={2}>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Paper className={classes.title}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_TITLE")}
					</Paper>
					<Paper className={classes.contentHead}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_P1")}
					</Paper>
					<Paper className={classes.contentText}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM")}
					</Paper>
					<Paper className={classes.contentHead}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_P2")}
					</Paper>
					<Paper className={classes.contentText}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_LOREM_IPSUM")}
					</Paper>
					<Paper className={classes.title}>
						...
					</Paper>
					{showActions && (
						<Paper className={classes.gridRowActions}>
							<Button className={classes.btnYes} variant="outlined" color="primary" onClick={acceptToS}>
								{I18n.get("TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL")}
							</Button>
							<Button className={classes.btnNo} variant="outlined" color="primary" onClick={declineToS}>
								{I18n.get("TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL")}
							</Button>
						</Paper>
					)}
					<Paper className={classes.contentFooter}>
						<hr />
						{I18n.get("TERMS_OF_SERVICE_CONTENT_VERSION_LABEL")}
					</Paper>
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</div>
	);
}
