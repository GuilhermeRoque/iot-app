import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import {acquisitionMethodsValueMap, channelTypesValueMap, paramsValueMap, dataTypesValueMap} from "./serviceProfileData"

export default function ServiceProfileTable({serviceProfiles}){
    const columns = [
        {name: "serviceProfileId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "dataType", label: "Tipo de dado"},
        {name: "channelType", label: "Canal"},
        {name: "channelParam", label: "Parâmetro do canal"},
        {name: "acquisition", label: "Tipo de aquisição"},
      ];

    
    const _serviceProfiles = serviceProfiles.map((serviceProfile) => {
      return{
        serviceProfileId: serviceProfile.serviceProfileId,
        name: serviceProfile.name,
        acquisition: acquisitionMethodsValueMap.get(serviceProfile.acquisition),
        dataType: dataTypesValueMap.get(serviceProfile.dataType),
        channelType: channelTypesValueMap.get(serviceProfile.channelType),
        channelParam: paramsValueMap.get(serviceProfile.channelParam),        
      }
    })

    return (
            <MUIDataTable
              title={"Perfis de serviço"}
              data={_serviceProfiles}
              columns={columns}
              options={options}
            />
      );  
}