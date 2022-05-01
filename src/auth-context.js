import * as React from 'react';
import { useNavigate} from 'react-router-dom'


const AuthContext = React.createContext({
    user:null,
    signin:null,
    signout:null
});

const useAuth = () => {
    return React.useContext(AuthContext);
  };  

const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate()
    const signin = (newUser) => {
        setUser(newUser)
        navigate("/dashboard")
    }
    const signout = () => {
        setUser(null)
    }
    const value = { user, signin, signout}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 
export {AuthContext, useAuth, AuthProvider}