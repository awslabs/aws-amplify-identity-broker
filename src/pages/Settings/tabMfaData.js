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

import { Branding } from '../../branding';
import AppSnackbar from '../../components/Snackbar/Snackbar';

/*
 * Localization
 */
const strings = {
	en: {
		TAB_MFA_DATA_LABEL: 'MFA',
	},
	fr: {
		TAB_MFA_DATA_LABEL: 'MFA',
	},
	de: {
		TAB_MFA_DATA_LABEL: 'MFA',
	},
	nl: {
		TAB_MFA_DATA_LABEL: 'MFA',
	},
}
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({

}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
	}
};

function TabMfaData(props) {
	const classes = useStyles();
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: 'info',
		open: false,
		vertical: 'top',
		horizontal: 'center',
		autoHide: 0,
		message: ''
	});

	return (
		<div>
			{snackBarOps.open && (
				<AppSnackbar ops={snackBarOps} />
			)}

			{I18n.get('TAB_MFA_DATA_LABEL')}
		</div>
	)
}

export default connect(mapStateToProps, {})(TabMfaData)
