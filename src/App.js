import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';
import Dashboard from './components/Dashboard/Dashboard';
export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/singup" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      <CustomSnackbar/>
    </Router>
  );  
}

