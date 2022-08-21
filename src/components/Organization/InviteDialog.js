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
import useAPI from "../../services/useAPI";
import {MapperMemberRole} from "../resources/enums"
import { useSnackbar } from "../../context/snackbar-context";


export default function InviteDialog({open, handleClose, organizationId, addMember}){
    const api = useAPI()
    const [role, setRole] = useState('')
    const toast = useSnackbar()

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
          toast.start("Convite enviado", 'success')
          addMember(organizationId, response.data)
        })
        .catch((err)=>{
          console.log("err", err)
          toast.start("Falha enviar convite", 'error')
        })
        handleClose();
      }
    
    
    const menuItems = Object.entries(MapperMemberRole).map((memberRole, index)=>{return <MenuItem key={index} value={memberRole[0]}>{memberRole[1]}</MenuItem>})

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
