import {
    Dialog,
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
} from "@mui/material";

export default function DialogForm({open, handleClose, title, helpText, children}){
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {helpText}
                </DialogContentText>
                <div>{children}</div>
            </DialogContent> 
        </Dialog>
    )
}