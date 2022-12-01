import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import { useNavigate } from "react-router-dom"
import OrganizationChildTable from "./OrganizationChildTable"
import OrganizationChildDialog from "./OrganizationChildDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import { useSnackbar } from "../../context/snackbar-context"
import { useOrganization } from '../../context/organization-context';
import APIClient from '../../services/apiClient';
import { Box, Container } from '@mui/material';

export default function OrganizationChild({apiPath, tableMapper, Form}){
    const api = useAPI()
    const [data, setData] = React.useState(null)
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
            apiClient.getOrganizationChildData(currentOrganization, path)
                .then((newData)=>{
                    setData(newData)
                })
                .catch((error)=>{
                    console.log('error', error)
                    toast.start("Não possível carregar os dados")          
                })
        }
    }, [currentOrganization])

 
    const handleNewData = (singleData) => {
        const newData = [...data]
        newData.push(singleData)
        setNewData(newData)
        handleClose()
    }

    const handleEdit=()=>{}
    const handleDelete=()=>{}

    // Not loaded yet
    if(data == null){
        return (<></>)
    }
    else if(data.length){
            return (
                <>
                    <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                    <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
                        <OrganizationChildTable data={data} handlerEdit={handleEdit} handlerDelete={handleDelete} mapper={tableMapper}/>
                        <Button 
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}                
                            onClick={handleClickOpen}>
                            Cadastrar
                        </Button>
                        <OrganizationChildDialog 
                            organizationId={currentOrganization} 
                            handleNewData={handleNewData}
                            Form={Form}
                            open={open}
                            handleClose={handleClose}
                            >
                        </OrganizationChildDialog>                    
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
                    <Form organizationId={currentOrganization} handleNewData={handleNewData}/>
            </FormPaper>
            </Box>
            </>
        )
    }
}