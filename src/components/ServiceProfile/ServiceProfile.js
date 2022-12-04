import React from "react"
import ServiceProfileForm from "./ServiceProfileForm"
import OrganizationChild from "../OrganizationChild/OrganizationChild"
import APIClient from "../../services/apiClient"
import {acquisitionMethodsValueMap, channelTypesValueMap, paramsValueMap, dataTypesValueMap} from "./serviceProfileData"


export default function ServiceProfile(){
    return(
        <OrganizationChild
            titleTable={"Perfis de Serviço"}
            titleRegisterForm={"Cadastr um perfil de serviço"}
            apiPath={APIClient.serviceProfilesPath}
            Form={ServiceProfileForm}
            labelMapper={[
                {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
                {name: "dataType", label: "Tipo de dado"},
                {name: "channelType", label: "Canal"},
                {name: "channelParam", label: "Parâmetro do canal"},
                {name: "acquisition", label: "Tipo de aquisição"},
                {name: '_id', label:"_id", options:{display: false}}
            ]
            }
            valueMapper={{
                acquisition: acquisitionMethodsValueMap,
                dataType: dataTypesValueMap,
                channelType: channelTypesValueMap,
                channelParam: paramsValueMap,     
            }}
        >

        </OrganizationChild>
    )

}