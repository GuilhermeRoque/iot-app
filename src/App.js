import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';
import { CustomSnackbar } from './components/CustomSnackbar/CustomSnackbar';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch } from "react-redux";
import { setSnackbar } from "./redux/snackbarSlice";




export default function App(){

  const [user, setUser] = React.useState(null);
  const dispatch = useDispatch()
  const ProtectedRoute = ({ user, redirectPath='/login', children }) => {
    if (!user) {
      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Autenticação necessária"}));
      return <Navigate to={redirectPath} replace />;
    }
    return children?children:<Outlet/>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login user={user}/>}></Route>
        <Route path="/singup" element={<SignUp/>}></Route>
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path="/" element={<Dashboard/>}></Route>
        </Route>
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
      <CustomSnackbar/>
    </Router>
  );  
}

