import { setSnackbar } from "../../redux/snackbarSlice";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ redirectPath='/login', children }) => {
    const location = useLocation()
    const auth = useAuth()
    const dispatch = useDispatch()

    if (!auth?.user?.token) {
      if(location.pathname !== "/"){
        dispatch(setSnackbar({snackbarOpen: true, snackbarType: "info", snackbarMessage: "Autenticação necessária"}));
      }
      return <Navigate to={redirectPath} replace />;
    }
    return children?children:<Outlet/>;
  };

export default ProtectedRoute