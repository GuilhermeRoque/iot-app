import React, { useState, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useAuth } from "../../auth-context";
import { TextField, Typography, CircularProgress } from "@mui/material";
import InviteCard from "./InviteCard";
import { options } from "../Table/defaultOptions";
import InviteDialog from "./InviteDialog";
import useAPI from "../../services/useAPI";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function OrganizationTable() {
  const [organization, setOrganization] = useState(null)
  const api = useAPI()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');
  const auth = useAuth();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
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
    const path = "/organizations/"+organization[0]._id+"/users"
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

  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      organizationId: data.get("organizationId"),
      name: data.get("organizationName"),
      apiKey: data.get("organizationApiKey")
    }
    api.post("/organizations", payload)
      .then((response) => {
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Organização cadastrada"}))
        const organizations = [response.data._id]
        setOrganization([response.data])
        auth.updateOrganizations(organizations)

      })
      .catch((err)=>{
        console.log(err)
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Falha ao registrar"}))
      })
  }
  if (organization == null){
    return(
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>    
    )
  }else{
    const first_organization = organization.length?organization[0]:{name: '', members: []}
    if(organization.length){
      const index = first_organization.members.findIndex(member => {
        return member.email == auth.user.email;
      });
      if (index == -1){
        return <></>
      }
      const member = first_organization.members[index]
      if (member.status == 'invited'){
        return (
          <InviteCard 
            name={first_organization.name} 
            role={member.role} 
            oragnizationId={first_organization._id}
            updateOrganizations={getOrganizations}
            >            
          </InviteCard>
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
                  <InviteDialog 
                    open={open} 
                    handleClose={handleClose} 
                    handleChange={handleChange} 
                    inviteUser={inviteUser}
                    role={role}
                    >
                  </InviteDialog>                  
              </div>
                </ThemeProvider>
          </CacheProvider>
        );  
      }
    }else{
      // dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Nenhuma organização encontrada"}));
      return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">Cadastre uma organização</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="organizationId"
            label="Identificador"
            name="organizationId"
            autoFocus
            />
          <TextField
            margin="normal"
            required
            fullWidth
            id="organizationName"
            label="Nome"
            name="organizationName"
            autoFocus
            />
          <TextField
            margin="normal"
            required
            fullWidth
            id="organizationApiKey"
            label="Chave de API"
            name="organizationApiKey"
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