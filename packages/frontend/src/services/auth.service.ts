import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { RegisterFormInputs } from "../utils/forms/RegisterSchema";
import { LoginFormInputs } from "../utils/forms/LoginSchema";
import createFormData from "../utils/FormDataCreator";
import { refreshTokenAuthHeader } from "../utils/AuthHeader";
import { axiosInstance } from "../utils/AxiosInstance";

const register = (registerFormInputs: RegisterFormInputs) => {
    const formData = createFormData(registerFormInputs);
    formData.set("profileImage", registerFormInputs.profileImage[0])
    return axios.post(`${config.apiUrl}/user`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response: AxiosResponse) => {
        return response.data;
    }).catch((error: AxiosError) => {
        throw new Error(`Something went wrong while trying to register, ${(error.response ? error.response?.data?.message : error.message)}`);
    })
}

const refreshToken = () => {
    return axios.post(`${config.apiUrl}/auth/refresh`, {}, {
        headers: {
            ...refreshTokenAuthHeader()
        }
    }).then((response: AxiosResponse) => {
        localStorage.setItem('user', JSON.stringify(response.data))
    }).catch((error: AxiosError) => {
        localStorage.removeItem('user');
        throw new Error(`You need to Login, ${(error.response ? error.response?.data?.message : error.message)}`)
    });
}

const login = (loginFormInputs: LoginFormInputs) => {
    return axios.post(`${config.apiUrl}/auth/login`, loginFormInputs)
        .then((response: AxiosResponse) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error(`Incorrect email and/or password, ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const logout = () => {
    return axiosInstance.post(`${config.apiUrl}/auth/logout`)
        .then((response: AxiosResponse) => {
            localStorage.removeItem('user');
            return response.data
        })
        .catch((error: AxiosError) => {
            throw new Error(`Something went wrong while tring to logout, ${(error.response ? error.response?.data?.message : error.message)}`)
        });
}

const authService = {
    register,
    login,
    logout,
    refreshToken
};

export default authService;