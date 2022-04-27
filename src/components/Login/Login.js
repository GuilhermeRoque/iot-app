import * as React from 'react';
import Button from '@mui/material/Button';
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
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


const theme = createTheme({
  palette: {
    mode: 'light', 
    // dark
  },
});

export default function SignIn() {
  const [open_login_succeed, setOpen] = React.useState(false);
  const [open_login_failed, setOpenFailed] = React.useState(false);

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
    // eslint-disable-next-line no-console
    const user = {
      email: data.get("email"),
      password: data.get("password")
    }
    console.log(user)
    api.post('/users/login', user)
    .then(response => {
      console.log("AUTH",response.get("Authorization"))
      // localStorage.setItem("token",response.headers)
      setOpen(true);
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              fullWidth
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="singup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={open_login_succeed} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right'}}>
          <Alert onClose={handleClose} variant="filled">Autenticado com sucesso</Alert> 
      </Snackbar>
      <Snackbar open={open_login_failed} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right'}}>
          <Alert onClose={handleClose} severity="error" variant="filled">Falha na autenticação</Alert> 
      </Snackbar>
    </ThemeProvider>
  );
}