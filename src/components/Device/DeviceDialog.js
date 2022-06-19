import DeviceForm from "./DeviceForm";
import DialogForm from "../resources/DialogForm";

export default function DeviceDialog({open, handleClose, organizationId, applicationId, handleNewDevice, loraProfiles, serviceProfiles}){
    return(
        <DialogForm
            title={"Cadastro de dispositivo"}
            helpText={"Especifique os perfis de configuração e identificadores do dispositivo"}
            open={open}
            handleClose={handleClose}
        >
            <DeviceForm 
                organizationId={organizationId} 
                applicationId={applicationId} 
                handleNewDevice={handleNewDevice}
                loraProfiles={loraProfiles}
                serviceProfiles={serviceProfiles}
            > 
            </DeviceForm>
        </DialogForm>
    )
}
