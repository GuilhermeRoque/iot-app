import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";

export default function ApplicationTable({applications}){
    const columns = [
        {name: "applicationId", label:"Identificador"},
        {name: "name", label:"Nome"},
        {name: "integration", label: "Integração"},
        {name: "deviceApi", label: "API dos dispositivos"},
    ];

    const data = []
    for (const application of applications){
      data.push({
        name: application.name,
        applicationId: application.applicationId,
        integration: "TTN",
        deviceApi: "LoRaWAN-Jean"
      })
    }
    console.log('Rendering applications table')

    return (
        <MUIDataTable
            title="Aplicações"
            data={data}
            columns={columns}
            options={options}
        />
      );  
}