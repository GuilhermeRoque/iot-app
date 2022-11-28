import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useAPI from '../../services/useAPI';
import { MapperMemberRole } from "../resources/enums"
import { useSnackbar } from "../../context/snackbar-context";
import APIClient from "../../services/apiClient";

export default function InviteCard({organizationName, member, oragnizationId, handleInviteUpdate, handleInviteDelete}) {
    const api = useAPI()
    const toast = useSnackbar()

    const handleAccept = () => {
      const apiClient = new APIClient(api)  
      apiClient.acceptMemberInvitation(oragnizationId, member._id)
        .then((data) => {
          console.log(data)
          toast.start("Convite aceito", 'success')
          handleInviteUpdate(data.member, data.accessToken)
        })
        .catch((err)=>{
          console.log(err)
          toast.start("Erro inesperado", 'error')
        })  
    }

    const handleDeny = () => {
      const apiClient = new APIClient(api)  
      apiClient.denyMemberInvitation(oragnizationId, member._id)
        .then((data) => {
          console.log(data)
          toast.start("Convite recusado", 'success')
          handleInviteDelete(member._id, data.accessToken)
        })
        .catch((err)=>{
          console.log(err)
          toast.start("Erro inesperado", 'error')
        })  
    }

    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Convite de participação
        </Typography>
        <Typography variant="h5" component="div">
          {organizationName}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">
          Você foi convidado a participar da organização <b>{organizationName}</b> com a função de <b>{MapperMemberRole[member.role]}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAccept}>Aceitar</Button>
        <Button size="small" onClick={handleDeny}>Recusar</Button>
      </CardActions>
    </Card>
  );
}
