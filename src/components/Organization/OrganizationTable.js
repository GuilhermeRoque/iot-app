import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import {MapperMemberRole, MapperMemeberStatus} from "../resources/enums"

export default function OrganizationTable({members}){
    const columns = [
        {name: "userName", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "userEmail", label: "Email"},
        {name: "role", label: "Função"},
        {name: "status", label: "Estado"},
      ];
    
    console.log('Rendering members table')
    const membersMapped = []
    members.map((member) => {
      membersMapped.push({
        role: MapperMemberRole[member.role],
        status: MapperMemeberStatus[member.status],
        userName: member.userName,
        userEmail: member.userEmail
      })
    })  

    return (
        <MUIDataTable
          title={"Participantes"}
          data={membersMapped}
          columns={columns}
          options={options}
        />
      );  
}