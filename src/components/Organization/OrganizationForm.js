import React from "react"
import { 
    Box,
    TextField,
    Typography,
    Button 
} from "@mui/material"
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice";
import useAPI from "../../services/useAPI";
import { useAuth } from "../../context/auth-context";

export default function OrganizationForm({setOrganization}){
    const api = useAPI()
    const dispatch = useDispatch()
    const auth = useAuth()

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