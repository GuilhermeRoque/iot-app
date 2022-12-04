import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import actionsColumns from "../resources/Table/defaultColumns";

export default function OrganizationChildTable({data, handlerEdit, handlerDelete, labelMapper, valueMapper, title}){
    const columns = [...labelMapper, ...actionsColumns(handlerEdit, handlerDelete)]


    const dataAdapted = []

    for(const singleData of data){
      const dataCopy = {...singleData}
      if(valueMapper){
        for(const mapper of Object.entries(valueMapper)){            
          dataCopy[mapper[0]] = mapper[1].get(singleData[mapper[0]])
        }
      }
      dataAdapted.push(dataCopy)
    }

    return (
            <MUIDataTable
              title={title}
              data={dataAdapted}
              columns={columns}
              options={options}
            />
      );  
}