import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem
} from "@mui/material"
import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"

export default function DeviceForm({organizationId, applicationId, loraProfiles, handleNewDevice}){


    console.log("loraProfiles[0].loraProfileId", loraProfiles[0].loraProfileId)
    const api = useAPI()
    const dispatch = useDispatch()
    const [loraProfile, setLoraProfile] = useState(loraProfiles[0].loraProfileId)
    const handleChangeLoraProfile = (event) =>{setLoraProfile(event.target.value)}
    const loraProfilesItems = loraProfiles.map((loraProfile) => <MenuItem value={loraProfile.loraProfileId}>{loraProfile.loraProfileId}</MenuItem>)

    const registerDevice = (device) => {
        api.post("/organizations/"+organizationId+"/applications/"+applicationId+'/devices', device)
        .then((response)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Dispositivo cadastrado"}))
            handleNewDevice(response.data)
        })
        .catch((error)=>{
            console.log(error)
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro ao cadastrar dispositvo"}))
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loraProfileId = data.get("loraProfile")
        const loraProfile = loraProfiles.find(loraProfile => loraProfile.loraProfileId === loraProfileId)

        const payload = {
          name: data.get("devName"),
          devId: data.get("devId"),
          devEUI: data.get("devEUI"),
          joinEUI: data.get('joinEUI'),
          loraProfile: loraProfile,
          config: {}
        }
        registerDevice(payload)    
    }

    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="devId"
                label="Identificador do dispositivo"
                name="devId"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                name="devName"
                label="Nome"
                fullWidth
                id="devName"
            />
            <TextField
                margin="normal"
                name="devEUI"
                label="Device EUI"
                fullWidth
                id="devEUI"
            />
            <TextField
                margin="normal"
                name="joinEUI"
                label="Join EUI"
                fullWidth
                id="joinEUI"
                hidden
            />

            <InputLabel id="loraProfile-select-label">Perfil LoRaWAN</InputLabel>
            <Select
                required
                fullWidth
                id="loraProfile"
                name="loraProfile"
                value={loraProfile}
                labelId='loraProfile-select-label'
                onChange={handleChangeLoraProfile}
            >
                {loraProfilesItems}
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
    )
}