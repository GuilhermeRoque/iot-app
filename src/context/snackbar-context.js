import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


const SnackbarContext = React.createContext({
    open:null,
    timeout:null,
    message:null,
    type:null
});

const useSnackbar = () => {
    return React.useContext(SnackbarContext);
};  

const SnackbarProvider = ({children}) => {
    const [toast, setToast] = React.useState({open:false, message:'', type:'success',   });    
    const start = (message, type) => {
        const newToast = {
            open: true,
            message: message,
            type: type,
            timeout: 5000
        }
        setToast(newToast)
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        const newToast = {...toast}
        newToast.open = false
        setToast(newToast)
    };
    const value={toast, start, handleClose}
    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar 
                    open={toast.open} 
                    autoHideDuration={toast.timeout} 
                    onClose={handleClose} 
                    anchorOrigin={{ vertical:'bottom', 
                    horizontal:'center'}}>
                <Alert 
                    onClose={handleClose} 
                    severity={toast.type} 
                    variant="filled">
                        {toast.message}
                </Alert> 
            </Snackbar>
        </SnackbarContext.Provider>
      )
} 
export {SnackbarContext, useSnackbar, SnackbarProvider}