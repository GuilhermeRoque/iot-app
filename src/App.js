import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';
import Dashboard from './components/Dashboard/Dashboard';
import LoremIpsum from './components/LoremIpsum/LoremIpsum'
import { AuthProvider } from './auth-context';
import ProtectedRoute from './components/ProtectedRoute';
import Integrations from './components/Integrations/Integrations';
import DeviceAPIs from './components/DeviceAPIs/DeviceAPIS';
import AppForm from './components/AppForm/AppForm';
import RegisterForm from './components/Device/RegisterForm';
import Organization from './components/Organization/Organization';

export default function App(){
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/singup" element={<SignUp/>}></Route>
          <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Dashboard/>}>
                <Route path="organizations" element={<Organization/>}></Route>
                <Route path="applications" element={<AppForm/>}></Route>
                <Route path="devices" element={<RegisterForm/>}></Route>
                <Route path="integrations" element={<Integrations/>}></Route>
                <Route path="device-apis" element={<DeviceAPIs/>}></Route>
                <Route path="text" element={<LoremIpsum/>}></Route>      
              </Route>
          </Route>
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </AuthProvider>
      <CustomSnackbar/>
    </Router>
  );  
}

