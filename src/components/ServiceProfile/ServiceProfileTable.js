import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";
import servieProfileData from "./serviceProfileData"

export default function ServiceProfileTable({serviceProfiles}){
    const columns = [
        {name: "serviceProfileId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "dataType", label: "Tipo de dado"},
        {name: "channelType", label: "Canal"},
        {name: "channelParam", label: "Parâmetro do canal"},
        {name: "acquisition", label: "Tipo de aquisição"},
      ];

 
    const _serviceProfiles = serviceProfiles.map((serviceProfile) =>{
      return{
        serviceProfileId: serviceProfile.serviceProfileId,
        name: serviceProfile.name,
        dataType: servieProfileData.acquisitionMethodsValueMap.get(serviceProfile.dataType),
        channelType: servieProfileData.channelTypesValueMap.get(serviceProfile.channelType),
        channelParam: servieProfileData.paramsValueMap.get(serviceProfile.channelParam)
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