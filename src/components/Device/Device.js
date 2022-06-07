import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import DeviceForm from "./DeviceForm"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { useNavigate } from "react-router-dom"
import DeviceTable from "./DeviceTable"
import DeviceDialog from "./DeviceDialog"
import { Button, Typography } from "@mui/material"

export default function Device(){
    const api = useAPI()
    const [application, setApplication] = React.useState(null)
    const auth = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}

    const getOrganizations = () => {
        api.get('/organizations/'+ auth.user.organizations[0])
        .then((response)=>{
            const organization = response.data
            if (!organization.applications.length){
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma aplicação primeiro"}));
            navigate('/applications', {replace: true})    
            }else{
                setApplication(organization.applications[0])
            }
        })
        .catch((err)=>{
            console.log(err)
            })
    }

    React.useEffect( () => {
        if(!auth.user.organizations.length){
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma organização primeiro"}));
            navigate('/organizations', {replace: true})
        }else{
            getOrganizations()
        }  
    }, [])

 
    const handleNewDevice = (device) => {
        const applicationCopy = {...application}
        applicationCopy.devices.push(device)
        setApplication(applicationCopy)
    }

    // Not loaded yet
    if(application == null){
        return (<></>)
    }else if(application.devices.length){
            return (
                <div>
                    <DeviceTable application={application}/>
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}                
                        onClick={handleClickOpen}>
                        Novo dispositivo
                    </Button>
                    <DeviceDialog 
                        organizationId={auth.user.organizations[0]} 
                        applicationId={application._id} 
                        handleNewDevice={handleNewDevice}
                        open={open}
                        handleClose={handleClose}
                        >
                    </DeviceDialog>
                </div>
  
            )
    }else{
        return(
            <div>
                <Typography component="h1" variant="h5">
                Cadastre um dispositivo
                </Typography>    
                <DeviceForm organizationId={auth.user.organizations[0]} applicationId={application._id} handleNewDevice={handleNewDevice}/>
            </div>
        )
    }
}