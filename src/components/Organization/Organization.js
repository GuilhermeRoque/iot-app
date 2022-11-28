import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import { CircularProgress } from "@mui/material";
import useAPI from "../../services/useAPI";
import OrganizationForm from "./OrganizationForm";
import OrganizationTable from "./OrganizationTable";
import APIClient from "../../services/apiClient";
import { Container } from "@mui/material";
import OrganizationDialog from "./OrganizationDialog"
import FormPaper from "../resources/FormPaper"

export default function Organization() {
  const [organizations, setOrganizations] = useState(null)

  const api = useAPI()
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };
 

  const handleNewOrganization = (newOrganization, newAccessToken) => {
    const newUser = {...auth.user}
    newUser.token = newAccessToken
    
    newUser.userOrganizations.push({
      organizationId: newOrganization._id,
      organizationName: newOrganization.name,
      role: newOrganization.members[0].role,
      status: newOrganization.members[0].status
    })

    auth.signin(newUser)
    const newOrganizations = [...organizations]
    newOrganizations.push(newOrganization)
    setOrganizations(newOrganizations)
  }

  useEffect(() => {
    const apiClient = new APIClient(api)
    apiClient.getOrganizations()
      .then((newOrganizations)=>setOrganizations(newOrganizations))
      .catch((error)=>{console.log("Erro ao carregar dados", error)})    
  }, [api])

  if (organizations == null){
    console.log("None organization, rendering circular progress..")
    return(
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>    
    )
  }else{
    if(organizations.length){
      return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, marginTop: "80px" }}>
          <OrganizationTable organizations={organizations} user={auth.user}/>
          <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}                
            onClick={handleClickOpen}>
            Cadastrar
          </Button>
          <OrganizationDialog 
            open={open} 
            handleClose={handleClose} 
            handleNewOrganization={handleNewOrganization}
            >
          </OrganizationDialog>                  
        </Container>
      )
      }else{
        return(
          <>
            <Box sx={{flexBasis:"100%", height: "60px"}}></Box>
            <Box sx={{width: "fit-content", margin: "auto"}}>
            <FormPaper title={"Cadastre uma Organização"}>
              <OrganizationForm handleNewOrganization={handleNewOrganization}/>
            </FormPaper>
            </Box>
         </>
        )
    }
  }
}