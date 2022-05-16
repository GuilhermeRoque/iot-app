import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import useAPI from "../../services/useAPI";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function Table() {
  const [organization, setOrganization] = useState([])
  const api = useAPI()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getOrganizations = async () => {
      try{
        const response = await api.get('/organizations',{
          signal:controller.signal
        })
        isMounted && setOrganization(response.data)  
      }catch(err){
        console.log(err)
      }
    }

    getOrganizations()
   
    return () => {
      isMounted = false;
      controller.abort();
    }
  
  },[api])

  const columns = [
    {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
    {name: "email", label: "Email"},
    {name: "role", label: "Função"},
  ];
  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    selectableRows: "none",
    selectableRowsHeader: "false",
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "400px",
    tableBodyMaxHeight: "",
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "of",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Exibir colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPAR",
      },
      viewColumns: {
        title: "Exibir Colunas",
        titleAria: "Exibir/Esconder Colunas",
      },
      selectedRows: {
        text: "linhas(s) selecionadas",
        delete: "Remover",
        deleteAria: "Remover linhas selecionadas",
      },
    }, 
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    }
  };

  const first_organization = organization.length?organization:{name: '', members: []}
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={first_organization.name}
          data={first_organization.members}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}