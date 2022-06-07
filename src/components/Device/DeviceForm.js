import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem
} from "@mui/material"
import React from "react"
import useAPI from "../../services/useAPI"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { ttn_frequency_plans, loraWanVersions } from "./loraModelOptions"
// import { dataTypes, channelTypes } from "./loraConfigOptions"

export default function DeviceForm({organizationId, applicationId, handleNewDevice}){
    const api = useAPI()
    const dispatch = useDispatch()

    // const [dataType, setDataType] = React.useState('0')
    // const [dataChannel, setDataChannel] = React.useState('0')
    const [loraWanVersion, setLoraWanVersion] = React.useState(1)
    const [loraFreqPlan, setLoraFreqPlan] = React.useState("EU_863_870")
    // const handleChangeDataType = (event) =>{setDataType(event.target.value)}
    // const handleChangeDataChannel = (event) =>{setDataChannel(event.target.value)}
    const handleChangeLoraWanVersion = (event) =>{setLoraWanVersion(event.target.value)}
    const handleChangeLoraFreqPlan = (event) =>{setLoraFreqPlan(event.target.value)}
    const loraWanVersionsMenuItems = loraWanVersions.map((loraWanVersion) => <MenuItem value={loraWanVersion.value}>{loraWanVersion.name}</MenuItem>)
    // const dataTypesMenuItems = dataTypes.map((dataType) => <MenuItem value={dataType.value}>{dataType.name}</MenuItem>)
    // const channelTypesMenuItems = channelTypes.map((channelType) => <MenuItem value={channelType.value}>{channelType.name}</MenuItem>)
    const frequencyPlansMenuItems = ttn_frequency_plans.map((freqPlan) => <MenuItem value={freqPlan['id']}>{freqPlan['name']}</MenuItem>)


    const registerDevice = (device) => {
        api.post("/organizations/"+organizationId+"/applications/"+applicationId+'/devices', device)
        .then((response)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Dispositivo cadastrado"}))
            handleNewDevice(response.data)
        })
        .catch((error)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro ao cadastrar dispositvo"}))
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
          organizationId: data.get("organizationId"),
          name: data.get("devName"),
          devId: data.get("devId"),
          config: {
            macVersionId: data.get("loraWanVersion"),
            freqPlanId: data.get("loraFreqPlan"),
            dataType: data.get("dataType"),
            dataChannel: data.get("dataChannel"),
          }
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
                autoComplete="current-password"
            />
            {/* <Box sx={{display: 'flex'}}>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="dataType-select-label">Tipo de dado</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="dataType"
                        name="dataType"
                        value={dataType}
                        labelId='dataType-select-label'
                        onChange={handleChangeDataType}
                    >
                        {dataTypesMenuItems}
                    </Select>
                </Box>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="dataChannel-select-label">Canal de leitura/escrita</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="dataChannel"
                        name="dataChannel"
                        value={dataChannel}
                        labelId='dataChannel-select-label'
                        onChange={handleChangeDataChannel}
                    >
                        {channelTypesMenuItems}
                    </Select>
                </Box>
            </Box> */}



            <Box sx={{display: 'flex'}}>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="loraWanVersion-select-label">Versão MAC LoRaWAN</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="loraWanVersion"
                        name="loraWanVersion"
                        value={loraWanVersion}
                        labelId='loraWanVersion-select-label'
                        onChange={handleChangeLoraWanVersion}
                    >
                        {loraWanVersionsMenuItems}
                    </Select>
                </Box>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="loraFreqPlan-select-label">Plano de frequência</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="loraFreqPlan"
                        name="loraFreqPlan"
                        value={loraFreqPlan}
                        labelId='loraFreqPlan-select-label'
                        onChange={handleChangeLoraFreqPlan}
                    >
                        {frequencyPlansMenuItems}
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