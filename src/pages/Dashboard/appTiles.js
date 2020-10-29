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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

import useWindowDimensions from './useWindowDimensions';

/*
 * Localization
 */
const strings = {
	en: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_BTN_OPEN: "Open",
		DASHBOARD_LOGO: "Logo"
	},
	fr: {
		DASHBOARD_TITLE: "TABLEAU DE BORD",
		DASHBOARD_BTN_OPEN: "Ouvert",
		DASHBOARD_LOGO: "Logo"
	},
	de: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_BTN_OPEN: "Öffnen",
		DASHBOARD_LOGO: "Logo"
	},
	nl: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_BTN_OPEN: "Open",
		DASHBOARD_LOGO: "Logo"
	}
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: '90%',
		justifyContent: 'center',
	},
	listSubheader: {
		textAlign: 'center',
		fontSize: '32px',
		fontWeight: 'bold',
		margin: '25px'
	},
	button: {
		margin: theme.spacing(2),
		backgroundColor: 'primary'
	},
}));

/*
 * check if a App-Logo exists
 * if yes -> App-Logo Image
 * if not -> use Default Image
 */
function getImage(clientId) {
	let imgSrc = `/logos/${clientId}.png`
	var http = new XMLHttpRequest();

	http.open('GET', imgSrc, false);
	http.send();
	if (http.responseText.toLocaleLowerCase().startsWith('<!doctype html>')) imgSrc = '/logos/default.png'

	return imgSrc;
}

export default function AppTiles(props) {
	const classes = useStyles();

	/*
	 * get the width of the viewport
	 * the total width of a tile
	 * set the count of Columns in the grid
	 */
	const { width } = useWindowDimensions();
	const tileTotalWidth = 350;
	const gridCols = () => {
		return (width / tileTotalWidth)
	};

	return (
		<div className={classes.root}>
			<GridList cellHeight={180} spacing={20} cols={gridCols()} className={classes.gridList}>
				<GridListTile key="Subheader" cols={gridCols()} style={{ height: 'auto' }}>
					<ListSubheader component="div" className={classes.listSubheader}>
						{I18n.get("DASHBOARD_TITLE")}
					</ListSubheader>
				</GridListTile>
				{props.appClients.map((tile) => (
					<GridListTile key={tile.client_id} >
						<img src={getImage(tile.client_id)} alt={tile.client_name + " " + I18n.get('DASHBOARD_LOGO')} />
						<GridListTileBar
							title={tile.client_name}
							subtitle={tile.client_id}
							actionIcon={
								<Button className={classes.button} variant="contained" color="primary" href={tile.logback_uri}>
									{I18n.get("DASHBOARD_BTN_OPEN")}
								</Button>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div >
	);
}
