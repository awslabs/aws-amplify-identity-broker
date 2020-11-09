/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { Branding } from '../../branding';
import useWindowDimensions from '../../components/ViewPort/useWindowDimensions';

import TabSignInData from './tabSignInData';
import TabMfaData from './tabMfaData';
import TabUserData from './tabUserData';
/*
 * Device Management not supported from AWS Amplify SDK for JS - see './tabDeviceData.js'
*/
//import TabDeviceData from './tabDeviceData';


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`usedata-tabpanel-${index}`}
			aria-labelledby={`userdata-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={'div'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `userdata-tab-${index}`,
		'aria-controls': `userdata-tabpanel-${index}`,
	};
};

/*
 * Localization
 */
const strings = {
	en: {
		TAB_SIGNIN_LABEL: "SIGN IN INFORMATION",
		TAB_USER_DATA_LABEL: "USER DATA",
		TAB_DEVICE_DATA_LABEL: "DEVICE DATA",
		TAB_MFA_DATA_LABEL: "MFA DATA",
	},
	fr: {
		TAB_SIGNIN_LABEL: "INFORMATIONS DE CONNEXION",
		TAB_USER_DATA_LABEL: "DONNÉES D'UTILISATEUR",
		TAB_DEVICE_DATA_LABEL: "DONNEES DE L'APPAREIL",
		TAB_MFA_DATA_LABEL: "DONNEES DE MFA",
	},
	de: {
		TAB_SIGNIN_LABEL: "ANMELDEINFORMATIONEN",
		TAB_USER_DATA_LABEL: "BENUTZERINFORMATIONEN",
		TAB_DEVICE_DATA_LABEL: "GERÄTEINFORMATIONEN",
		TAB_MFA_DATA_LABEL: "MFA INFORMATIONEN",
	},
	nl: {
		TAB_SIGNIN_LABEL: "INLOGGEGEVENS",
		TAB_USER_DATA_LABEL: "GEBRUKERSGEGEVENS",
		TAB_DEVICE_DATA_LABEL: "APPARAATGEGEVENS",
		TAB_MFA_DATA_LABEL: "MFA GEGEVENS",
	}
}
I18n.putVocabularies(strings);


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		justifyContent: 'center',
	},
	box: {
		width: '90%',
		maxWidth: '650px',
	},
	appBar: {
		backgroundColor: Branding.white,
	},
	tabs: {
		color: Branding.primary,
		indicator: Branding.accent,
	},
	tabsIndicator: {
		background: Branding.accent,
	},
	tabPanelBox: {
		display: 'flex',
		justifyContent: 'center'
	}
}));

export default function Content(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const { width } = useWindowDimensions();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Grid container className={classes.grid}>
				<Box boxShadow={4} className={classes.box}>
					<AppBar position="static" className={classes.appBar}>
						<Tabs
							value={value}
							onChange={handleChange}
							centered
							variant={width < 550 ? "scrollable" : "standard"}
							aria-label="user data tabs"
							className={classes.tabs}
							classes={{ indicator: classes.tabsIndicator }}
						>
							<Tab label={I18n.get('TAB_SIGNIN_LABEL')} {...a11yProps(0)} className={classes.tab} />
							<Tab label={I18n.get('TAB_MFA_DATA_LABEL')}  {...a11yProps(1)} className={classes.tab} />
							<Tab label={I18n.get('TAB_USER_DATA_LABEL')}  {...a11yProps(2)} className={classes.tab} />
							{
								/*
								* Device Management not supported from AWS Amplify SDK for JS - see './tabDeviceData.js'
								*/
								//<Tab label={I18n.get('TAB_DEVICE_DATA_LABEL')}  {...a11yProps(3)} className={classes.tab} />
							}

						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<Box className={classes.tabPanelBox}>
							<TabSignInData reloadUserData={props.reloadUserData} />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box className={classes.tabPanelBox}>
							<TabMfaData />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Box className={classes.tabPanelBox}>
							<TabUserData reloadUserData={props.reloadUserData} />
						</Box>
					</TabPanel>
					{
						/*
						* Device Management not supported from AWS Amplify SDK for JS - see './tabDeviceData.js'
						*/
						/*
						<TabPanel value={value} index={3}>
							<Box className={classes.tabPanelBox}>
								<TabDeviceData />
							</Box>
						</TabPanel>
						*/
					}
				</Box>
			</Grid>
		</div >
	);
}
