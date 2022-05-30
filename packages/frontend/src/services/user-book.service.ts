import { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const updateUserBookAvailability = async (isAvailable: boolean, userBookId : string) => {
    return axiosInstance.post(`${config.apiUrl}/user-book/available/${userBookId}`, {isAvailable: isAvailable})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to change user book availability, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        });
};

const deleteUserBook = async (userBookId : string) => {
    return axiosInstance.delete(`${config.apiUrl}/user-book/${userBookId}`)
        .then((response : AxiosResponse) => {
            return response.data;
        }).catch((error : AxiosError) => {
            throw new Error(`Something went wrong while trying to delet user book, 
            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
};


const getAvailableUsersByBookId = (bookId: string) => {
    return axiosInstance.get(`${config.apiUrl}/user-book/book/${bookId}`)
    .then((response: AxiosResponse) => {
        return response.data;
    }).catch((error: AxiosError) => {
        throw new Error(`Something went wrong while trying to get users with this book, 
                        ${(error.response ? error.response?.data?.message : error.message)}`);
    })
};

const userBookService = {
    updateUserBookAvailability,
    deleteUserBook,
    getAvailableUsersByBookId,
};

export default userBookService;