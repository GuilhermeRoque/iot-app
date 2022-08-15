import React from "react";
import {
    Dialog,
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    MenuItem,
    Select,
    InputLabel,
    Box,
    Button,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbarSlice";
import useAPI from "../../services/useAPI";
import {MapperMemberRole} from "../resources/enums"


export default function InviteDialog({open, handleClose, organizationId, addMember}){
    const api = useAPI()
    const dispatch = useDispatch()
    const [role, setRole] = useState('')

    const handleChange = (event) => {
        setRole(event.target.value);
      };
    
    const inviteUser = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const post_data = {
          email: data.get("email-invite"),
          role: data.get("role-invite")
        }
        const path = "/organizations/"+organizationId+"/members"
        api.post(path, post_data)
        .then((response) => {
          console.log("Usuario convidado", response)
          dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Convite enviado"}))
          addMember(organizationId, response.data)
        })
        .catch((err)=>{
          console.log("err", err)
          dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Falha enviar convite"}))

        })
        handleClose();
      }
    
    
    const menuItems = Object.entries(MapperMemberRole).map((memberRole)=>{return <MenuItem value={memberRole[0]}>{memberRole[1]}</MenuItem>})

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Convite para participação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insira o email do usuário a convidar e o papel do mesmo da organização.
                </DialogContentText>
                <Box component="form" onSubmit={inviteUser} noValidate sx={{ mt: 1 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email-invite"
                        name="email-invite"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <InputLabel id="role-invite">Função</InputLabel>
                    <Select
                        id="role-invite"
                        name="role-invite"
                        value={role}
                        label="Função"
                        fullWidth
                        onChange={handleChange}
                    >
                        {menuItems}
                    </Select>
                    <Button type="submit">Enviar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
