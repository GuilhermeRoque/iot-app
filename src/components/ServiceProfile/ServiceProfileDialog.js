import {
    Dialog,
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
} from "@mui/material";
import ServiceProfileForm from "./ServiceProfileForm";


export default function ServiceProfileDialog({open, handleClose, organizationId, handleNewServiceProfile}){
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastro de perfil de serviço</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Especifique as características de serviço do dispositivo
                </DialogContentText>
                <ServiceProfileForm organizationId={organizationId} handleNewServiceProfile={handleNewServiceProfile}> </ServiceProfileForm>
            </DialogContent> 
        </Dialog>
    )
}
