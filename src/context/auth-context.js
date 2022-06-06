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
    const signin = (user) => {
        setUser(user)
        navigate("/dashboard")  
    }
    const signout = () => {
        setUser(null)
    }
    const updateOrganizations = (organizations) => {        
        user.organizations = organizations
        setUser(user)
    }

    const value = { user, signin, signout, updateOrganizations}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 
export {AuthContext, useAuth, AuthProvider}