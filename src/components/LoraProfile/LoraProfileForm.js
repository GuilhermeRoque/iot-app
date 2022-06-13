import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem,
    FormControlLabel,
    Checkbox
} from "@mui/material"
import React from "react"
import useAPI from "../../services/useAPI"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { ttn_frequency_plans, loraWanVersions } from "./loraModelOptions"

export default function LoraProfileForm({organizationId, handleNewLoraProfile}){
    const api = useAPI()
    const dispatch = useDispatch()

    // const [dataType, setDataType] = React.useState('0')
    // const [dataChannel, setDataChannel] = React.useState('0')
    // const handleChangeDataType = (event) =>{setDataType(event.target.value)}
    // const handleChangeDataChannel = (event) =>{setDataChannel(event.target.value)}
    // const dataTypesMenuItems = dataTypes.map((dataType) => <MenuItem value={dataType.value}>{dataType.name}</MenuItem>)
    // const channelTypesMenuItems = channelTypes.map((channelType) => <MenuItem value={channelType.value}>{channelType.name}</MenuItem>)

    const [loraWanVersion, setLoraWanVersion] = React.useState(1)
    const [loraFreqPlan, setLoraFreqPlan] = React.useState("EU_863_870")
    const handleChangeLoraWanVersion = (event) =>{setLoraWanVersion(event.target.value)}
    const handleChangeLoraFreqPlan = (event) =>{setLoraFreqPlan(event.target.value)}
    const loraWanVersionsMenuItems = loraWanVersions.map((loraWanVersion) => <MenuItem value={loraWanVersion.value}>{loraWanVersion.name}</MenuItem>)
    const frequencyPlansMenuItems = ttn_frequency_plans.map((freqPlan) => <MenuItem value={freqPlan['id']}>{freqPlan['name']}</MenuItem>)


    const registerLoraProfile = (loraProfile) => {
        api.post("/organizations/"+organizationId+"/lora-profiles", loraProfile)
        .then((response)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Perfil LoRaWAN cadastrado"}))
            handleNewLoraProfile(response.data)
        })
        .catch((error)=>{
            console.log(error)
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro ao cadastrar perfil LoRaWAN"}))
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            loraProfileId: data.get("loraProfileId"),
            name: data.get("name"),
            macVersionId: data.get("loraWanVersion"),
            freqPlanId: data.get("loraFreqPlan"),
            isClassB: data.get("isClassB") !== null,
            isClassC: data.get("isClassC") !== null,
            isOTAA: data.get("isOTAA") !== null,

        }
        console.log('payload', payload)
        registerLoraProfile(payload)    
    }


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="loraProfileId"
                label="Identificador"
                name="loraProfileId"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                name="name"
                label="Nome"
                fullWidth
                id="name"
            />
            <Box sx={{display: 'flex'}}>
                <FormControlLabel control={<Checkbox name="isClassB"/>} label="Classe B" />
                <FormControlLabel control={<Checkbox name="isClassC"/>} label="Classe C" />            
            </Box>
            <FormControlLabel disabled control={<Checkbox name="isOTAA"/>} label="OTAA" />
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