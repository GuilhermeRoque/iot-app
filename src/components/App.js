import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login/Login"
import SignUp from './SingUp/SingUp';
import Dashboard from './Dashboard/Dashboard';
import ProtectedRoute from './resources/ProtectedRoute';
import Integrations from './Integrations/Integrations';
import DeviceAPIs from './DeviceAPIs/DeviceAPIS';
import Application from './Application/Application';
import Organization from './Organization/Organization';
import Device from './Device/Device';
import LoraProfile from './LoraProfile/LoraProfile';
import ServiceProfile from './ServiceProfile/ServiceProfile';
import Home from './Home/Home'
import { SnackbarProvider } from '../context/snackbar-context';
import { AuthProvider } from '../context/auth-context';
import OrganizationResource from "./resources/OrganizationResource"
import Members from "./Members/Members"
export default function App(){
  return (
    <Router>
      <SnackbarProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/singup" element={<SignUp/>}></Route>
            <Route element={<ProtectedRoute/>}>
                <Route element={<Dashboard/>}>
                  <Route path="/" element={<Home/>}></Route>      
                  <Route path="/organizations" element={<Organization/>}/>
                  <Route path="/organizations/*" element={<OrganizationResource/>}>
                    <Route path="members" element={<Members/>}/>
                    <Route path="applications" element={<Application/>}></Route>
                    <Route path="lorawan-profiles" element={<LoraProfile/>}></Route>
                    <Route path="service-profiles" element={<ServiceProfile/>}></Route>
                    <Route path="devices" element={<Device/>}></Route>
                  </Route>                  
                  <Route path="/integrations" element={<Integrations/>}></Route>
                  <Route path="/device-apis" element={<DeviceAPIs/>}></Route>
                </Route>
            </Route>
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  );  
}

