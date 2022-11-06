import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import { CircularProgress } from "@mui/material";
import InviteCard from "./InviteCard";
import InviteDialog from "./InviteDialog";
import useAPI from "../../services/useAPI";
import OrganizationForm from "./OrganizationForm";
import OrganizationTable from "./OrganizationTable";
import APIClient from "../../services/apiClient";
import { Container } from "@mui/material";

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

  const updateMemberStatus = (organizationId, memberId) => {
    const newOrganizations = [...organizations]
    const orgIndex = newOrganizations.findIndex(org => {return org._id === organizationId;});
    const newOrg = newOrganizations[orgIndex]
    const memberIndex = newOrg.members.findIndex(memb => {return memb._id === memberId})
    newOrg.members[memberIndex].status = 0
    setOrganizations(newOrganizations)
  }
  const addMember = (organizationId, member) => {
    const newOrganizations = [...organizations]
    const orgIndex = newOrganizations.findIndex(org => {return org._id === organizationId;});
    const newOrg = newOrganizations[orgIndex]
    newOrg.members.push(member)
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
    const first_organization = organizations.length?organizations[0]:{name: '', members: []}
    if(organizations.length){
      console.log("There is organizations, rendering first one..")
      const index = first_organization.members.findIndex(member => {
        return member.userId === auth.user._id;
      });
      if (index === -1){
        console.log("User is not in organization!")
        return <></>
      }
      const member = first_organization.members[index]
      if (member.status === 1){
        console.log("The user still is just invited, rendering invite card..")
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <InviteCard 
                organizationName={first_organization.name} 
                member={member} 
                oragnizationId={first_organization._id}
                updateMemberStatus={updateMemberStatus}
                >            
              </InviteCard>
            </Container>
        )
      }else{
        console.log("The user is active in organization, rendering table with members..")
        return(
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <OrganizationTable members={first_organization.members}/>
            <Button 
              variant="contained"
              sx={{ mt: 3, mb: 2 }}                
              onClick={handleClickOpen}>
              Convidar
            </Button>
            <InviteDialog 
              open={open} 
              handleClose={handleClose} 
              addMember={addMember}
              organizationId={organizations[0]._id}
              >
            </InviteDialog>                  
        </Container>
        )
      }
    }else{
      console.log("There is no organizations, rendering register form..")
      return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <OrganizationForm handleNewOrganization={handleNewOrganization}/>
        </Container>
      )
    }
  }
}