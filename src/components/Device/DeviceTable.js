import MUIDataTable from "mui-datatables";
import actionsColumns from "../resources/Table/defaultColumns";
import { options } from "../resources/Table/defaultOptions";
export default function DeviceTable({devices, handlerEdit}){
  const _devices = []
  for (const device of devices){
      _devices.push({
        name: device.name,
        devId: device.devId,
        devEUI: device.devEUI,
        joinEUI: device.joinEUI,
        serviceProfile: device.serviceProfile,
        loraProfile: device.loraProfile
      })
    }

    function handler(dataIndex){
      handlerEdit(_devices[dataIndex])
    } 


    
    const columns = [
        {name: "devId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "devEUI", label:"Device EUI"},
        {name: "joinEUI", label:"Join EUI"},
        // {name: "appKey", label:"Chave de aplicação"},
        {name: "serviceProfile", label: "Perfil de Serviço"},
        {name: "loraProfile", label: "Perfil LoRaWAN"},
        // ...defaultActions
        ...actionsColumns(handler, handler)
    ];
    
    return (
            <MUIDataTable
              title={"Dispositivos"}
              data={_devices}
              columns={columns}
              options={options}
            />
      );  
}