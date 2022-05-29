import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';
import Dashboard from './components/Dashboard/Dashboard';
import TextBox from './components/TextBox/TextBox'
import Table from './components/Table/Table'
import { AuthProvider } from './auth-context';
import ProtectedRoute from './components/ProtectedRoute';
import Integrations from './components/Integrations/Integrations';
import DeviceAPIs from './components/DeviceAPIs/DeviceAPIS';
import AppForm from './components/AppForm/AppForm';

export default function App(){
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/singup" element={<SignUp/>}></Route>
          <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Dashboard/>}>
                <Route path="organizations" element={<Table/>}></Route>
                <Route path="applications" element={<AppForm/>}></Route>
                <Route path="integrations" element={<Integrations/>}></Route>
                <Route path="device-apis" element={<DeviceAPIs/>}></Route>
                <Route path="text" element={<TextBox/>}></Route>      
              </Route>
          </Route>
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </AuthProvider>
      <CustomSnackbar/>
    </Router>
  );  
}

