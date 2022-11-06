import * as React from 'react';


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
    const signin = (user) => {
        console.log("Updating auth context with user")
        console.log(user)
        setUser(user)
    }
    const signout = () => {
        const newUser = {...user}
        newUser.token = null
        setUser(newUser)
    }

    const value = { user, signin, signout}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 
export {AuthContext, useAuth, AuthProvider}