import React from "react";
import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import {MapperMemberRole, MapperMemeberStatus} from "../resources/enums"

export default function OrganizationTable({organizations, user}){
    const columns = [
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "description", label: "Descrição"},
        {name: "role", label: "Função"},
        {name: "status", label: "Estado"},
      ];
    
    console.log('Rendering organization table')
    
    const organizationsAdapted = []
    for (const org of organizations){
      const memberIndex = org.members.findIndex((member)=>{return member.userId === user._id})

      console.log("\n\n\n\n")
      console.log(org)
      console.log(user)
      console.log("\n\n\n\n")

      const member = org.members[memberIndex]
      organizationsAdapted.push({
          ...org,
          role: MapperMemberRole[member.role],
          status: MapperMemeberStatus[member.status]

      })
    } 

    return (
        <MUIDataTable
          title={"Organizações"}
          data={organizationsAdapted}
          columns={columns}
          options={options}
        />
      );  
}