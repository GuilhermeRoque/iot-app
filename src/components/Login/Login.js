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
import LorawanMgntLogo from '../resources/LorawanMgntLogo';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth-context';
import useAPI from '../../services/useAPI';
import { useSnackbar } from '../../context/snackbar-context';

const theme = createTheme({
  palette: {
    mode: 'light', 
    // dark
  },
});

export default function SignIn() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let auth = useAuth();
  const api = useAPI()
  const toast = useSnackbar()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password")
    }
    
    api.post('/auth/login', userData)
    .then((response) => {
      toast.start("Usuário autenticado", "success")
      const accessToken = response.data.accessToken
      const user = response.data.user
      user.token = accessToken
      auth.signin(user)
      if(from == '/'){
        navigate('/home', {replace: true})
      }else{
        navigate(from, {replace: true})
      }
    })
    .catch(error => {
      toast.start("Falha na autenticação", "error")
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
          <LorawanMgntLogo/>
          <Typography component="h1" variant="h5">
          LoRaWAN Application Platform
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Senha"
              fullWidth
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="singup" variant="body2">
                  {"Não possui uma conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}