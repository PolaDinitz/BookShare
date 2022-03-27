import axios from "axios";
import auth from "../services/auth.service";
import { accessTokenAuthHeader } from "./AuthHeader";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        config.headers = accessTokenAuthHeader();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response;
    }, async function (error) {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await auth.refreshToken();
            axios.defaults.headers.common = {
                ...axios.defaults.headers.common,
                ...accessTokenAuthHeader()
            }
            return axiosInstance(originalRequest)
        }
        return Promise.reject(error);
    }
)