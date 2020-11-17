/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { Branding } from '../../branding';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2)
	},
	border: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: Branding.secondary,
		width: '100%',
	},
	content: {
		paddingTop: 0,
		paddingRight: theme.spacing(2),
		paddingBottom: 0,
		paddingLeft: theme.spacing(2),
		color: Branding.secondary,
	},
}));

const DividerWithText = ({ children }) => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Box className={classes.border} />
			<Box component="span" className={classes.content}>
				{children}
			</Box>
			<Box className={classes.border} />
		</Box>
	);
};

export default DividerWithText;
