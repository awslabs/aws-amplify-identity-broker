/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
*/

/*
 * Amplify miss Device Management for the Javascript SDK
 * This solution works with "fake" data and for this reason will not visible in production
*/

import React from 'react';
import { connect } from 'react-redux';

import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip'
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';

import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles((theme) => ({
	divCard: {
		paddingBottom: theme.spacing(2),
	},
	card: {

	},
	cardHeader: {
		backgroundColor: Branding.primary,
		color: Branding.white,
		padding: theme.spacing(1),
	},
	cardActions: {
		justifyContent: 'center',
		paddingBottom: theme.spacing(2),
	},
	cardHeaderAction: {
		paddingLeft: theme.spacing(1)
	},
	chipCurrentDevice: {
		backgroundColor: Branding.accent,
	},
	textField: {
		width: '100%',
		paddingBottom: theme.spacing(2)
	},
}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,

		/*
		 * Not used at this moment - Amplify did not support Device Management with Javascript SDK
		 *
		*/
		/*
		deviceList: [],
		device: {
			key: 'eu-central-1_c5a2120d-2e47-4990-9dd5-0a690bc08120',
			name: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36',
			lastIP: '127.0.0.1',
			remembered: false,
			sdk: 'aws-sdk-unknown-unknown',
			created: new Date(parseFloat('1577836800') * 1000),
			lastSeen: new Date(parseFloat('1593561600') * 1000),
			lastUpdate: new Date(parseFloat('1604758462') * 1000),
			current: true,
			expanded: false,
		}
		*/
	}
}

