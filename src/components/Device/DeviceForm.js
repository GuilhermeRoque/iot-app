import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    Checkbox,
    MenuItem,
    FormControl,
    FormControlLabel,
} from "@mui/material"
import React, { useState } from "react"
import { useSnackbar } from "../../context/snackbar-context"
import useAPI from "../../services/useAPI"
import APIClient from "../../services/apiClient"

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

    const [loraProfile, setLoraProfile] = useState(device?.loraProfile?._id?device.loraProfile._id:"")
    const handleChangeLoraProfile = (event) =>{setLoraProfile(event.target.value)}
    const loraProfilesItems = loraProfiles.map((loraProfile, index) => <MenuItem value={loraProfile._id} key={index}>{loraProfile.name}</MenuItem>)
    const [checked, setChecked] = React.useState(device?device.configured:loraProfiles?.length?false:true)
    const [serviceProfile, setServiceProfile] = useState(device?.serviceProfile?._id?device.serviceProfile._id:"")
    const handleChangeServiceProfile = (event) =>{setServiceProfile(event.target.value)}
    const serviceProfilesItems = serviceProfiles.map((serviceProfile, index) => <MenuItem value={serviceProfile._id} key={index}>{serviceProfile.name}</MenuItem>)

    const handleIsConfigured = (e) =>{
        setChecked(e.target.checked)
    }

    const registerDevice = (deviceData) => {
        const apiClient = new APIClient(api)
        const request = device?apiClient.updateDevice:apiClient.createDevice
        const deviceId = device?device._id:null
        console.log("device", device)
        request(organizationId, applicationId, deviceData, deviceId)
        .then((data)=>{
            toast.start("Dispositivo cadastrado", 'success')
            handleNewDevice(data)
        })
        .catch((error)=>{
            toast.start(error.message, 'error')
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const payload = {
          name: data.get("devName"),
          devId: data.get("devId"),
          devEUI: data.get("devEUI"),
          joinEUI: data.get('joinEUI'),
          appKey: data.get('appKey'),
          configured: checked,
          loraProfileId: loraProfile,
          serviceProfileId: serviceProfile
        }
        registerDevice(payload)    
    }

    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth:1000}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="devId"
                label="Identificador do dispositivo"
                name="devId"
                defaultValue={device?device.devId:''}
                // autoFocus
            />
            <TextField
                margin="normal"
                required
                name="devName"
                label="Nome"
                fullWidth
                defaultValue={device?device.name:''}
                id="devName"
            />
            <TextField
                margin="normal"
                name="devEUI"
                label="Device EUI"
                fullWidth
                defaultValue={device?device.devEUI:''}
                id="devEUI"
            />
            <TextField
                margin="normal"
                name="joinEUI"
                label="Join EUI"
                fullWidth
                defaultValue={device?device.joinEUI:''}
                id="joinEUI"
                // hidden
            />
            <TextField
                margin="normal"
                name="appKey"
                label="Chave de aplicação"
                fullWidth
                id="appKey"
                defaultValue={device?device.appKey:''}
                // hidden
            />
            <br/>
            <FormControl sx={{marginTop:1, marginRight:1, minWidth:160 }} disabled={loraProfiles?.length?false:true}>
                <InputLabel id="loraProfile-select-label">Perfil LoRaWAN</InputLabel>
                <Select
                    // fullWidth
                    id="loraProfile"
                    name="loraProfile"
                    defaultValue={loraProfile}
                    labelId='loraProfile-select-label'
                    onChange={handleChangeLoraProfile}
                >
                    {loraProfilesItems}
                </Select>
            </FormControl>
            <FormControl sx={{marginTop:1, marginRight:1, minWidth:160 }} disabled={serviceProfiles?.length?false:true}>
                <InputLabel id="serviceProfile-select-label">Perfil de serviço</InputLabel>
                <Select
                    fullWidth
                    id="serviceProfile"
                    name="serviceProfile"                        
                    defaultValue={serviceProfile}
                    labelId='serviceProfile-select-label'
                    onChange={handleChangeServiceProfile}
                >
                    {serviceProfilesItems}
                </Select>
            </FormControl>
            <br/>
            <FormControl disabled={loraProfiles?.length?false:true}>
                <FormControlLabel 
                    sx={{display: 'flex', marginTop:"5px"}} 
                    control={<Checkbox onChange={handleIsConfigured} id="configured" defaultChecked={checked}/>} 
                    label={"Configurado no provedor"}>
                </FormControlLabel>
            </FormControl>
            <br/>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            {device?"Atualizar":"Cadastrar"}
            </Button>
        </Box>
    )
}