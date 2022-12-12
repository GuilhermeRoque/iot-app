import * as React from 'react';
import { useAuth } from './auth-context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from './snackbar-context';
import { Box } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const OrganizationContext = React.createContext({
    organization:null,
});

const useOrganization = () => {
    return React.useContext(OrganizationContext);
};  

const OrganizationProvider = ({children}) => {
    const [organization, setOrganization] = React.useState(null);    
    const auth = useAuth();
    let navigate = useNavigate();
    const toast = useSnackbar()
    const userOrganizations = auth.user.userOrganizations   
    const organizationsItems = userOrganizations.map(
        (userOrganization, index) => {
          return <MenuItem value={userOrganization.organizationId} key={index}>{userOrganization.organizationName}</MenuItem>
        }
    )
    const handleChangeCurrentOrganization = (event) =>{setOrganization(event.target.value)}
    const value={organization, setOrganization, handleChangeCurrentOrganization}
    const organizationValue = organization?organization:""

    React.useEffect(()=>{
        if (!userOrganizations.length){
            toast.start("Cadastre uma organização primeiro", "info")
            navigate("/organizations")
        }
    },[userOrganizations, navigate, toast])

    const selectOrganizationWarning = (
        <Box sx={{width: "100%", height: "500px"}}> 
            <Box sx={{width: "100%", display:"flex"}}>    
                <Box sx={{width: "fit-content", margin: "auto"}}>
                    <Alert severity="info"><AlertTitle>Organização não definida</AlertTitle>Selecione uma organização no seletor do canto superior esquerdo</Alert>
                </Box>                        
            </Box>
        </Box>
    )
    return (
        <OrganizationContext.Provider value={value}>
            <Box>
                <Box paddingTop={2} paddingBottom={2}>
                    <Box sx={{display: 'flex', flexWrap: "wrap"}}>
                        <Box sx={{marginRight: "15px"}}>
                            <InputLabel id="organization-select-label">Organização</InputLabel>
                            <Select
                                id="currentOrganization"
                                name="currentOrganization"
                                value={organizationValue}
                                labelId='currentOrganization-select-label'
                                onChange={handleChangeCurrentOrganization}
                            >
                                {organizationsItems}
                            </Select>
                        </Box>
                        {organization?<></>:<Box sx={{flexBasis:"100%", height: "30px"}}></Box>}
                        {organization?children:selectOrganizationWarning}
                    </Box>
                </Box>
            </Box>
        </OrganizationContext.Provider>
    )
} 
export {OrganizationContext, useOrganization, OrganizationProvider}