import MUIDataTable from "mui-datatables";
import actionsColumns from "../resources/Table/defaultColumns";
import { options } from "../resources/Table/defaultOptions";
export default function DeviceTable({devices, handlerEdit, handlerDelete, handlerMonitor}){
    
    const columns = [
        {name: "devId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "devEUI", label:"Device EUI"},
        {name: "joinEUI", label:"Join EUI"},
        {name: "_id", label:"ID", options: {display: false}},
        {name: "appKey", label:"Chave de aplicação", options: {display: false}},
        {name: "serviceProfileName", label: "Perfil de Serviço"},
        {name: "loraProfileName", label: "Perfil LoRaWAN"},
        {name: "serviceProfileId", label: "ID Perfil de Serviço", options: {display: false}},
        {name: "loraProfileId", label: "ID Perfil LoRaWAN", options: {display: false}},
        // ...defaultActions
        ...actionsColumns(handlerEdit, handlerDelete, handlerMonitor)
    ];
    
    const devicesAdapted = devices.map(device => {return {
      ...device, 
      loraProfileName: device.loraProfile.name, 
      loraProfileId: device.loraProfile._id,
      serviceProfileName: device.serviceProfile.name,
      serviceProfileId: device.serviceProfile._id
    }})

    return (
            <MUIDataTable
              title={"Dispositivos"}
              data={devicesAdapted}
              columns={columns}
              options={options}
            />
      );  
}