import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useAuth } from "../../context/auth-context"
import LoraProfileForm from "./LoraProfileForm"
import { useNavigate } from "react-router-dom"
import LoraProfileTable from "./LoraProfileTable"
import LoraProfileDialog from "./LoraProfileDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import { useSnackbar } from "../../context/snackbar-context";
import APIClient from "../../services/apiClient"
import { useOrganization } from '../../context/organization-context';
import { Box, Container } from '@mui/material';

export default function LoraProfile(){
    const api = useAPI()
    const [loraWANProfiles, setLoraWANProfiles] = React.useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const OrganizationContext = useOrganization()  
    const currentOrganization = OrganizationContext.organization
    console.log("Current organization: ", currentOrganization)

    const [open, setOpen] = useState(false)
    const handleClose = () => {setOpen(false)}
    const handleClickOpen = () => {setOpen(true)}

    const toast = useSnackbar()
    const userOrganizations = auth?.user?.userOrganizations

    React.useEffect( () => {
        const apiClient = new APIClient(api)
        if(!userOrganizations){
            toast.start("Cadastre uma organização primeiro", 'warning')
            navigate('/organizations', {replace: true})
        }else{
            if (currentOrganization){
                apiClient.getLoraProfiles(currentOrganization)
                .then((data) => {
                    setLoraWANProfiles(data)
                })
                .catch((error)=>{
                    console.log(error)
                    toast.start("Não foi possível carregador os dados", "error")
                })
            }
        }  
    }, [api, toast, navigate, currentOrganization])

 
    const handleNewLoraProfile = (loraProfile) => {
        const newloraWANProfiles = [...loraWANProfiles]
        newloraWANProfiles.push(loraProfile)
        setLoraWANProfiles(newloraWANProfiles)
        handleClose()
    }

    // Not loaded yet
    if(loraWANProfiles == null){
        return (<></>)
    }else if(loraWANProfiles.length){
            return (
                <>
                    <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                    <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
                        <LoraProfileTable loraProfiles={loraWANProfiles}/>
                        <Button 
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}                
                            onClick={handleClickOpen}>
                            Cadastrar
                        </Button>
                        <LoraProfileDialog 
                            organizationId={currentOrganization} 
                            handleNewLoraProfile={handleNewLoraProfile}
                            open={open}
                            handleClose={handleClose}
                            >
                        </LoraProfileDialog>
                    </Box>
                </>
  
            )
    }else{
        return(
            <>
                <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                <Box sx={{width: "fit-content", margin: "auto"}}>
                <FormPaper title={"Cadastre um perfil LoRaWAN"}>
                    <LoraProfileForm organizationId={currentOrganization} handleNewLoraProfile={handleNewLoraProfile}/>
                </FormPaper>
                </Box>
            </>
        )
    }
}