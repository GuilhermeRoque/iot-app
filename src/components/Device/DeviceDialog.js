import {
    Dialog,
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
} from "@mui/material";
import DeviceForm from "./DeviceForm";


export default function DeviceDialog({open, handleClose, organizationId, applicationId, handleNewDevice}){
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastro de dispositivo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Especifique os perfis de configuração e identificadores do dispositivo
                </DialogContentText>
                <DeviceForm organizationId={organizationId} applicationId={applicationId} handleNewDevice={handleNewDevice}> </DeviceForm>
            </DialogContent> 
        </Dialog>
    )
}
