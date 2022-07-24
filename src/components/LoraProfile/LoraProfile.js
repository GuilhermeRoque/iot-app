import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import LoraProfileForm from "./LoraProfileForm"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { useNavigate } from "react-router-dom"
import LoraProfileTable from "./LoraProfileTable"
import LoraProfileDialog from "./LoraProfileDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"

export default function LoraProfile(){
    const api = useAPI()
    const [organization, setOrganization] = React.useState(null)
    const auth = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}

    const getOrganizations = () => {
        console.log("GETTING ORG...")
        api.get('/organizations/'+ auth.user.organizations[0])
        .then((response)=>{
            console.log("ORG GOT...")
            const _organization = response.data
            setOrganization(_organization)
        })
        .catch((err)=>{console.log(err)})
    }

    React.useEffect( () => {
        if(!auth.user.organizations.length){
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma organização primeiro"}));
            navigate('/organizations', {replace: true})
        }else{
            getOrganizations()
        }  
    }, [])

 
    const handleNewLoraProfile = (loraProfile) => {
        const _organization = {...organization}
        _organization.loraProfiles.push(loraProfile)
        setOrganization(_organization)
        handleClose()
    }

    // Not loaded yet
    if(organization == null){
        return (<></>)
    }else if(organization.loraProfiles.length){
            return (
                <div>
                    <LoraProfileTable organizationName={organization.name} loraProfiles={organization.loraProfiles}/>
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}                
                        onClick={handleClickOpen}>
                        Novo Perfil LoRaWAN
                    </Button>
                    <LoraProfileDialog 
                        organizationId={auth.user.organizations[0]} 
                        handleNewLoraProfile={handleNewLoraProfile}
                        open={open}
                        handleClose={handleClose}
                        >
                    </LoraProfileDialog>
                </div>
  
            )
    }else{
        return(
            <FormPaper title={"Cadastre um perfil LoRaWAN"}>
                <LoraProfileForm organizationId={auth.user.organizations[0]} handleNewLoraProfile={handleNewLoraProfile}/>
            </FormPaper>
        )
    }
}