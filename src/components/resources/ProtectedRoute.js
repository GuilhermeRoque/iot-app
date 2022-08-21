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

    useEffect(async ()=>{
      console.log("Checking auth in ProtectedRoute")
      try {
        if (!auth?.user?.token) {
          await refresh()
          setIsAuth(true)  
        }else{
          setIsAuth(true)  
        }
      } catch (error) {
        setIsAuth(false)
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