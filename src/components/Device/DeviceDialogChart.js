import DeviceLineChart from "./DeviceLineChart";
import DialogForm from "../resources/DialogForm";

export default function DeviceDialogChart({open, handleClose}){
    return(
        <DialogForm
            title={"Dados colhidos pelo dispositivo"}
            open={open}
            handleClose={handleClose}
        >
            <DeviceLineChart 
            > 
            </DeviceLineChart>
        </DialogForm>
    )
}
