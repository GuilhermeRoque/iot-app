import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Navigate, Outlet } from "react-router-dom";
import { useSnackbar } from "../../context/snackbar-context";
import useRefreshToken from "../../services/useRefreshToken"

const ProtectedRoute = ({ redirectPath='/login', children }) => {
    const location = useLocation()
    const auth = useAuth()
    const toast = useSnackbar()
    const refresh = useRefreshToken()
    const [isAuth, setIsAuth] = useState(null)

    useEffect(()=>{
      console.log("Checking auth in ProtectedRoute")
      if (!auth?.user?.token) {
        refresh()
          .then(()=>{
            setIsAuth(true)
          })
          .catch(()=>{
            setIsAuth(false)
          })            
      }else{
        setIsAuth(true)  
      }
    }, [])

    if(isAuth===null){
      return <></>
    }else if (!isAuth){
      if(location.pathname !== "/"){
        toast.start("Autenticação necessária", "info")
      }
      return <Navigate to={redirectPath} replace />;
    }else{
      return children?children:<Outlet/>;
    }
  };

export default ProtectedRoute