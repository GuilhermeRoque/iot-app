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

export default function Device(){
    console.log("DEVICE")
    const api = useAPI()
    const auth = useAuth()
    const navigate = useNavigate()
    const toast = useSnackbar()
    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}
    const OrganizationContext = useOrganization()  
    const currentOrganization = OrganizationContext.organization
    console.log("Current organization: ", currentOrganization)
  
    const [applications, setApplications] = React.useState(null)
    const [loraProfiles, setLoraProfiles] = React.useState(null)
    const [serviceProfiles, setServiceProfiles] = React.useState(null)
    const [devices, setDevices] = useState(null)
    const [device, setDevice] = useState(null)
    const userOrganizations = auth?.user?.userOrganizations

    const handlerEdit = (device) => {
        setOpen(true)
        setDevice(device)
    }

    useEffect(() => {
        if(!userOrganizations){
            toast.start("Cadastre uma organização primeiro", 'warning')
            navigate('/organizations', {replace: true})
            return
        }   
        if (!currentOrganization){
            return
        }
        console.log("There is organization")
        const apiClient = new APIClient(api)
        apiClient.getOrganizationDeviceProfiles(currentOrganization)
            .then((data)=>{
                setApplications(data.applications)      
                setLoraProfiles(data.loraProfiles)
                setServiceProfiles(data.serviceProfiles)
                apiClient.getDevices(currentOrganization, data.applications[0]._id)
                    .then((dataDevices)=>{
                        setDevices(dataDevices)
                    })
                    .catch((error)=>{
                        console.log(error)                
                        toast.start("Não foi possível carregar os dispositivos cadastrados", "error")        
                    })
            })
            .catch((error)=>{
                console.log(error)                
                toast.start("Não foi possível carregar os perfis de dispositivos", "error")
            })
    }, [currentOrganization, userOrganizations])
 
    const handleNewDevice = (device) => {
        const newDevices = [...devices]
        let deviceIndex = newDevices.findIndex((dev) => {return dev._id===device._id})  
        if (deviceIndex > -1){
            newDevices.splice(deviceIndex, 1)
        }
        newDevices.push(newDevices)
        setDevices(newDevices)
        handleClose()
    }

    const deviceFormProps = {
        organizationId : currentOrganization, 
        applicationId : applications?applications[0]._id:null,
        handleNewDevice : handleNewDevice,
        loraProfiles : loraProfiles,
        serviceProfiles :serviceProfiles,
    }

    // Not loaded yet
    if(devices == null){
        return (<></>)
    }else if(devices.length){
            return (
                <div>
                    <DeviceTable devices={devices} handlerEdit={handlerEdit}/>
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}                
                        onClick={handleClickOpen}>
                        Novo dispositivo
                    </Button>
                    <DialogForm
                        title={"Cadastro de dispositivo"}
                        helpText={"Especifique os perfis de configuração e identificadores do dispositivo"}
                        open={open}
                        handleClose={handleClose}
                    >   
                        <DeviceForm {...deviceFormProps} device={device} ></DeviceForm>
                    </DialogForm>
                </div>
  
            )
    }else{
        console.log("Returning first form", deviceFormProps)
        return(
            <FormPaper title={"Cadastro de dispositivo"}>
                <DeviceForm {...deviceFormProps}></DeviceForm>
            </FormPaper>
        )
    }
}