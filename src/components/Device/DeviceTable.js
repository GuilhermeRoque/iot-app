import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function DeviceTable({devices}){
    console.log("DEVICES", devices)
    const columns = [
        {name: "devId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "devEUI", label:"Device EUI"},
        {name: "joinEUI", label:"Join EUI"},
        // {name: "appKey", label:"Chave de aplicação"},
        {name: "serviceProfile", label: "Perfil de Serviço"},
        {name: "loraProfile", label: "Perfil LoRaWAN"},
      ];
    
    const _devices = []
    console.log("devices", devices)
    for (const device of devices){
      _devices.push({
        name: device.name,
        devId: device.devId,
        devEUI: device.devEUI,
        joinEUI: device.joinEUI,
        // appKey: device.appKey,
        serviceProfile: device.serviceProfile,
        loraProfile: device.loraProfile
      })
    }

    return (
            <MUIDataTable
              title={"Dispositivos"}
              data={_devices}
              columns={columns}
              options={options}
            />
      );  
}