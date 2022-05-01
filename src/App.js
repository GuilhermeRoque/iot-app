import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch } from "react-redux";
import { setSnackbar } from "./redux/snackbarSlice";
// import { AuthProvider, useAuth } from './auth-context';


export default function App(){
  const dispatch = useDispatch()

  const ProtectedRoute = ({ redirectPath='/login', children }) => {
    // const auth = useAuth();
    // console.log(auth)
    const location = useLocation();
    if (!localStorage.getItem("user")) {
      if(location.pathname !== "/"){
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "info", snackbarMessage: "Autenticação necessária"}));
      }
      return <Navigate to={redirectPath} replace />;
    }
    return children?children:<Outlet/>;
  };


  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/singup" element={<SignUp/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Route>
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      {/* </AuthProvider> */}
      <CustomSnackbar/>
    </Router>
  );  
}

