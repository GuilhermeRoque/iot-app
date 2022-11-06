import MUIDataTable from "mui-datatables";
import actionsColumns from "../resources/Table/defaultColumns";
import { options } from "../resources/Table/defaultOptions";
export default function DeviceTable({devices, handlerEdit, handlerDelete}){

    function handlerEditIndex(dataIndex){
      handlerEdit(devices[dataIndex])
    } 

    function handlerDeleteIndex(dataIndex){
      handlerDelete(dataIndex)
    } 

    
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
        ...actionsColumns(handlerEditIndex, handlerDeleteIndex)
    ];
    
    return (
            <MUIDataTable
              title={"Dispositivos"}
              data={devices}
              columns={columns}
              options={options}
            />
      );  
}