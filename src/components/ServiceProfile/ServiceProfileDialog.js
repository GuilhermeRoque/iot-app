import ServiceProfileForm from "./ServiceProfileForm";
import DialogForm from "../resources/DialogForm";

export default function ServiceProfileDialog({open, handleClose, organizationId, handleNewServiceProfile}){
    return(
        <DialogForm 
            title={"Cadastro de perfil de serviço"} 
            helpText={"Especifique as características de serviço do dispositivo"}
            open={open}
            handleClose={handleClose}
        >
            <ServiceProfileForm organizationId={organizationId} handleNewServiceProfile={handleNewServiceProfile}> </ServiceProfileForm>
        </DialogForm>
    )
}
