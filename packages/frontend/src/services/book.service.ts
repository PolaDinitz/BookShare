import { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const getBooks = () => {
    return axiosInstance.get(`${config.apiUrl}/book`)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get books list, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getUserBooks = () => {
    return axiosInstance.get(`${config.apiUrl}/user-book`)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get user books list, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getBooksByTitle = (title: string) => {
    return axiosInstance.get(`${config.apiUrl}/book/title/` + title)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get books list, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const addBookToLibrary = (bookId: string, userId: string | undefined, isAvailable: boolean) => {
    return axiosInstance.post(`${config.apiUrl}/book`, {userId, bookId, isAvailable: isAvailable})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to create a book, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getBookById = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/book/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get book with id ${id}, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getBookByRating = (rating: number) => {
    return axiosInstance.get(`${config.apiUrl}/book/rating` + rating)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get books by rating, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const bookService = {
    getUserBooks,
    getBooks,
    getBooksByTitle,
    addBookToLibrary,
    getBookById,
    getBookByRating,
};

export default bookService;