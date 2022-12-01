import React from "react";
import DialogForm from "../resources/DialogForm";

export default function OrganizationChildDialog({open, handleClose, organizationId, handleNewData, Form}){
    return(
        <DialogForm 
            title={"Formulário de cadastro/edição"} 
            helpText={"Insira as informações necessárias e confirme o cadastro/edição"}
            open={open}
            handleClose={handleClose}
        >
            <Form organizationId={organizationId} handleNewData={handleNewData}> </Form>
        </DialogForm>
    )
}
