import React, { useState } from "react"
import useAPI from "../../services/useAPI"
import OrganizationChildTable from "./OrganizationChildTable"
import OrganizationChildDialog from "./OrganizationChildDialog"
import { Button } from "@mui/material"
import FormPaper from "../resources/FormPaper"
import { useSnackbar } from "../../context/snackbar-context"
import { useOrganization } from '../../context/organization-context';
import APIClient from '../../services/apiClient';
import { Box } from '@mui/material';

export default function OrganizationChild({apiPath, valueMapper, labelMapper, Form, titleTable, titleRegisterForm}){
    const api = useAPI()
    const [data, setData] = React.useState(null)
    const [currentData, setCurrentData] = React.useState(null)
    const toast = useSnackbar()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setCurrentData(null)
        setOpen(false)
    }
    const handleClickOpen = () => {setOpen(true)}
    const OrganizationContext = useOrganization()  
    const currentOrganization = OrganizationContext.organization
    console.log("Current organization: ", currentOrganization)
  

    React.useEffect( () => {
        if(currentOrganization){
            const apiClient = new APIClient(api)
            apiClient.getOrganizationChildData(currentOrganization, apiPath)
                .then((newData)=>{
                    setData(newData)
                })
                .catch((error)=>{
                    console.log('error', error)
                    toast.start("Não possível carregar os dados", "error")          
                })
        }
    }, [currentOrganization])

 
    const handleCreate = (singleData) => {
        const apiClient = new APIClient(api)
        apiClient.createOrganizationChildData(currentOrganization, apiPath, singleData)
            .then((respData)=>{
                const newData = [...data]
                newData.push(respData)
                setData(newData)
                handleClose()        
            })
            .catch((error)=>{
                console.log('error', error)
                toast.start("Não possível adicionar o dado", "error")          
            })
    }

    const handleUpdate = (singleData) => {
        const apiClient = new APIClient(api)
        apiClient.updateOrganizationChildData(currentOrganization, apiPath, singleData, singleData._id)
            .then((respData)=>{
                const newData = [...data]
                const index = newData.findIndex(d => {return d._id===singleData._id})
                newData.splice(index, 1)
                newData.push(respData)
                setData(newData)
                handleClose()        
            })
            .catch((error)=>{
                console.log('error', error)
                toast.start("Não possível atualizar o dado", "error")          
            })
    }

    const handleDelete=(index)=>{
        const idToDelete = data[index]._id
        const apiClient = new APIClient(api)
        apiClient.deleteOrganizationChildData(currentOrganization, apiPath, idToDelete)
            .then(()=>{
                const newData = [...data]
                newData.splice(index, 1)
                setData(newData)
            })
            .catch((error)=>{
                console.log('error', error)
                toast.start("Não possível remover o dado", "error")          

            })

    }

    const handleEdit=(index)=>{
        const dataToEdit = {...data[index]}
        console.log("dataToEdit", dataToEdit)
        setCurrentData(dataToEdit)
        setOpen(true)
    }

    // Not loaded yet
    if(data == null){
        return (<></>)
    }
    else if(data.length){
            return (
                <>
                    <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                    <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
                        <OrganizationChildTable 
                            data={data} 
                            handlerEdit={handleEdit} 
                            handlerDelete={handleDelete} 
                            labelMapper={labelMapper} 
                            valueMapper={valueMapper}
                            title={titleTable}
                        />
                        <Button 
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}                
                            onClick={handleClickOpen}>
                            Cadastrar
                        </Button>
                        <OrganizationChildDialog 
                            Form={Form}
                            currentData={currentData}
                            open={open}
                            handleNewData={currentData?handleUpdate:handleCreate}
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
            <FormPaper title={titleRegisterForm}>
                    <Form handleNewData={currentData?handleUpdate:handleCreate}/>
            </FormPaper>
            </Box>
            </>
        )
    }
}