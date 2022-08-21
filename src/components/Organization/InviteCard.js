import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useAPI from '../../services/useAPI';
import { MapperMemberRole } from "../resources/enums"
import { useSnackbar } from "../../context/snackbar-context";

export default function InviteCard({organizationName, member, oragnizationId, updateMemberStatus}) {
    const api = useAPI()
    const memberUpdated = {...member}
    const toast = useSnackbar()
    // active
    memberUpdated.status = 0
    const handleAccept = () => {
        api.put("/organizations/"+oragnizationId+"/members/"+member._id, {status: 0})
        .then((response) => {
          toast.start("Convite aceito", 'success')
          updateMemberStatus(oragnizationId, member._id)
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
        <Button size="small">Recusar</Button>
      </CardActions>
    </Card>
  );
}
