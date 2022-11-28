import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import { CircularProgress } from "@mui/material";
import InviteCard from "./InviteCard";
import InviteDialog from "./InviteDialog";
import useAPI from "../../services/useAPI";
import MembersTable from "./MembersTable";
import { Container } from "@mui/material";
import { useOrganization } from '../../context/organization-context';
import APIClient from "../../services/apiClient";

export default function Members() {
  const OrganizationContext = useOrganization()  
  const currentOrganization = OrganizationContext.organization  
  const [organization, setOrganization] = useState(null)
  const [member, setMember] = useState(null)
  const api = useAPI()
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  React.useEffect(() => {
    const apiClient = new APIClient(api)
    console.log("currentOrganization", currentOrganization)
    apiClient.getOrganizations(currentOrganization)
      .then((data)=>{
        console.log("Organization got", data)
        const callerMember = data.members.find(m=>{return m.userId === auth.user._id})
        setMember(callerMember)
        setOrganization(data)
      })
      .catch((error)=>{
        console.log("Error getting organization")
      })
  }, [currentOrganization])


  const handleMemberUpdated = (member, newAccessToken) => {
    const memberIndex = organization.members.findIndex(memb => {return memb._id === member._id})
    const newOrganization = {...organization}
    newOrganization.members.splice(memberIndex, 1)
    newOrganization.members.push(member)
    setOrganization(newOrganization)
    setMember(member)

    const newUser = {...auth.user}
    newUser.token = newAccessToken
    const orgIndex = newUser.userOrganizations.findIndex(org => {return org.organizationId==newOrganization._id})
    newUser.userOrganizations.splice(orgIndex, 1)
    newUser.userOrganizations.push({
      organizationId: newOrganization._id,
      organizationName: newOrganization.name,
      role: member.role,
      status: member.status
    })
    auth.signin(newUser)
  }

  const handleMemberDeleted = (memberId, newAccessToken) => {
    const memberIndex = organization.members.findIndex(memb => {return memb._id === memberId})
    const newOrganization = {...organization}
    newOrganization.members.splice(memberIndex, 1)
    setOrganization(newOrganization)
    setMember(member)

    const newUser = {...auth.user}
    newUser.token = newAccessToken
    const orgIndex = newUser.userOrganizations.findIndex(org => {return org.organizationId==newOrganization._id})
    newUser.userOrganizations.splice(orgIndex, 1)
    auth.signin(newUser)
  }

const handleMemberAdded = (member) => {
  const newOrganization = {...organization}
  newOrganization.members.push(member)
  setOrganization(newOrganization)
}

  if (!organization?.members?.length){
    console.log("Members not loaded")
    return  <></>
  }
  if (member.status === 1){
    console.log("The user still is just invited, rendering invite card..")
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <InviteCard 
            organizationName={organization.name} 
            member={member} 
            oragnizationId={currentOrganization}
            handleInviteUpdate={handleMemberUpdated}
            handleInviteDelete={handleMemberDeleted}
            >            
          </InviteCard>
        </Container>
    )
  }else{
    console.log("The user is active in organization, rendering table with members..")
    return(
      <>
        <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
        <Box sx={{width: "fit-content", margin: "auto", minWidth:"1000px"}}>
          <MembersTable members={organization.members}/>
          <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}                
            onClick={handleClickOpen}>
            Convidar
          </Button>
          <InviteDialog 
            open={open} 
            handleClose={handleClose} 
            addMember={handleMemberAdded}
            organizationId={currentOrganization}
            >
          </InviteDialog>                  
        </Box>
      </>
    )
  }
}