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


export default function InviteDialog({open, handleClose, handleChange, inviteUser, role}){
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
                        <MenuItem value={"owner"}>Dono</MenuItem>
                        <MenuItem value={"admin"}>Administrador</MenuItem>
                        <MenuItem value={"user"}>Visualizador</MenuItem>
                    </Select>
                    <Button type="submit">Enviar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
