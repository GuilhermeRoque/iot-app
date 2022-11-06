// import * as React from 'react';
// import { useAuth } from './auth-context';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from './snackbar-context';
// import { Box, Container } from '@mui/material';
// import { Select } from '@mui/material';
// import { MenuItem } from '@mui/material';
// import { InputLabel } from '@mui/material';
// import { useOrganization } from './organization-context';
// import useAPI from '../../services/useAPI';

// const ApplicationContext = React.createContext({
//     application:null,
// });

// const useApplication = () => {
//     return React.useContext(ApplicationContext);
// };  

// const ApplicationProvider = ({children}) => {
//     const [applications, setApplications] = React.useState(null);    
//     const [currentApplication, setCurrentApplication] = React.useState(null);
 
//     const OrganizationContext = useOrganization()  
//     const currentOrganization = OrganizationContext.organization
//     const toast = useSnackbar()
//     const api = useAPI()


//     React.useEffect(() => {
//         if (currentOrganization){
//           const apiClient = new APIClient(api)
//           apiClient.getApplications(currentOrganization.organizationId)
//             .then((newApplications)=>{setApplications(newApplications)})
//             .catch((error)=>{
//               console.log('error', error)
//               toast.start("Não possível carregar as aplicações cadastradas")
//             })  
//         }
//       }, [currentOrganization])
      
//     return (
//         <ApplicationContext.Provider value={value}>
//             <Box>
//                 <Box paddingTop={2} paddingBottom={2}>
//                 <InputLabel id="organization-select-label">Organização</InputLabel>
//                 <Select
//                     id="currentOrganization"
//                     name="currentOrganization"
//                     value={organizationValue}
//                     labelId='currentOrganization-select-label'
//                     onChange={handleChangeCurrentOrganization}
//                 >
//                     {organizationsItems}
//                 </Select>
//                 </Box>
//                 {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
//                     {organization?children:<h1>^ Selecione uma organização</h1>}
//                 {/* </Container> */}
//             </Box>
//         </ApplicationContext.Provider>
//     )
// } 
// export {OrganizationContext, useOrganization, OrganizationProvider}