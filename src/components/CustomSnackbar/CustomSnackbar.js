import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSnackbar } from '../../redux/snackbarSlice'
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

export function CustomSnackbar() {
  const dispatch = useDispatch()
  const snackbarOpen = useSelector(state => state.snackbar.snackbarOpen);
  const snackbarType = useSelector(state => state.snackbar.snackbarType);
  const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar({snackbarOpen: false, snackbarType: snackbarType, snackbarMessage: snackbarMessage}));
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right'}}>
      <Alert onClose={handleClose} severity={snackbarType} variant="filled">{snackbarMessage}</Alert> 
    </Snackbar>
  )
}