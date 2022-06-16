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
import { acquisitionMethods, channelTypes, dataTypes } from "./loraConfigOptions"

export default function ServiceProfileForm({organizationId, handleNewServiceProfile}){
    const api = useAPI()
    const dispatch = useDispatch()

    const [dataType, setDataType] = React.useState(dataTypes[0])
    const [dataChannel, setDataChannel] = React.useState(channelTypes[0])
    const [acquisitionMethod, setAcquisitionMethod] = React.useState(acquisitionMethods[0])
    const [channelParam, setChannelParam] = React.useState(null)
    

    // const [channelParam, setChannelParam] = React.useState(null)
    // const channelParamsMenuItems = channelParams.map((channelParam)=><MenuItem value={channelParam.value}>{channelParam.name}</MenuItem>)

    const handleChangeChannelParam = (event) =>{setChannelParam(event.target.value)}
    const handleChangeDataType = (event) =>{setDataType(event.target.value)}
    const handleChangeDataChannel = (event) =>{
        const channel = event.target.value
        setDataChannel(channel)
        setChannelParam(channel.params.length?channel.params[0]:null)
    }
    const handleChangeAcquisitionMethod = (event) =>{setAcquisitionMethod(event.target.value)}
    const dataTypesMenuItems = dataTypes.map((dataType) => <MenuItem value={dataType}>{dataType.name}</MenuItem>)
    const channelTypesMenuItems = channelTypes.map((channelType) => <MenuItem value={channelType}>{channelType.name}</MenuItem>)
    const acquisitionMethodsMenuItems = acquisitionMethods.map((acquisitionMethod) => <MenuItem value={acquisitionMethod}>{acquisitionMethod.name}</MenuItem>)

    const registerServiceProfile = (serviceProfile) => {
        api.post("/organizations/"+organizationId+"/service-profiles", serviceProfile)
        .then((response)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Perfil de serviço cadastrado"}))
            handleNewServiceProfile(response.data)
        })
        .catch((error)=>{
            console.log(error)
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro ao cadastrar perfil de serviço"}))
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            serviceProfileId: data.get("serviceProfileId"),
            name: data.get("name"),
            dataType: dataType?.name,
            channelType: dataChannel?.name,
            channelParam: channelParam?.name,
            acquisition: acquisitionMethod?.name
        }
        console.log('payload', payload)
        registerServiceProfile(payload)    
    }


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="serviceProfileId"
                label="Identificador"
                name="serviceProfileId"
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
                    <InputLabel id="acquisitionMethod-select-label">Método de aquisição</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="acquisitionMethod"
                        name="acquisitionMethod"
                        value={acquisitionMethod}
                        labelId='acquisitionMethod-select-label'
                        onChange={handleChangeAcquisitionMethod}
                    >
                        {acquisitionMethodsMenuItems}
                    </Select>
                </Box>
            </Box>

            <Box sx={{display: 'flex'}}>
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

                {dataChannel.params.length?<Box sx={{marginRight: 5}}>
                    <InputLabel id="channelParam-select-label">{dataChannel.paramsType}</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="channelParam"
                        name="channelParam"
                        value={channelParam}
                        labelId='channelParam-select-label'
                        onChange={handleChangeChannelParam}
                    >
                        {dataChannel.params.map((channelParam) => {return (<MenuItem value={channelParam}>{channelParam.name}</MenuItem>)})}
                    </Select>
                </Box>:null}
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