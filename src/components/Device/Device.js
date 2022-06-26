import React, { useEffect, useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import DeviceForm from "./DeviceForm"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { useNavigate } from "react-router-dom"
import DeviceTable from "./DeviceTable"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import DialogForm from "../resources/DialogForm"

export default function Device(){
    const api = useAPI()
    const [organization, setOrganization] = useState(null)
    const auth = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [device, setDevice] = useState(null)

    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}

    const handlerEdit = (device) => {
        setOpen(true)
        setDevice(device)
    }
    const getOrganizations = () => {
        api.get('/organizations/'+ auth.user.organizations[0])
        .then((response)=>{
            const _organization = response.data
            if(_organization.applications.length > 0 & _organization.loraProfiles.length > 0){
                console.log("TUDO_OK", _organization)
                setOrganization(_organization)
            } 
            else if(! _organization.applications.length){
                dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma aplicação primeiro"}));
                navigate('/applications', {replace: true})    
            }
            else if(! _organization.loraProfiles.length){
                dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre um perfil LoRaWAN primeiro"}));
                navigate('/lorawan-profiles', {replace: true})
            }
            console.log("RESP", _organization)
        })
        .catch((err)=>{
            console.log("ERROR", err)
        })
    }

    useEffect( () => {
        if(!auth.user.organizations.length){
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma organização primeiro"}));
            navigate('/organizations', {replace: true})
        }else{
            console.log("GETTING ORGs...")
            getOrganizations()
        }  
    }, [])

    useEffect(()=>{
        console.log("device", device)
    })

 
    const handleNewDevice = (device) => {
        let _organization = {...organization}
        let applicationDevices = _organization.applications[0].devices
        let deviceIndex = applicationDevices.findIndex((dev) => {return dev._id===device._id})  
        if (deviceIndex > -1){
            applicationDevices.splice(deviceIndex, 1)
        }
        applicationDevices.push(device)
        setOrganization(_organization)
        handleClose()
    }

    const deviceFormProps = {
        organizationId : auth.user.organizations[0], 
        applicationId : organization?.applications[0]._id,
        handleNewDevice : handleNewDevice,
        loraProfiles : organization?.loraProfiles,
        serviceProfiles :organization?.serviceProfiles,
    }

    // Not loaded yet
    if(organization == null){
        return (<></>)
    }else if(organization.applications[0].devices.length){
            console.log('devices', organization.applications[0].devices)
            return (
                <div>
                    <DeviceTable devices={organization.applications[0].devices} handlerEdit={handlerEdit}/>
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
        return(
            <FormPaper title={"Cadastro de dispositivo"}>
                <DeviceForm {...deviceFormProps}></DeviceForm>
            </FormPaper>
        )
    }
}