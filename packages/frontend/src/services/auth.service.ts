import axios, {AxiosError, AxiosResponse} from "axios";
import {config} from "../config/config";

const register = (createUserRequest: {
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: Date,
    address: string,
    password: string,
    confirmPassword: string}) => {
    return axios.put(`${config.apiUrl}/user`, createUserRequest)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to register, " + error.response?.data?.message);
        })
}

const login = (loginRequest: {
    email: string,
    password: string}) => {
    return axios.post(`${config.apiUrl}/auth/login`, loginRequest)
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