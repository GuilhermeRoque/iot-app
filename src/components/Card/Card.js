import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useAPI from '../../services/useAPI';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice"; 

export default function BasicCard({name, role, oragnizationId, updateOrganizations}) {
    const api = useAPI()
    const dispatch = useDispatch()
    const handleAccept = () => {
        api.post("/organizations/"+oragnizationId+"/join")
        .then((response) => {
          dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Convite aceito"}))
          updateOrganizations()
        })
        .catch((err)=>{
          console.log(err)
          dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro inesperado"}))
          updateOrganizations()
        })  
    }
    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Convite de participação
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">
          Você foi convidado a participar da organização <b>{name}</b> com a função de {role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAccept}>Aceitar</Button>
        <Button size="small">Recusar</Button>
      </CardActions>
    </Card>
  );
}
