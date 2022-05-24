import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import useAPI from "../../services/useAPI";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useAuth } from "../../auth-context";
import CircularProgress from '@mui/material/CircularProgress';
import BasicCard from "../Card/Card";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function Table() {
  const [organization, setOrganization] = useState(null)
  const api = useAPI()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');
  const auth = useAuth();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  
  const inviteUser = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const post_data = {
      email: data.get("email-invite"),
      role: data.get("role-invite")
    }
    console.log("\n\npost_data", post_data)
    console.log(organization)
    const path = "/organizations/"+organization[0]._id+"/users"
    console.log("sending...", post_data, path)
    api.post(path, post_data)
    .then((response) => {
      console.log("Usuario convidado", response)
      getOrganizations()
    })
    .catch((err)=>{
      console.log("err", err)
    })

    setOpen(false);
  }

  const getOrganizations = () => {
    api.get('/organizations')
      .then((response)=>{
          setOrganization(response.data)  
        })
      .catch((err)=>{
          console.log(err)
        })
  }

  useEffect(() => {
    getOrganizations()
  }, [])

  const columns = [
    {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
    {name: "email", label: "Email"},
    {name: "role", label: "Função"},
    {name: "status", label: "Estado"},
  ];
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
      // console.log(action);
      // console.dir(state);
    }
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {name: data.get("organizationName")}
    api.post("/organizations", payload)
      .then((response) => {
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Organização cadastrada"}))
        setOrganization([response.data])
      })
      .catch((err)=>{
        console.log(err)
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Falha ao registrar"}))
      })
  }

  const actions = [
    <Button 
      type="submit"
    >
      Enviar
    </Button>,
   <Button onClick={handleClose}>Cancelar</Button>
];

  if (organization == null){
    return(
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>    
    )
  }else{
    const first_organization = organization.length?organization[0]:{name: '', members: []}
    if(organization.length){
      console.log('first_organization', first_organization)
      console.log('user', auth.user)
      const index = first_organization.members.findIndex(member => {
        return member.email == auth.user.email;
      });
      if (index == -1){
        return <></>
      }
      const member = first_organization.members[index]
      console.log(index)
      if (member.status == 'invited'){
        return (
          <BasicCard 
            name={first_organization.name} 
            role={member.role} 
            oragnizationId={first_organization._id}
            updateOrganizations={getOrganizations}
            >
            
          </BasicCard>
        )
      }else{
        return (
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={first_organization.name}
                data={first_organization.members}
                columns={columns}
                options={options}
              />
              <div>
                  <Button 
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}                
                    onClick={handleClickOpen}>
                    Convidar
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Convite para participação</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Insira o email do usuário a convidar e o papel do mesmo da organização.
                      </DialogContentText>
                      <Box component="form" onSubmit={inviteUser} noValidate sx={{ mt: 1 }}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="email-invite"
                          name="email-invite"
                          label="Email"
                          type="email"
                          fullWidth
                          variant="standard"
                        />
                        <InputLabel id="role-invite">Função</InputLabel>
                        <Select
                          id="role-invite"
                          name="role-invite"
                          value={role}
                          label="Função"
                          fullWidth
                          onChange={handleChange}
                        >
                          <MenuItem value={"owner"}>Dono</MenuItem>
                          <MenuItem value={"admin"}>Administrador</MenuItem>
                          <MenuItem value={"user"}>Visualizador</MenuItem>
                        </Select>
                        {actions}                    
                      </Box>
                      </DialogContent>
                      {/* <DialogActions>
                      </DialogActions> */}
                    </Dialog>
                  </div>
                </ThemeProvider>
          </CacheProvider>
        );  
      }
    }else{
      // dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Nenhuma organização encontrada"}));
      return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography>Cadastre uma organização</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="organizationName"
            label="Nome"
            name="organizationName"
            autoFocus
            />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
          </Button>
        </Box>
      )
    }
  }
}