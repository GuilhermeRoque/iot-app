import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import { loraWanVersionsValueMap, loraPhyVersionsValueMap } from "./loraModelOptions"
import actionsColumns from "../resources/Table/defaultColumns";


export default function LoraProfileTable({loraProfiles, handlerEdit, handlerDelete}){
    const columns = [
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "freqPlanId", label: "Plano de frequência"},
        {name: "macVersion", label: "MAC LoRaWAN"},
        {name: "phyVersion", label: "PHY LoRa"},
        {name: "isClassB", label: "Classe B"},
        {name: "isClassC", label: "Classe C"},
        {name: "isOTAA", label: "OTAA"},
        ...actionsColumns(handlerEdit, handlerDelete)
      ];
    
    const _loraProfiles = []
    for (const loraProfile of loraProfiles){
      _loraProfiles.push({
        name: loraProfile.name,
        macVersion: loraWanVersionsValueMap.get(loraProfile.macVersion),
        phyVersion: loraPhyVersionsValueMap.get(loraProfile.phyVersion),
        freqPlanId: loraProfile.freqPlanId,
        isClassB: loraProfile.isClassB?"Sim":"Não",
        isClassC: loraProfile.isClassC?"Sim":"Não",
        isOTAA: loraProfile.isOTAA?"Sim":"Não",
      })
    }

    return (
            <MUIDataTable
              title={"Perfis LoRaWAN"}
              data={_loraProfiles}
              columns={columns}
              options={options}
            />
      );  
}