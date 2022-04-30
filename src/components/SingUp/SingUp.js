import * as React from 'react';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ReactComponent as LogoSVG} from "../../assets/iotManager.svg";
import api from "../../services/api";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom'

const theme = createTheme();

export default function SignUp() {
  const [open_signup_succeed, setOpen] = React.useState(false);
  const [open_signup_failed, setOpenFailed] = React.useState(false);
  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
    setOpenFailed(false)
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      name: data.get("firstName") + " " + data.get("lastName"),
      email: data.get("email"),
      password: data.get("password")
    }
    api.post('/users/', user)
    .then(response => {
      setOpen(true)
      // navigate('/login', {state:{open_signup_succeed:true}})
    })
    .catch(error => {
      setOpenFailed(true);
      console.log("Error", error)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            <LogoSVG />
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
          LoRaWAN Device Manager
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* action={navigate('/login')} */}
      <Snackbar open={open_signup_succeed} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical:'top', horizontal:'right'}} >
          <Alert onClose={handleClose} variant="filled">Usuário cadastrado com sucesso</Alert> 
      </Snackbar>
      <Snackbar open={open_signup_failed} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right'}}>
          <Alert onClose={handleClose} severity="error" variant="filled">Falha no cadastro</Alert> 
      </Snackbar>
    </ThemeProvider>
  );
}