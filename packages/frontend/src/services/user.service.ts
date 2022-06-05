import { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";
import { User } from '../features/user/user.model';

const updateUser = (userId: string, user: Partial<User>) => {
    return axiosInstance.put(`${config.apiUrl}/user/${userId}`, user)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to update user information, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getUserById = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/user/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get user details, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const userService = {
    updateUser,
    getUserById,
};

export default userService;
