import React from "react";
import DialogForm from "../resources/DialogForm";

export default function OrganizationChildDialog({open, 
                                                handleClose,
                                                handleNewData,
                                                Form, 
                                                currentData}){

        return(
        <DialogForm 
            title={"Formulário de cadastro"} 
            helpText={"Insira as informações necessárias e confirme o cadastro"}
            open={open}
            handleClose={handleClose}
        >
            <Form 
                handleNewData={handleNewData} 
                currentData={currentData}
            />
        </DialogForm>
    )
}
