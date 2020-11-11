/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { connect } from 'react-redux';
import { setAuth } from '../../redux/actions';

import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

import { Branding } from '../../branding';
import avatar from '../../assets/Avatar/avatar.png';
import logo from '../../assets/Logos/logoDark.png';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import useWindowDimensions from '../../components/ViewPort/useWindowDimensions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	userButton: {
		marginLeft: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	logo: {
		width: 70,
		marginRight: theme.spacing(2),
	},
	offset: theme.mixins.toolbar,
}));

const mapStateToProps = (state) => {
	return {
		auth: state.app.auth
	}
}

const Header = (props) => {
	const classes = useStyles();
	const [lang, setLang] = React.useState(props.lang || "en");
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const checkSignIn = () => {
		Auth.currentAuthenticatedUser()
			.then(() => { props.setAuth(true) })
			.catch((err) => { props.setAuth(false) })
	}
	const auth = props.auth || checkSignIn() || false;

	const { width } = useWindowDimensions();

	const handleLangChange = (lang) => {
		I18n.setLanguage(lang);
		setLang(lang);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRouteTo = (routeTo) => {
		setAnchorEl(null);
		if (routeTo) props.routeTo(routeTo);
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" color="primary" >
				<Toolbar>
					<img alt="" src={logo} className={classes.logo} />

					{(width > 610) && (
						<Typography variant="h5" className={classes.title}>
							{Branding.appName}
						</Typography>
					)}

					<LanguageSelect
						lang={lang}
						changedLang={handleLangChange}
						themeShowLabel={false}
						themeColor={Branding.white}
						themeBackgroundColor={Branding.primary}
					/>

					{auth && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
								className={classes.userButton}
							>
								<Avatar alt="User" src={avatar} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={() => handleRouteTo('/settings')}>
									{I18n.get("HEADER_MENU_ITEM_PROFILE")}
								</MenuItem>
								<MenuItem onClick={() => handleRouteTo('/dashboard')}>
									{I18n.get("HEADER_MENU_ITEM_DASHBOARD")}
								</MenuItem>
								<Divider />
								<MenuItem onClick={() => handleRouteTo('/logout')}>
									{I18n.get("HEADER_MENU_ITEM_LOGOUT")}
								</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>

			<div className={classes.offset} />
		</div>
	);
}

export default connect(mapStateToProps, { setAuth })(Header)
