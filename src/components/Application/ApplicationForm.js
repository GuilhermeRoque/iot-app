import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';

export default function ApplicationForm({handleNewData, currentData}){
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const applicationData = {
          applicationId: data.get("applicationId"),
          apiKey: data.get("apiKey"),
          name: data.get("name")
        }
        handleNewData(currentData?{...currentData, ...applicationData}:applicationData)    
      };
    
      const handleChange = () => {}
    
    return (
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
            margin="normal"
            required
            fullWidth
            id="applicationId"
            label="Identificador"
            name="applicationId"
            defaultValue={currentData?currentData.applicationId:""}
            autoFocus
          />
        <TextField
            margin="normal"
            required
            name="name"
            label="Nome"
            fullWidth
            id="name"
            defaultValue={currentData?currentData.name:""}
          />
          <TextField
            margin="normal"
            fullWidth
            id="apiKeys"
            label="Chave de API"
            name="apiKey"
            autoFocus
            defaultValue={currentData?currentData.apiKey:""}
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
            {currentData?"Atualizar":"Cadastrar"}
          </Button>
        </Box>
    );
}
