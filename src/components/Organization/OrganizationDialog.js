import React from "react";
import OrganizationForm from "./OrganizationForm";
import DialogForm from "../resources/DialogForm";

export default function OrganizationDialog({open, handleClose, handleNewOrganization}){
    return(
        <DialogForm 
            open={open} 
            handleClose={handleClose} 
            title={'Cadastre uma Organização'} 
            helpText={"Especifique nome e descrição apropriados"}
        >
            <OrganizationForm handleNewOrganization={handleNewOrganization}></OrganizationForm>
        </DialogForm>
    )
}
