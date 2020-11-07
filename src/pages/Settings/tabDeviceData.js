import React from 'react';
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import { TextField, Box, Chip, Button, CardActions, Card, IconButton, CardContent, CardHeader, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { Branding } from '../../branding';
//import { setLang } from '../../redux/actions';
import AppSnackbar from '../../components/Snackbar/Snackbar';

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
		'& > *': {
			//margin: theme.spacing(1),
		},
	},
	card: {
		minWidth: 450,
	},
	cardHeader: {
		backgroundColor: Branding.primary,
		color: Branding.white,
		padding: theme.spacing(1),
	},
	cardActions: {
		justifyContent: 'center',
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
		...state,
		deviceList: [],
		device: {
			key: 'eu-central-1_c5a2120d-2e47-4990-9dd5-0a690bc08120',
			name: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
			lastIP: '54.239.6.187',
			remembered: false,
			sdk: 'aws-sdk-unknown-unknown',
			created: 'created',
			lastSeen: 'Jul 7, 2020 1:45:21 PM',
			lastUpdate: 'lastUpdate',
			current: true,
			expanded: false,
		}
	}
}

function TabDeviceData(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(true);
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	const handleClickRemember = () => {

	};

	const handleClickExpand = () => {
		console.log(expanded);
		setExpanded(!expanded);
	}

	return (
		<div className={classes.root}>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					title={props.device.key}
					avatar={
						<PermDeviceInformationIcon />
					}
					action={
						<div className={classes.cardHeaderAction}>
							{(props.device.current) && (<Chip
								label={I18n.get('TAB_SIGNIN_DATA_CHIP_VERIFIED_LABEL')}
								size="small"
								className={classes.chipCurrentDevice}
							/>)}
							<IconButton
								size="small"
								onClick={() => handleClickExpand()}
								className={classes.cardHeader}
								aria-label="expand"
							>
								{expanded && (<ExpandLessIcon />)}
								{!expanded && (<ExpandMoreIcon />)}
							</IconButton>
						</div>
					}
					className={classes.cardHeader}
				/>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<form noValidate autoComplete="off">
							<Box>
								<TextField
									id="textfield_lastIpAddress"
									value={props.device.lastIP}
									label="standard" //{I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
									inputProps={{ style: { left: 0 } }}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_status"
									value={props.device.status}
									inputProps={{ style: { left: 0 } }}
									disabled
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_status"
									value={props.device.status}
									inputProps={{ style: { left: 0 } }}
									disabled
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_lastIpAddress"
									value={props.device.lastIP}
									inputProps={{ style: { left: 0 } }}
									disabled
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_created"
									value={props.device.created}
									disabled
									inputProps={{ style: { left: 0 } }}
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_updated"
									value={props.device.lastUpdate}
									disabled
									inputProps={{ style: { left: 0 } }}
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box>
							<Box>
								<TextField
									id="textfield_lastSeen"
									value={props.device.lastSeen}
									disabled
									inputProps={{ style: { left: 0 } }}
									label={I18n.get('TAB_USER_DATA_TEXTFIELD_ADDRESS_LABEL')}
									className={classes.textField}
								/>
							</Box >
						</form>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Button
							color="secondary"
							variant="contained"
							onClick={() => handleClickRemember()}
						>
							{I18n.get('TAB_USER_DATA_SAVE_BUTTON_LABEL')}
						</Button>
					</CardActions>
				</Collapse>
			</Card >
		</div>
	)
}

export default connect(mapStateToProps, {})(TabDeviceData)
