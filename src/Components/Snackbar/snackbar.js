import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

export default function AppSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.ops.open);

  if (props.ops.open !== open) 
  {
    setOpen(props.ops.open);
  }

  function setColor() {
    switch (props.ops.type) {
      case 'error':
        return '#E15141';
      case 'warn':
        return '#FC9900';
      case 'info':
        return '#2297F4';
      case 'success':
        return '#4CAF50';     
      default:
        return 'primary'
    }
  }

  const color = setColor();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.ops.open = false;
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        style={{
          backgroundColor: color || '',
        }}
        anchorOrigin={{ 
          vertical: props.ops.vertical || 'bottom', 
          horizontal: props.ops.horizontal || 'center'
        }}
        open={open} 
        autoHideDuration={props.ops.autoHide} 
        onClose={handleClose}
        message={props.ops.message || ''}
        key={(props.ops.vertical + props.ops.horizontal) || ''}
      >
        <SnackbarContent style={{
          backgroundColor: color || '',
        }}
          message={
            <span id="client-snackbar">
              {props.ops.type === 'error' && (
                <IconButton size="small" aria-label="error" color="inherit" onClick={handleClose}>
                  <ErrorOutlineOutlinedIcon fontSize="small" />
                </IconButton> 
              )}
              {props.ops.type === 'warn' && (
                <IconButton size="small" aria-label="error" color="inherit" onClick={handleClose}>
                  <ReportProblemOutlinedIcon fontSize="small" />
                </IconButton>
              )}
              {props.ops.type === 'info' && (
                <IconButton size="small" aria-label="error" color="inherit" onClick={handleClose}>
                  <ErrorOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              )}
              {props.ops.type === 'success' && (
                <IconButton size="small" aria-label="error" color="inherit" onClick={handleClose}>
                  <CheckCircleOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              )}
              {props.ops.message}
            </span>
          }
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Snackbar>   
    </div >
  );
}
