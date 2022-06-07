import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function DeviceTable({application}){
    const columns = [
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "devId", label: "Identificador"},
        {name: "configProfId", label: "Configuração de aplicação"},
        {name: "networkProfId", label: "Configurações de rede"},
      ];
    
    const devices = []
    for (const device of application.devices){
      devices.push({
        name: device.name,
        devId: device.devId,
        configProfId: 'Perfil 1',
        networkProfId: 'Perfil 1'
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