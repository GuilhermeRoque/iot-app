import React, { useEffect, useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import DeviceForm from "./DeviceForm"
import { useNavigate } from "react-router-dom"
import DeviceTable from "./DeviceTable"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import DialogForm from "../resources/DialogForm"
import { useSnackbar } from "../../context/snackbar-context";
import APIClient from "../../services/apiClient"
import { useOrganization } from '../../context/organization-context';
import { Box } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DeviceDialogChart from "./DeviceDialogChart"

export default function Device(){
    const api = useAPI()
    const auth = useAuth()
    const navigate = useNavigate()
    const toast = useSnackbar()

    const [openChart, setOpenChart] = useState(false)
    const handleCloseChart = () => {setOpenChart(false)}
    const handleOpenChart = () => {setOpenChart(true)}

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        setDevice(null)    
    }
    const handleClickOpen = () => {setOpen(true)}

    const OrganizationContext = useOrganization()  
    const currentOrganization = OrganizationContext.organization
    console.log("Current organization: ", currentOrganization)
  
    const [applications, setApplications] = React.useState([])
    const [currentApplication, setCurrentApplication] = React.useState('')
    const [loraProfiles, setLoraProfiles] = React.useState(null)
    const [serviceProfiles, setServiceProfiles] = React.useState(null)
    const [devices, setDevices] = useState(null)
    const [device, setDevice] = useState(null)
    const userOrganizations = auth?.user?.userOrganizations

    const handleChangeCurrentApplication = (event) =>{setCurrentApplication(event.target.value)}
    const applicationItems = applications.map(
        (application, index) => {
          return <MenuItem value={application._id} key={index}>{application.name}</MenuItem>
        }
    )

    const handlerEdit = (deviceIndex) => {
        setOpen(true)
        setDevice(devices[deviceIndex])
    }
    
    const handlerMonitor = (deviceIndex) => {
        setDevice(devices[deviceIndex])
        handleOpenChart()        
    }

    const handlerDelete = (deviceIndex) => {
        const deviceToDelete = devices[deviceIndex]
        const apiClient = new APIClient(api)
        apiClient.deleteDeivce(currentOrganization, currentApplication, deviceToDelete._id)
        .then(()=>{
            const newDevices = [...devices]
            newDevices.splice(deviceIndex, 1)
            setDevices(newDevices)
        })
        .catch(()=>{
            toast.start("Não foi possível remover o dispositivo", 'error')
        })
    }
    
    useEffect(() => {
        if(!userOrganizations){
            toast.start("Cadastre uma organização primeiro", 'info')
            navigate('/organizations', {replace: true})
            return
        }   
        if (!currentOrganization){
            return
        }
        console.log("There is organization")
        console.log(currentOrganization)

        const apiClient = new APIClient(api)
        apiClient.getOrganizationDeviceProfiles(currentOrganization)
            .then((data)=>{
                if (!data.applications.length){
                    toast.start("Cadastre uma aplicação primeiro", 'info')
                    navigate('/organizations/applications', {replace: true})
                    return
                }
                setApplications(data.applications)      
                setLoraProfiles(data.loraProfiles)
                setServiceProfiles(data.serviceProfiles)
            })
            .catch((error)=>{
                console.log(error)                
                toast.start("Não foi possível carregar os perfis de dispositivos", "error")
            })
    }, [currentOrganization, userOrganizations])

    useEffect(() => {
        if (!currentOrganization | !currentApplication){
            return
        }
        const apiClient = new APIClient(api)
        apiClient.getDevices(currentOrganization, currentApplication)

        .then((dataDevices)=>{
            setDevices(dataDevices)
        })
        .catch((error)=>{
            console.log(error)                
            toast.start("Não foi possível carregar os dispositivos cadastrados", "error")        
        })

    }, [currentApplication, currentOrganization])
 
    const handleNewDevice = (device) => {
        const newDevices = [...devices]
        let deviceIndex = newDevices.findIndex((dev) => {return dev._id===device._id})  
        if (deviceIndex > -1){
            newDevices.splice(deviceIndex, 1)
        }
        console.log("Adding device to list", device)
        newDevices.push(device)
        setDevices(newDevices)
        handleClose()
    }

    const deviceFormProps = {
        organizationId : currentOrganization, 
        applicationId : currentApplication,
        handleNewDevice : handleNewDevice,
        loraProfiles : loraProfiles,
        serviceProfiles :serviceProfiles,
    }

    const currentAppSelect = (
        <Box>
            <InputLabel id="application-select-label">Aplicação</InputLabel>
            <Select
                id="currentApplication"
                name="currentApplication"
                value={currentApplication}
                labelId='currentApplication-select-label'
                onChange={handleChangeCurrentApplication}
            >
                {applicationItems}
            </Select>
        </Box>
    )
    const selectApplicationWarning = (
        <Box sx={{width: "100%", height: "500px"}}> 
            <Box sx={{width: "100%", display:"flex"}}>    
                <Box sx={{width: "fit-content", margin: "auto"}}>
                    <Alert severity="info"><AlertTitle>Aplicação não definida</AlertTitle>Selecione uma aplicação no seletor do canto superior esquerdo</Alert>
                </Box>                        
            </Box>
        </Box>
    )
    // Not loaded yet
    if(devices == null){
        return (
            <>
                 {currentAppSelect}
                 <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                 {selectApplicationWarning}        
            </>
        )
    }else if(devices.length){
            console.log("devices:::: ", devices)
            return (
                <>
                    {currentAppSelect}
                    <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                    <Box sx={{width: "fit-content", margin: "auto"}}>
                        <DeviceTable devices={devices} handlerEdit={handlerEdit} handlerDelete={handlerDelete} handlerMonitor={handlerMonitor}/>
                        <Button 
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}                
                            onClick={handleClickOpen}>
                            Cadastrar
                        </Button>
                    </Box>
                    <DialogForm
                        title={"Cadastro de dispositivo"}
                        helpText={"Especifique os perfis de configuração e identificadores do dispositivo"}
                        open={open}
                        handleClose={handleClose}
                    >   
                        <DeviceForm {...deviceFormProps} device={device} ></DeviceForm>
                    </DialogForm>
                    <DeviceDialogChart
                        open={openChart}
                        handleClose={handleCloseChart}
                        device={device}
                    >   
                    </DeviceDialogChart>

                </>
  
            )
    }else{
        console.log("Returning first form", deviceFormProps)
        return(
            <>
                {currentAppSelect}
                <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                <Box sx={{width: "fit-content", margin: "auto"}}>
                    <FormPaper title={"Cadastro de dispositivo"}>
                        <DeviceForm {...deviceFormProps}></DeviceForm>
                    </FormPaper>
                </Box>
            </>
        )
    }
}
