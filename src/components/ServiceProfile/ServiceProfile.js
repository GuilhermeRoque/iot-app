import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import ServiceProfileForm from "./ServiceProfileForm"
import { useNavigate } from "react-router-dom"
import ServiceProfileTable from "./ServiceProfileTable"
import ServiceProfileDialog from "./ServiceProfileDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import { useSnackbar } from "../../context/snackbar-context"
import { useOrganization } from '../../context/organization-context';
import APIClient from '../../services/apiClient';
import { Box, Container } from '@mui/material';

export default function ServiceProfile(){
    const api = useAPI()
    const [serviceProfiles, setServiceProfiles] = React.useState(null)
    const navigate = useNavigate()
    const toast = useSnackbar()
    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}
    const OrganizationContext = useOrganization()  
    const currentOrganization = OrganizationContext.organization
    console.log("Current organization: ", currentOrganization)
  

    React.useEffect( () => {
        if(currentOrganization){
            const apiClient = new APIClient(api)
            apiClient.getServiceProfiles(currentOrganization)
                .then((newServiceProfiles)=>{
                    setServiceProfiles(newServiceProfiles)
                })
                .catch((error)=>{
                    console.log('error', error)
                    toast.start("Não possível carregar os perfis de serviço cadastrados")          
                })
            // toast.start("Cadastre uma organização primeiro", 'warning')
            // navigate('/organizations', {replace: true})
        }else{
        }  
    }, [currentOrganization])

 
    const handleNewServiceProfile = (serviceProfile) => {
        const newServiceProfiles = [...serviceProfiles]
        newServiceProfiles.push(serviceProfile)
        setServiceProfiles(newServiceProfiles)
        handleClose()
    }

    const handleEdit=()=>{}
    const handleDelete=()=>{}

    // Not loaded yet
    if(serviceProfiles == null){
        return (<></>)
    }
    else if(serviceProfiles.length){
            return (
                <>
                    <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                    <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
                        <ServiceProfileTable serviceProfiles={serviceProfiles} handlerEdit={handleEdit} handlerDelete={handleDelete}/>
                        <Button 
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}                
                            onClick={handleClickOpen}>
                            Cadastrar
                        </Button>
                        <ServiceProfileDialog 
                            organizationId={currentOrganization} 
                            handleNewServiceProfile={handleNewServiceProfile}
                            open={open}
                            handleClose={handleClose}
                            >
                        </ServiceProfileDialog>                    
                    </Box>
                </>
            )
    }
    else{
        return(
            <>
            <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
            <Box sx={{width: "fit-content", margin: "auto"}}>
            <FormPaper title={"Cadastre um perfil de serviço"}>
                    <ServiceProfileForm organizationId={currentOrganization} handleNewServiceProfile={handleNewServiceProfile}/>
            </FormPaper>
            </Box>
            </>
        )
    }
}