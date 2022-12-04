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
import { loraWanVersions, loraPhyVersions } from "./loraModelOptions"
import ttn_freq_plans from "./ttn_freq_plans"

export default function LoraProfileForm({handleNewData, currentData}){

    console.log("currentData", currentData)
    console.log("loraWanVersions[0].value", loraWanVersions[0].value)

    const [loraWanVersion, setLoraWanVersion] = React.useState(currentData?currentData.macVersion:loraWanVersions[0].value)
    const [loraFreqPlan, setLoraFreqPlan] = React.useState(currentData?currentData.freqPlanId:"EU_863_870")
    const [loraPhyVersion, setLoraPhyVersion] = React.useState(currentData?currentData.phyVersion:loraPhyVersions[0].value)
    const handleChangeLoraWanVersion = (event) =>{setLoraWanVersion(event.target.value)}
    const handleChangeLoraFreqPlan = (event) =>{setLoraFreqPlan(event.target.value)}
    const handleChangeLoraPhyVersion = (event) =>{setLoraPhyVersion(event.target.value)}
    const loraWanVersionsMenuItems = loraWanVersions.map((loraWanVersion, index) => <MenuItem value={loraWanVersion.value} key={index}>{loraWanVersion.name}</MenuItem>)
    const frequencyPlansMenuItems = ttn_freq_plans.map((freqPlan, index) => <MenuItem value={freqPlan['id']}  key={index}>{freqPlan['name']}</MenuItem>)
    const loraPhyVersionsMenuItems = loraPhyVersions.map((loraPhyVersion, index) => <MenuItem value={loraPhyVersion.value} key={index}>{loraPhyVersion.name}</MenuItem>)


    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            name: data.get("name"),
            description: data.get("description"),
            macVersion: data.get("loraWanVersion"),
            phyVersion: data.get("loraPhyVersion"),
            freqPlanId: data.get("loraFreqPlan"),
            isClassB: data.get("isClassB") !== null,
            isClassC: data.get("isClassC") !== null,
            isOTAA: true,

        }
        handleNewData(currentData?{...currentData, ...payload}:payload)    
    }


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
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
                name="description"
                label="Descrição"
                fullWidth
                id="description"
                defaultValue={currentData?currentData.description:""}
            />
            <Box sx={{display: 'flex'}}>
                <FormControlLabel control={<Checkbox name="isClassB" defaultChecked={currentData?currentData.isClassB:false}/>} label="Classe B" />
                <FormControlLabel control={<Checkbox name="isClassC" defaultChecked={currentData?currentData.isClassC:false}/>} label="Classe C" />            
            </Box>
            <FormControlLabel disabled checked control={<Checkbox name="isOTAA"/>} label="OTAA" />
            <Box sx={{display: 'flex'}}>
                <Box sx={{marginRight: 5}}>
                    <InputLabel id="loraWanVersion-select-label">MAC LoRaWAN</InputLabel>
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
                    <InputLabel id="loraPhyVersion-select-label">PHY LoRa</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="loraPhyVersion"
                        name="loraPhyVersion"
                        value={loraPhyVersion}
                        labelId='loraPhyVersion-select-label'
                        onChange={handleChangeLoraPhyVersion}
                    >
                        {loraPhyVersionsMenuItems}
                    </Select>
                </Box>
            </Box>
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