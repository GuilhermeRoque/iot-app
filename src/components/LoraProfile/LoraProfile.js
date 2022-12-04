import React from "react"
import LoraProfileForm from "./LoraProfileForm"
import OrganizationChild from "../OrganizationChild/OrganizationChild"
import APIClient from "../../services/apiClient"
import { loraWanVersionsValueMap, loraPhyVersionsValueMap } from "./loraModelOptions"


export default function LoraProfile(){
    const booleanMapper = new Map([[true, "Sim"], [false,"Não"]])
    return(
        <OrganizationChild
            titleTable={"Perfis LoRaWAN"}
            titleRegisterForm={"Cadastre um perfil LoRaWAN"}
            apiPath={APIClient.loraProfilesPath}
            Form={LoraProfileForm}
            labelMapper={[
                {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
                {name: "freqPlanId", label: "Plano de frequência"},
                {name: "macVersion", label: "MAC LoRaWAN"},
                {name: "phyVersion", label: "PHY LoRa"},
                {name: "isClassB", label: "Classe B"},
                {name: "isClassC", label: "Classe C"},
                {name: "isOTAA", label: "OTAA"},
              ]
            }
            valueMapper={{
                macVersion: loraWanVersionsValueMap,
                phyVersion: loraPhyVersionsValueMap,        
                isClassB: booleanMapper,
                isClassC: booleanMapper,
                isOTAA: booleanMapper
            }}
        >

        </OrganizationChild>
    )

}