import React from "react"
import { 
    Box,
    TextField,
    Typography,
    Button 
} from "@mui/material"
import useAPI from "../../services/useAPI";
import { useAuth } from "../../context/auth-context";
import { useSnackbar } from "../../context/snackbar-context";

export default function OrganizationForm({setOrganization}){
    const api = useAPI()
    const auth = useAuth()
    const toast = useSnackbar()

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
          name: data.get("organizationName"),
          description: data.get("organizationDescription"),

        }
        api.post("/organizations", payload)
          .then((response) => {
            toast("Organização cadastrada", "success")
            setOrganization([response.data.organization])
            // const organizations = [response.data._id]
            // auth.updateOrganizations(organizations)    
          })
          .catch((err)=>{
            console.log(err)
            toast("Falha ao registrar", "error")
          })
      }
    
    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">Cadastre uma organização</Typography>
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
            id="organizationDescription"
            label="Descrição"
            name="organizationDescription"
            autoFocus
            />
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
          </Button>
        </Box>
      )
}