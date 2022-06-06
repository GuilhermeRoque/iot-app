export const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    selectableRows: "none",
    selectableRowsHeader: false,
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
      // console.log(action);
      // console.dir(state);
    }
};