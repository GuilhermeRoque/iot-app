import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login/Login"
import SignUp from './SingUp/SingUp';
import { CustomSnackbar } from './resources/CustomSnackbar/CustomSnackbar';
import Dashboard from './Dashboard/Dashboard';
import LoremIpsum from './resources/LoremIpsum/LoremIpsum'
import { AuthProvider } from '../context/auth-context';
import ProtectedRoute from './resources/ProtectedRoute';
import Integrations from './Integrations/Integrations';
import DeviceAPIs from './DeviceAPIs/DeviceAPIS';
import AppForm from './AppForm/AppForm';
import RegisterForm from './Device/RegisterForm';
import Organization from './Organization/Organization';

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

