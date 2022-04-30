import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { Counter } from './components/Counter/Counter';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/singup" element={<SignUp/>}></Route>
        <Route path="/counter" element={<Counter/>}></Route>
      </Routes>
      <CustomSnackbar/>
    </Router>
  );  
}

