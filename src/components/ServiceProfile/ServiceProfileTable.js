import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function ServiceProfileTable({serviceProfiles}){
    const columns = [
        {name: "serviceProfileId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "dataType", label: "Tipo de dado"},
        {name: "channelType", label: "Canal"},
        {name: "channelParam", label: "Parâmetro do canal"},
        {name: "acquisition", label: "Tipo de aquisição"},
      ];

    return (
            <MUIDataTable
              title={"Perfis de serviço"}
              data={serviceProfiles}
              columns={columns}
              options={options}
            />
      );  
}