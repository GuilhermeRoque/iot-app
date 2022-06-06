import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { options } from "../resources/Table/defaultOptions";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});


export default function OrganizationTable({organization}){
    const columns = [
        {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
        {name: "email", label: "Email"},
        {name: "role", label: "Função"},
        {name: "status", label: "Estado"},
      ];
    
    return (
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={organization.name}
              data={organization.members}
              columns={columns}
              options={options}
            />
           </ThemeProvider>
        </CacheProvider>
      );  
}