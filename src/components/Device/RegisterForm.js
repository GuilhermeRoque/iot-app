import { 
    Box, 
    Typography, 
    TextField,  
    Select, 
    InputLabel, 
    Button,
    MenuItem
} from "@mui/material"
import React from "react"
import useAPI from "../../services/useAPI"
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../redux/snackbarSlice"
import { useAuth } from "../../context/auth-context"

export default function RegisterForm(){
    const [dataType, setDataType] = React.useState('0')
    const [dataChannel, setDataChannel] = React.useState('0')
    const api = useAPI()
    const dispatch = useDispatch()
    const [organization, setOrganization] = React.useState(null)
    const auth = useAuth()

  const getOrganizations = () => {
    api.get('/organizations/'+ auth.user.organizations[0])
      .then((response)=>{
          setOrganization(response.data)
        })
      .catch((err)=>{
          console.log(err)
        })
    }

    React.useEffect( () => {
        // if(!auth.user.organizations.length){
        // dispatch(setSnackbar({snackbarOpen: true, snackbarType: "warning", snackbarMessage: "Cadastre uma organização primeiro"}));
        // navigate('/organizations', {replace: true})
        // }else{
        getOrganizations()
        // }  
    }, [])


    const registerDevice = (device) => {
        api.post('/organizations/'+organization._id+"/applications/"+organization.applications[0]._id+'/devices', device)
        .then((response)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "Dispositivo cadastrado"}))
        })
        .catch((error)=>{
            dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Erro ao cadastrar dispositvo"}))
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
          organizationId: data.get("organizationId"),
          name: data.get("devName"),
          devId: data.get("devId"),
          config: {
              dataType: data.get("dataType"),
              dataChannel: data.get("dataChannel"),
          }
        }
        registerDevice(payload)    
    }

    const handleChangeDataType = (event) =>{
        setDataType(event.target.value)
    }
    const handleChangeDataChannel = (event) =>{
        setDataChannel(event.target.value)
    }

    if(organization == null){
        return (<></>)
    }else if(organization.applications.length){
        // if(organization.applications[0].devices.length){
        //     return (<>devices</>)
        // }else{
        return(
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
            Cadastre um dispositivo
            </Typography>
            <TextField
                margin="normal"
                required
                name="devName"
                label="Nome"
                fullWidth
                id="devName"
                autoComplete="current-password"
                />
                {/* <TextField
                margin="normal"
                required
                fullWidth
                id="apiKeys"
                label="Chave de API"
                name="apiKey"
                autoFocus
                /> */}
                <TextField
                margin="normal"
                required
                fullWidth
                id="devId"
                label="Identificador do dispositivo"
                name="devId"
                autoFocus
                />
                <Box sx={{
                display: 'flex',
                }}>
                <Box sx={{
                    marginRight: 5
                }}>
                    <InputLabel id="dataType-select-label">Tipo de dado</InputLabel>
                    <Select
                        required
                        fullWidth
                        id="dataType"
                        name="dataType"
                        value={dataType}
                        labelId='dataType-select-label'
                        onChange={handleChangeDataType}
                    >
                        <MenuItem value={"0"}>int</MenuItem>
                        <MenuItem value={"1"}>string</MenuItem>
                        <MenuItem value={"2"}>boolean</MenuItem>
                        <MenuItem value={"3"}>float</MenuItem>
                    </Select>
                </Box>
                <Box sx={{
                    marginRight: 5
                }}>
                <InputLabel id="dataChannel-select-label">Canal de leitura/escrita</InputLabel>
                <Select
                    required
                    fullWidth
                    id="dataChannel"
                    name="dataChannel"
                    value={dataChannel}
                    labelId='dataChannel-select-label'
                    onChange={handleChangeDataChannel}
                >
                    <MenuItem value={"0"}>Digital</MenuItem>
                    <MenuItem value={"1"}>Analógico</MenuItem>
                    <MenuItem value={"2"}>Interrupção</MenuItem>
                    <MenuItem value={"3"}>UART</MenuItem>
                    <MenuItem value={"4"}>SPI</MenuItem>
                    <MenuItem value={"5"}>I2C</MenuItem>
                    <MenuItem value={"6"}>GDI</MenuItem>
                </Select>
                </Box>
                </Box>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Cadastrar
                </Button>
            </Box>
        )
    // }
    }
}