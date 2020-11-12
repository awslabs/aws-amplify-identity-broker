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
import Button from '@material-ui/core/Button';

import useWindowDimensions from '../../components/ViewPort/useWindowDimensions';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: 40,
	},
	gridList: {
		width: '90%',
		justifyContent: 'center',
	},
	listSubheader: {
		textAlign: 'center',
		fontSize: 32,
		fontWeight: 'bold',
	},
	button: {
		margin: theme.spacing(2),
	},
}));

/*
 * if no Client Logo available load 'default.png'
 */
function fallBackImage(e) {
	e.target.src = 'logos/default.png';
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
				{props.appClients.map((tile) => (
					<GridListTile key={tile.client_id} >
						<img
							src={`logos/${tile.client_logo}`}
							alt={tile.client_name + " " + I18n.get('DASHBOARD_APPTILES_LOGO')}
							onError={(e) => fallBackImage(e)}
						/>

						<GridListTileBar
							title={tile.client_name}
							subtitle={tile.client_id}
							actionIcon={
								<Button
									variant="contained"
									href={tile.logback_uri}
									color="secondary"
									className={classes.button}
								>
									{I18n.get("DASHBOARD_APPTILES_BTN_OPEN")}
								</Button>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div >
	);
}
