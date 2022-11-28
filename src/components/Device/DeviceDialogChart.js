import React from "react";
import DeviceLineChart from "./DeviceLineChart";
import {
    Dialog,
    DialogContent, 
    DialogTitle, 
} from "@mui/material";

export default function DeviceDialogChart({open, handleClose, device}){
    return(
        <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth={false}
            maxWidth="fit-content"
        >
        <DialogTitle>{device?`${device.devId}`:""}</DialogTitle>
        <DialogContent>
            <DeviceLineChart></DeviceLineChart>
        </DialogContent> 
    </Dialog>
    )
}
