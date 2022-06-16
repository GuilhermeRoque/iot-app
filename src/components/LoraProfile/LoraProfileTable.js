import MUIDataTable from "mui-datatables";
import { options } from "../resources/Table/defaultOptions";


export default function LoraProfileTable({loraProfiles}){
    const columns = [
        {name: "loraProfileId", label: "Identificador"},
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "freqPlanId", label: "Plano de frequência"},
        {name: "macVersionId", label: "MAC LoRaWAN"},
        {name: "phyVersionId", label: "PHY LoRa"},
        {name: "isClassB", label: "Classe B"},
        {name: "isClassC", label: "Classe C"},
        {name: "isOTAA", label: "OTAA"},

      ];
    
    const _loraProfiles = []
    for (const loraProfile of loraProfiles){
      _loraProfiles.push({
        loraProfileId: loraProfile.loraProfileId,
        name: loraProfile.name,
        macVersionId: loraProfile.macVersionId,
        phyVersionId: loraProfile.phyVersionId,
        freqPlanId: loraProfile.freqPlanId,
        isClassB: loraProfile.isClassB?"Sim":"Não",
        isClassC: loraProfile.isClassC?"Sim":"Não",
        isOTAA: loraProfile.isOTAA?"Sim":"Não",
      })
    }

    return (
            <MUIDataTable
              title={"Perfis LoRaWAN"}
              data={_loraProfiles}
              columns={columns}
              options={options}
            />
      );  
}