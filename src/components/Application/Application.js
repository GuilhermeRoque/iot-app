import * as React from 'react';
import ApplicationTable from './ApplicationTable';
import ApplicationForm from './ApplicationForm';
import useAPI from '../../services/useAPI';

import { useSnackbar } from '../../context/snackbar-context';
import FormPaper from '../resources/FormPaper';
import APIClient from '../../services/apiClient';
import { useOrganization } from '../../context/organization-context';

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
        <ApplicationTable applications={applications}/>
    )
  }else{  
    return (
        <FormPaper title={"Cadastre uma aplicação"}> 
          <ApplicationForm handleNewApplication={handleNewApplication}/>
        </FormPaper>
    )
  }
}
