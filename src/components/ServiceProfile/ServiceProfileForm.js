import { 
    Box, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem,
} from "@mui/material"
import React from "react"
import { acquisitionMethods, channelTypes, dataTypes, channelTypesValueMapObject } from "./serviceProfileData"

export default function ServiceProfileForm({handleNewData, currentData}){

    const [dataType, setDataType] = React.useState(currentData?currentData.dataType:dataTypes[0].value)
    const [dataChannel, setDataChannel] = React.useState(currentData?currentData.channelType:channelTypes[0].value)
    const [acquisitionMethod, setAcquisitionMethod] = React.useState(currentData?currentData.acquisition:acquisitionMethods[0].value)
    const [channelParam, setChannelParam] = React.useState(currentData?currentData.channelParam:'')
    
    const handleChangeChannelParam = (event) =>{setChannelParam(event.target.value)}
    const handleChangeDataType = (event) =>{setDataType(event.target.value)}
    const handleChangeDataChannel = (event) =>{
        const channel = event.target.value
        setDataChannel(channel)
        setChannelParam(channel.params.length?channel.params[0].value:'')
    }
    const handleChangeAcquisitionMethod = (event) =>{setAcquisitionMethod(event.target.value)}
    const dataTypesMenuItems = dataTypes.map((dataType, index) => <MenuItem value={dataType.value} key={index}>{dataType.name}</MenuItem>)
    const channelTypesMenuItems = channelTypes.map((channelType, index) => <MenuItem value={channelType.value} key={index}>{channelType.name}</MenuItem>)
    const acquisitionMethodsMenuItems = acquisitionMethods.map((acquisitionMethod, index) => <MenuItem value={acquisitionMethod.value} key={index}>{acquisitionMethod.name}</MenuItem>)


    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const payload = {
            name: data.get("name"),
            description: data.get("description"),
            dataType: dataType,
            channelType: dataChannel,
            channelParam: channelParam,
            acquisition: acquisitionMethod,
            period: data.get('period')
        }
        handleNewData(currentData?{...currentData, ...payload} : payload)    
    }

    const channelParams = channelTypesValueMapObject.get(dataChannel)
    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
                margin="normal"
                required
                name="name"
                label="Nome"
                fullWidth
                id="name"
                defaultValue={currentData?currentData.name:''}
            />
            <TextField
                margin="normal"
                name="description"
                label="Descrição"
                fullWidth
                id="description"
                defaultValue={currentData?currentData.description:''}
            />
            <TextField
                margin="normal"
                required
                name="period"
                type="number"
                label="Período (s)"
                fullWidth
                defaultValue={currentData?currentData.period:''}
                id="period"
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

                {channelParams?.params.length?<Box sx={{marginRight: 5}}>
                    <InputLabel id="channelParam-select-label">{channelParams.paramsType.name}</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="channelParam"
                        name="channelParam"
                        value={channelParam}
                        labelId='channelParam-select-label'
                        onChange={handleChangeChannelParam}
                    >
                        {channelParams.params.map((channelParam) => {return (<MenuItem value={channelParam.value}>{channelParam.name}</MenuItem>)})}
                    </Select>
                </Box>:null}
            </Box>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            {currentData?"Atualizar":"Cadastrar"}
            </Button>
        </Box>
    )
}