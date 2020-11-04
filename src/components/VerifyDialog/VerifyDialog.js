import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { setVerifyDialog } from '../../redux/actions';


const mapStateToProps = (state) => {
	return {
		verifyDialog: state.app.verifyDialog
	}
}

const VerifyAttribute = (props) => {
	const handleClickVerify = () => {
		props.setVerifyDialog({ type: '', open: false })
	};

	const handleClose = () => {
		props.setVerifyDialog({ type: '', open: false })
	};

	return (
		<Dialog open={props.verifyDialog.open} onClose={handleClose} disableBackdropClick aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{props.verifyDialog.type}
					To subscribe to this website, please enter your email address here. We will send updates
					occasionally.
          			</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClickVerify} color="primary">
					Verify
				</Button>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default connect(mapStateToProps, { setVerifyDialog })(VerifyAttribute);
