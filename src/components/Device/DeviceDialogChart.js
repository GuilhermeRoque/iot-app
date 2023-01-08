import React from "react";
import DeviceLineChart from "./DeviceLineChart";
import {
    Dialog,
    DialogContent, 
    DialogTitle, 
} from "@mui/material";
import { ResponsiveContainer } from "recharts";

export default function DeviceDialogChart({open, handleClose, device, deviceData}){
    return(
        <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth={false}
            maxWidth={"fill-content"}
        >
        <DialogTitle>{device?`${device.devId}`:""}</DialogTitle>
        <DialogContent
            // sx={{
            //     width:1200,
            //     height:600
            // }}
        >
            {/* <ResponsiveContainer width="95%" height={600}> */}
                <DeviceLineChart data={deviceData?.data}></DeviceLineChart>
            {/* </ResponsiveContainer>  */}
        </DialogContent>
    </Dialog>
    )
}
