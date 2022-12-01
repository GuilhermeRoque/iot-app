import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import actionsColumns from "../resources/Table/defaultColumns";

export default function OrganizationChildTable({data, handlerEdit, handlerDelete, labelMapper, valueMapper, title}){
    const columns = [...labelMapper, ...actionsColumns(handlerEdit, handlerDelete)]

    let dataAdapted = data

    if(valueMapper){
      dataAdapted = data.map((singleData) => {
        for(const mapper of Object.entries(valueMapper)){
          singleData[mapper[0]] = mapper[1].get(singleData[mapper[0]])
        }
        return singleData
      })
    }

    console.log('data', data)

    return (
            <MUIDataTable
              title={tile}
              data={dataAdapted}
              columns={columns}
              options={options}
            />
      );  
}