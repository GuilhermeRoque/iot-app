import {
    Dialog,
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
} from "@mui/material";
import LoraProfileForm from "./LoraProfileForm";


export default function LoraProfileDialog({open, handleClose, organizationId, handleNewLoraProfile}){
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastro de perfil LoRaWAN</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Especifique as características LoRaWAN do dispositivo
                </DialogContentText>
                <LoraProfileForm organizationId={organizationId} handleNewLoraProfile={handleNewLoraProfile}> </LoraProfileForm>
            </DialogContent> 
        </Dialog>
    )
}
