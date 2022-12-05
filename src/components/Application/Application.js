import React from "react"
import ApplicationForm from "./ApplicationForm"
import OrganizationChild from "../OrganizationChild/OrganizationChild"
import APIClient from "../../services/apiClient"


export default function LoraProfile(){
    return(
        <OrganizationChild
            titleTable={"Aplicações"}
            titleRegisterForm={"Cadastre uma Aplicação"}
            apiPath={APIClient.applicationsPath}
            Form={ApplicationForm}
            labelMapper={[
                {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
                {name: "applicationId", label:"Identificador"},
                {name: "integration", label: "Integração"},
                {name: "deviceApi", label: "API dos dispositivos"},
                {name: '_id', label:"_id", options:{display: false}}
            ]}
            valueMapper={{
                integration: new Map([[undefined, "TTN"]]),
                deviceApi: new Map([[undefined, "LoRaWAN-Jean"]])
            }}
        >

        </OrganizationChild>
    )

}