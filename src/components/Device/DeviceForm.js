import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem
} from "@mui/material"
import React, { useState } from "react"
import { useSnackbar } from "../../context/snackbar-context"
import useAPI from "../../services/useAPI"

export default function DeviceForm({
    organizationId, 
    applicationId, 
    loraProfiles, 
    serviceProfiles, 
    handleNewDevice, 
    device
}){
    const toast = useSnackbar()
    const api = useAPI()

    const [loraProfile, setLoraProfile] = useState(device?device.loraProfileId:loraProfiles[0]._id)
    const handleChangeLoraProfile = (event) =>{setLoraProfile(event.target.value)}
    const loraProfilesItems = loraProfiles.map((loraProfile) => <MenuItem value={loraProfile._id}>{loraProfile.name}</MenuItem>)

    const [serviceProfile, setServiceProfile] = useState(device?device.serviceProfileId:serviceProfiles[0]._id)
    const handleChangeServiceProfile = (event) =>{setServiceProfile(event.target.value)}
    const serviceProfilesItems = serviceProfiles.map((serviceProfile) => <MenuItem value={serviceProfile._id}>{serviceProfile.name}</MenuItem>)

    const registerDevice = (deviceData) => {
        console.log("device",device, device?'1':'2')
        console.log("payload", deviceData)
        const request = device?api.put:api.post
        console.log("111")
        const deviceId = device?("/"+device._id):""
        console.log("222")

        request("/organizations/"+organizationId+"/applications/"+applicationId+'/devices'+deviceId, deviceData)
        .then((response)=>{
            if(response.status === 201){
                toast.start("Dispositivo cadastrado", 'success')
            }else if(response.status === 202){
                toast.start("Falha durante configuração LoRaWAN", 'warning')
            }
            handleNewDevice(response.data)
        })
        .catch((error)=>{
            console.log(error)
            toast.start("Erro inesperado", 'error')
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loraProfileId = data.get("loraProfile")
        // const loraProfile = loraProfiles.find(loraProfile => loraProfile.loraProfileId === loraProfileId)

        const serviceProfileId = data.get("serviceProfile")
        // const serviceProfile = serviceProfiles.find(serviceProfile => serviceProfile.serviceProfileId === serviceProfileId)

        const payload = {
          name: data.get("devName"),
          devId: data.get("devId"),
          devEUI: data.get("devEUI"),
          joinEUI: data.get('joinEUI'),
          appKey: data.get('appKey'),
          loraProfileId: loraProfile,
          serviceProfileId: serviceProfile
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
                value={device?device.devId:null}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                name="devName"
                label="Nome"
                fullWidth
                value={device?device.name:null}
                id="devName"
            />
            <TextField
                margin="normal"
                name="devEUI"
                label="Device EUI"
                fullWidth
                value={device?device.devEUI:null}
                id="devEUI"
            />
            <TextField
                margin="normal"
                name="joinEUI"
                label="Join EUI"
                fullWidth
                value={device?device.joinEUI:null}
                id="joinEUI"
                hidden
            />
            <TextField
                margin="normal"
                name="appKey"
                label="Chave de aplicação"
                fullWidth
                id="appKey"
                value={device?device.appKey:null}
                hidden
            />
            <Box sx={{display: 'flex'}}>
                <Box sx={{marginRight: 5}}>
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
                </Box>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="serviceProfile-select-label">Perfil de serviço</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="serviceProfile"
                        name="serviceProfile"
                        value={serviceProfile}
                        labelId='serviceProfile-select-label'
                        onChange={handleChangeServiceProfile}
                    >
                        {serviceProfilesItems}
                    </Select>
                </Box>                
            </Box>
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