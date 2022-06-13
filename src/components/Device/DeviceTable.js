import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function DeviceTable({application}){
    const columns = [
        {name: "devId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "configProfId", label: "Perfil de Serviço"},
        {name: "loraProfile", label: "Perfil LoRaWAN"},
      ];
    
    const devices = []
    for (const device of application.devices){
      devices.push({
        name: device.name,
        devId: device.devId,
        configProfId: 'Perfil 1',
        loraProfile: device.loraProfile.loraProfileId
      })
    }

    return (
            <MUIDataTable
              title={application.name}
              data={devices}
              columns={columns}
              options={options}
            />
      );  
}