function TabDeviceData(props) {
	const classes = useStyles();
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	/*
	* Faked Device and DeviceList
	* Amplify does not support Devices in the Javascript SDK right now; iOS is supported
	*/
	const [device, setDevice] = React.useState({
		key: 'eu-central-1_c5a2120d-2e47-4990-9dd5-0a690bc08120',
		name: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36',
		status: 'valid',
		lastIP: '127.0.0.1',
		remembered: false,
		sdk: 'aws-sdk-unknown-unknown',
		created: new Date(parseFloat('1577836800') * 1000),
		lastSeen: new Date(parseFloat('1593561600') * 1000),
		lastUpdate: new Date(parseFloat('1604758462') * 1000),
		current: true,
		expanded: false,
	});
	const [deviceList, setDeviceList] = React.useState([
		{
			key: 'eu-central-1_946c3d8f-ba55-48b0-ae94-e26aa9352954',
			name: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36',
			status: 'valid',
			lastIP: '127.0.0.1',
			sdk: 'aws-sdk-unknown-unknown',
			created: new Date(parseFloat('1577836800') * 1000),
			lastSeen: new Date(parseFloat('1593561600') * 1000),
			lastUpdate: new Date(parseFloat('1604758462') * 1000),
			current: false,
			expanded: false,
		},
		{
			key: 'eu-central-1_d1a465fd-d7e2-48a0-a0dd-b45c0638ed56',
			name: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36',
			status: 'valid',
			lastIP: '127.0.0.1',
			sdk: 'aws-sdk-unknown-unknown',
			created: new Date(parseFloat('1577836800') * 1000),
			lastSeen: new Date(parseFloat('1593561600') * 1000),
			lastUpdate: new Date(parseFloat('1604758462') * 1000),
			current: false,
			expanded: false,
		},
	]);
	/*
	* End Fake
	*/

	const handleClickRemember = () => {
		try {
			let remember = !device.remembered || false;
			setDevice({ ...device, remembered: remember })

			setSnackBarOps({
				type: 'success',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: remember ? I18n.get('TAB_DEVICE_DATA_REMEMBER_DEVICE_MESSAGE') : I18n.get('TAB_DEVICE_DATA_FORGET_DEVICE_MESSAGE')
			})
		} catch (error) {
			console.log(error);

			setSnackBarOps({
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_DEVICE_DATA_MESSAGE_EROR')
			})
		}
	};

	const handleClickExpand = (index = -1) => {
		try {
			if (index === -1) {
				setDevice({ ...device, expanded: !device.expanded || false })
				return;
			}

			let _deviceList = Object.assign([], deviceList);
			_deviceList[index].expanded = !deviceList[index].expanded;
			setDeviceList(_deviceList);
		} catch (error) {
			console.log(error);

			setSnackBarOps({
				type: 'error',
				open: true,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 3000,
				message: I18n.get('TAB_DEVICE_DATA_MESSAGE_EROR')
			})
		}
	}

	return (
		<div>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}
			<div className={classes.divCard}>
				<Card variant="outlined" className={classes.card}>
					<CardHeader
						title={device.key}
						avatar={
							<PermDeviceInformationIcon />
						}
						action={
							<div className={classes.cardHeaderAction}>
								{(device.current) && (<Chip
									label={I18n.get('TAB_DEVICE_DATA_CHIP_CURRENT_LABEL')}
									size="small"
									className={classes.chipCurrentDevice}
								/>)}
								<IconButton
									size="small"
									onClick={() => handleClickExpand()}
									className={classes.cardHeader}
									aria-label="expand"
								>
									{device.expanded && (<ExpandLessIcon />)}
									{!device.expanded && (<ExpandMoreIcon />)}
								</IconButton>
							</div>
						}
						className={classes.cardHeader}
					/>
					<Collapse in={device.expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<form noValidate autoComplete="off">
								<Box>
									<TextField
										id="textfield_status"
										value={device.remembered ? device.status : ''}
										inputProps={{ style: { left: 0 } }}
										disabled
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_STATUS_LABEL')}
										className={classes.textField}
									/>
								</Box>
								<Box>
									<TextField
										id="textfield_name"
										value={device.remembered ? device.name : ''}
										inputProps={{ style: { left: 0 } }}
										disabled
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL')}
										className={classes.textField}
									/>
								</Box>
								<Box>
									<TextField
										id="textfield_lastIP"
										value={device.remembered ? device.lastIP : ''}
										inputProps={{ style: { left: 0 } }}
										disabled
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL')}
										className={classes.textField}
									/>
								</Box>
								<Box>
									<TextField
										id="textfield_lastSeen"
										value={device.remembered ? device.lastSeen : ''}
										inputProps={{ style: { left: 0 } }}
										disabled
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL')}
										className={classes.textField}
									/>
								</Box>
								<Box>
									<TextField
										id="textfield_lastUpdate"
										value={device.remembered ? device.lastUpdate : ''}
										disabled
										inputProps={{ style: { left: 0 } }}
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL')}
										className={classes.textField}
									/>
								</Box>
								<Box>
									<TextField
										id="textfield_created"
										value={device.remembered ? device.created : ''}
										inputProps={{ style: { left: 0 } }}
										disabled
										label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL')}
										className={classes.textField}
									/>
								</Box>
							</form>
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Button
								color="secondary"
								variant="contained"
								onClick={() => handleClickRemember()}
							>
								{device.remembered ? I18n.get('TAB_DEVICE_DATA_BUTTON_FORGET_DEVICE_LABEL') : I18n.get('TAB_DEVICE_DATA_BUTTON_REMEMBER_DEVICE_LABEL')}
							</Button>
						</CardActions>
					</Collapse>
				</Card >
			</div>
			{/*
			* Device List -> deviceList
			*/}
			{ deviceList.map((item, index) => (
				<div key={`divCard-${index}`} className={classes.divCard}>
					<Card variant="outlined" className={classes.card}>
						<CardHeader
							title={item.key}
							avatar={
								<PermDeviceInformationIcon id={`permDeviceInformationIcon-${index}`} />
							}
							action={
								<div className={classes.cardHeaderAction}>
									<IconButton
										size="small"
										onClick={() => handleClickExpand(index)}
										className={classes.cardHeader}
										aria-label="expand"
									>
										{item.expanded && (<ExpandLessIcon />)}
										{!item.expanded && (<ExpandMoreIcon />)}
									</IconButton>
								</div>
							}
							className={classes.cardHeader}
						/>
						<Collapse in={item.expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<form noValidate autoComplete="off">
									<Box>
										<TextField
											id={`textfield_status-${index}`}
											value={item.status}
											inputProps={{ style: { left: 0 } }}
											disabled
											label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
											className={classes.textField}
										/>
									</Box>
									<Box>
										<TextField
											id={`textfield_name-${index}`}
											value={item.name}
											inputProps={{ style: { left: 0 } }}
											disabled
											label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_NAME_LABEL')}
											className={classes.textField}
										/>
									</Box>
									<Box>
										<TextField
											id={`textfield_lastIP-${index}`}
											value={item.lastIP}
											inputProps={{ style: { left: 0 } }}
											disabled
											label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_IP_LABEL')}
											className={classes.textField}
										/>
									</Box>
									<Box>
										<TextField
											id={`textfield_lastSeen-${index}`}
											value={item.lastSeen}
											inputProps={{ style: { left: 0 } }}
											disabled
											label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_USED_LABEL')}
											className={classes.textField}
										/>
									</Box>
									<Box>
										<TextField
											id={`textfield_lastUpdate-${index}`}
											value={item.lastUpdate}
											disabled
											inputProps={{ style: { left: 0 } }}
											label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_LAST_MODIFIED_LABEL')}
											className={classes.textField}
										/>
									</Box>
									<Box>
										<TextField
											id={`textfield_created-${index}`}
											value={item.created}
											inputProps={{ style: { left: 0 } }}
											disabled
											label={I18n.get('TAB_DEVICE_DATA_TEXTFIELD_CREATED_LABEL')}
											className={classes.textField}
										/>
									</Box>
								</form>
							</CardContent>
						</Collapse>
					</Card >
				</div>
			))}
		</div>
	)
}

export default connect(mapStateToProps, {})(TabDeviceData)
