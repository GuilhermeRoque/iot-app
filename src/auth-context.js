import * as React from 'react';
import { useNavigate} from 'react-router-dom'


const AuthContext = React.createContext({
    token:null,
    signin:null,
    signout:null
});

const useAuth = () => {
    return React.useContext(AuthContext);
  };  

const AuthProvider = ({children}) => {
    const [token, setToken] = React.useState(null);
    const navigate = useNavigate()
    const signin = (token) => {
        setToken(token)
        navigate("/dashboard")  
    }
    const signout = () => {
        setToken(null)
    }
    const value = { token, signin, signout}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 
export {AuthContext, useAuth, AuthProvider}