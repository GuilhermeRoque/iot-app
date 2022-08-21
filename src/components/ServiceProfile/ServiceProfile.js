import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import ServiceProfileForm from "./ServiceProfileForm"
import { useNavigate } from "react-router-dom"
import ServiceProfileTable from "./ServiceProfileTable"
import ServiceProfileDialog from "./ServiceProfileDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import { useSnackbar } from "../../context/snackbar-context"

export default function ServiceProfile(){
    const api = useAPI()
    const [organization, setOrganization] = React.useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const toast = useSnackbar()
    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}

    const getOrganizations = () => {
        api.get('/organizations/'+ auth.user.organizations[0])
        .then((response)=>{
            const _organization = response.data
            setOrganization(_organization)
        })
        .catch((err)=>{console.log(err)})
    }

    React.useEffect( () => {
        if(!auth.user.organizations.length){
            toast.start("Cadastre uma organização primeiro", 'warning')
            navigate('/organizations', {replace: true})
        }else{
            getOrganizations()
        }  
    }, [])

 
    const handleNewServiceProfile = (serviceProfile) => {
        const _organization = {...organization}
        _organization.serviceProfiles.push(serviceProfile)
        setOrganization(_organization)
        handleClose()
    }

    // Not loaded yet
    if(organization == null){
        return (<></>)
    }
    else if(organization.serviceProfiles.length){
            return (
                <div>
                    <ServiceProfileTable organizationName={organization.name} serviceProfiles={organization.serviceProfiles}/>
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}                
                        onClick={handleClickOpen}>
                        Novo Perfil de Serviço
                    </Button>
                    <ServiceProfileDialog 
                        organizationId={auth.user.organizations[0]} 
                        handleNewServiceProfile={handleNewServiceProfile}
                        open={open}
                        handleClose={handleClose}
                        >
                    </ServiceProfileDialog>
                </div>
  
            )
    }
    else{
        return(
            <FormPaper title={"Cadastre um perfil de serviço"}>
                    <ServiceProfileForm organizationId={auth.user.organizations[0]} handleNewServiceProfile={handleNewServiceProfile}/>
            </FormPaper>
        )
    }
}