import api from "./api";
import { useAuth }  from "../context/auth-context";

const useRefreshToken = () => {
    const auth = useAuth();

    async function refresh () {
        const response = await api.get('/auth/refresh')
        const credentials = response.data
        const user = credentials.user
        user.token = credentials.accessToken
        auth.signin(user)
        return user.token;
    }
    return refresh;

}
export default useRefreshToken;
