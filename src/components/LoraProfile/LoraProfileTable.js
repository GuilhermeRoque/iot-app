import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function LoraProfileTable({organizationName, loraProfiles}){
    const columns = [
        {name: "loraProfileId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "freqPlanId", label: "Plano de frequência"},
        {name: "macVersionId", label: "Versão MAC"},
        {name: "isClassB", label: "Classe B"},
        {name: "isClassC", label: "Classe C"},

      ];
    
    const _loraProfiles = []
    for (const loraProfile of loraProfiles){
      _loraProfiles.push({
        loraProfileId: loraProfile.loraProfileId,
        name: loraProfile.name,
        freqPlanId: loraProfile.freqPlanId,
        macVersionId: loraProfile.macVersionId,
        isClassB: loraProfile.isClassB?"Sim":"Não",
        isClassC: loraProfile.isClassC?"Sim":"Não",
      })
    }

    return (
            <MUIDataTable
              title={organizationName}
              data={_loraProfiles}
              columns={columns}
              options={options}
            />
      );  
}