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

export default function Organization() {
  const [organization, setOrganization] = useState(null)
  const api = useAPI()
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const getOrganizations = () => {
    api.get('/organizations')
      .then((response)=>{
        console.log('Organizations got')
        const organizations = response.data
        console.log(organizations)
        setOrganization(organizations)  
        })
      .catch((err)=>{
          console.log('Error getting organizations', err)
        })
  } 

  const updateMemberStatus = (organizationId, memberId) => {
    const newOrganizations = [...organization]
    const orgIndex = newOrganizations.findIndex(org => {return org._id === organizationId;});
    const newOrg = newOrganizations[orgIndex]
    const memberIndex = newOrg.members.findIndex(memb => {return memb._id === memberId})
    newOrg.members[memberIndex].status = 0
    setOrganization(newOrganizations)
  }
  const addMember = (organizationId, member) => {
    const newOrganizations = [...organization]
    const orgIndex = newOrganizations.findIndex(org => {return org._id === organizationId;});
    const newOrg = newOrganizations[orgIndex]
    newOrg.members.push(member)
    setOrganization(newOrganizations)
  }

  useEffect(() => {
    getOrganizations()
  }, [])

  if (organization == null){
    console.log("None organization, rendering circular progress..")
    return(
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>    
    )
  }else{
    const first_organization = organization.length?organization[0]:{name: '', members: []}
    if(organization.length){
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
          <InviteCard 
            organizationName={first_organization.name} 
            member={member} 
            oragnizationId={first_organization._id}
            updateMemberStatus={updateMemberStatus}
            >            
          </InviteCard>
        )
      }else{
        console.log("The user is active in organization, rendering table with members..")
        return(
          <div>
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
              organizationId={organization[0]._id}
              >
            </InviteDialog>                  
          </div>  
        )
      }
    }else{
      console.log("There is no organizations, rendering register form..")
      return(
        <OrganizationForm setOrganization={setOrganization}/>
      )
    }
  }
}