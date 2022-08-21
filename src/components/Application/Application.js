import * as React from 'react';
import { useAuth } from '../../context/auth-context';
import ApplicationTable from './ApplicationTable';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import useAPI from '../../services/useAPI';
import { useSnackbar } from '../../context/snackbar-context';

export default function Application() {
  const api = useAPI()
  const auth = useAuth();
  let navigate = useNavigate();
  const [applications, setApplications] = React.useState(null)
  const toast = useSnackbar()

  const getApplications = () => {
    const firstOrganizationId = auth.user.userOrganizations[0].organizationId
    api.get('/organizations/'+ firstOrganizationId +'/applications')
      .then((response)=>{
          setApplications(response.data)
        })
      .catch((err)=>{
          console.log(err)
        })
  }
  const handleNewApplication = (newApplication) => {
    const oldApplications = [...applications]
    oldApplications.push(newApplication)
    setApplications(oldApplications)
  }

  React.useEffect( () => {
    if(!auth.user.userOrganizations.length){
      toast.start("Cadastre uma organização primeiro", 'warning')
      navigate('/organizations', {replace: true})
    }else{
      getApplications()
    }  
  }, [])

  if(applications == null){
    return <></>
  }else if (applications.length){
    return <ApplicationTable applications={applications}/>
  }else{  
    return <ApplicationForm handleNewApplication={handleNewApplication}/>
  }
}
