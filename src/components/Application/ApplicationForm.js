import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import useAPI from '../../services/useAPI';
import { useAuth } from '../../context/auth-context';
import { useSnackbar } from "../../context/snackbar-context";

export default function ApplicationForm({handleNewApplication}){
    const api = useAPI()
    const auth = useAuth();
    const toast = useSnackbar()

    const handleSubmit = (event) => {
        event.preventDefault();
        const firstOrganizationId = auth.user.userOrganizations[0].organizationId
        const data = new FormData(event.currentTarget);
        const applicationData = {
          applicationId: data.get("applicationId"),
          apiKey: data.get("apiKey"),
          name: data.get("name")
        }
        
        api.post('/organizations/'+firstOrganizationId+"/applications", applicationData)
        .then((response) => {
          toast.start("Applicação cadastrada", "success")
          const newApplication = response.data
          handleNewApplication(newApplication)
        })
        .catch(error => {
          toast.start("Falha durante cadastro", "error")
        })
      };
    
      const handleChange = () => {}
    
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">
        Cadastre uma aplicação
        </Typography>
        <TextField
            margin="normal"
            required
            fullWidth
            id="applicationId"
            label="Identificador"
            name="applicationId"
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
          <TextField
            margin="normal"
            fullWidth
            id="apiKeys"
            label="Chave de API"
            name="apiKey"
            autoFocus
          />
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
    );
}
