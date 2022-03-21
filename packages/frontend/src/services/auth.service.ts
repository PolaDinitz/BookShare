import axios, {AxiosError, AxiosResponse} from "axios";
import {config} from "../config/config";
import {RegisterFormInputs} from "../utils/forms/RegisterSchema";
import {LoginFormInputs} from "../utils/forms/LoginSchema";
import header from "../components/header/Header";
import createFormData from "../utils/form-data-creator";

const register = (registerFormInputs: RegisterFormInputs) => {
    const formData = createFormData(registerFormInputs);
    formData.set("profileImage", registerFormInputs.profileImage[0])
    return axios.put(`${config.apiUrl}/user`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to register, " + error.response?.data?.message);
        })
}

const login = (loginFormInputs: LoginFormInputs) => {
    return axios.post(`${config.apiUrl}/auth/login`, loginFormInputs)
        .then((response: AxiosResponse) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Incorrect email and/or password, " + error.response?.data?.message);
        })
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout,
};

export default authService;