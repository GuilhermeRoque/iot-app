import React from "react";
import LoraProfileForm from "./LoraProfileForm";
import DialogForm from "../resources/DialogForm";

export default function LoraProfileDialog({open, handleClose, organizationId, handleNewLoraProfile}){
    return(
        <DialogForm 
            open={open} 
            handleClose={handleClose} 
            title={'Cadastre um perfil LoRaWAN'} 
            helpText={"Especifique as características LoRaWAN do dispositivo"}
        >
            <LoraProfileForm organizationId={organizationId} handleNewLoraProfile={handleNewLoraProfile}></LoraProfileForm>
        </DialogForm>
    )
}
