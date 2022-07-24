import api from "./api";
import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import useRefreshToken from "./useRefreshToken";

const useAPI = () => {
    const auth = useAuth();
    const refresh = useRefreshToken();
    
    useEffect(() => {
        const token = auth?.user?.token
        const requestIntercept = api.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    console.log("Repeating request ...")
                    return api(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return api;
}

export default useAPI;