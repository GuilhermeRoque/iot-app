import api from "./api";
import { useAuth }  from "../context/auth-context";

const useRefreshToken = () => {
    const auth = useAuth();

    async function refresh () {
        const response = await api.get('/auth/refresh')
        const token = response.data.accessToken
        console.log("access token received:")
        console.log(token)
        const user = {...auth.user}
        user.token = token
        auth.signin(user)
        return token;
    }
    return refresh;

}
export default useRefreshToken;
