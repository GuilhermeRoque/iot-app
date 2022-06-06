import api from "./api";
import { useEffect } from "react";
import { useAuth } from "../context/auth-context";

const useAPI = () => {
    const auth = useAuth();

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.user?.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // const responseIntercept = axiosPrivate.interceptors.response.use(
        //     response => response,
        //     async (error) => {
        //         const prevRequest = error?.config;
        //         if (error?.response?.status === 403 && !prevRequest?.sent) {
        //             prevRequest.sent = true;
        //             const newAccessToken = await refresh();
        //             prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //             return axiosPrivate(prevRequest);
        //         }
        //         return Promise.reject(error);
        //     }
        // );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            // axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return api;
}

export default useAPI;