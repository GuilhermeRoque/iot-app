import * as React from 'react';
import ApplicationTable from './ApplicationTable';
import ApplicationForm from './ApplicationForm';
import useAPI from '../../services/useAPI';

import { useSnackbar } from '../../context/snackbar-context';
import FormPaper from '../resources/FormPaper';
import APIClient from '../../services/apiClient';
import { useOrganization } from '../../context/organization-context';
import { Box, Container } from '@mui/material';

export default function Application() {
  const api = useAPI()
  const [applications, setApplications] = React.useState(null)
  const toast = useSnackbar()
  const OrganizationContext = useOrganization()  
  const currentOrganization = OrganizationContext.organization
  console.log("Current organization: ", currentOrganization)

  const handleNewApplication = (newApplication) => {
    const oldApplications = [...applications]
    oldApplications.push(newApplication)
    setApplications(oldApplications)
  }


  React.useEffect(() => {
    if (currentOrganization){
      const apiClient = new APIClient(api)
      apiClient.getApplications(currentOrganization)
        .then((newApplications)=>{setApplications(newApplications)})
        .catch((error)=>{
          console.log('error', error)
          toast.start("Não possível carregar as aplicações cadastradas")
        })  
    }
  }, [currentOrganization])

  if(applications == null){
    return (
      <></>
    )
  }else if (applications.length){
    return (
      <>
          <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
          <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
            <ApplicationTable applications={applications}/>
          </Box>
      </>
    )
  }else{  
    return (
      <>
          <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
          <Box sx={{width: "fit-content", margin: "auto"}}>
            <FormPaper title={"Cadastre uma aplicação"}> 
              <ApplicationForm handleNewApplication={handleNewApplication}/>
            </FormPaper>
          </Box>
      </>
    )
  }
}
