import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice";
import { useAuth } from '../../context/auth-context';
import useAPI from '../../services/useAPI';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MUIDataTable from "mui-datatables";


export default function AppForm() {
  const dispatch = useDispatch()
  const auth = useAuth();
  const api = useAPI()
  let navigate = useNavigate();
  const [organization, setOrganization] = React.useState(null)
  
  const getOrganizations = () => {
    api.get('/organizations/'+ auth.user.organizations[0])
      .then((response)=>{
          setOrganization(response.data)
        })
      .catch((err)=>{
          console.log(err)
        })
  }

  React.useEffect( () => {
    if(!auth.user.organizations.length){
      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma organização primeiro"}));
      navigate('/organizations', {replace: true})
    }else{
      getOrganizations()
    }  
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const applicationData = {
      appId: data.get("appId"),
      // key: data.get("apiKey"),
      name: data.get("name")
    }
    
    api.post('/organizations/'+organization._id+"/applications", applicationData)
    .then((response) => {
      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Applicação cadastrada"}));
      console.log("organization", organization)
      const new_organization = {...organization}
      new_organization.applications.push(response.data)
      console.log("new_organization", new_organization)
      setOrganization(new_organization)
    })
    .catch(error => {
      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Falha durante cadastro"}));
    })
  };

  const handleChange = () => {}

  if(organization == null){
    return <></>
  }else if (organization.applications.length){
    const options = {
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
        console.log(action);
        console.dir(state);
      }
    };  
    
    const columns = [
      {name: "appId", label:"Identificador"},
      {name: "name", label:"Nome"},
      {name: "integration", label: "Integração"},
      {name: "deviceApi", label: "API dos dispositivos"},
    ];
  
    const data = []
    for (const application of organization.applications){
      data.push({
        name: application.name,
        appId: application.appId,
        integration: "TTN",
        deviceApi: "LoRaWAN-Jean"
      })
    }

    return(              
    <MUIDataTable
      title="Aplicações"
      data={data}
      columns={columns}
      options={options}
    />
)
  }else{
    return (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
            Cadastre uma aplicação
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="appId"
                label="Identificador"
                name="appId"
                autoFocus
              />
            <TextField
                margin="normal"
                required
                name="name"
                label="Nome"
                fullWidth
                id="name"
                autoComplete="current-password"
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="apiKeys"
                label="Chave de API"
                name="apiKey"
                autoFocus
              /> */}
              <InputLabel id="integration-select-label">Integração</InputLabel>
              <Select
                  required
                  fullWidth
                  id="integration"
                  name="integration"
                  value="ttn"
                  labelId='integration-select-label'
                  onChange={handleChange}
              >
                  <MenuItem value={"ttn"}>TTN</MenuItem>
              </Select>
  
              <InputLabel id="deviceAPI-select-label">API dos dispositivos</InputLabel>
              <Select
                  required
                  fullWidth
                  id="deviceAPI"
                  name="deviceAPI"
                  value="LoRaWAN-Jean"
                  labelId='deviceAPI-select-label'
                  onChange={handleChange}
              >
                  <MenuItem value={"LoRaWAN-Jean"}>LoRaWAN-Jean</MenuItem>
              </Select>
  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
            </Box>
    );
  }
}
