import { axiosInstance } from "../utils/AxiosInstance";
import { config } from "../config/config";
import { AxiosError, AxiosResponse } from "axios";

const getRecommendedBooks = () => {
    return axiosInstance.get(`${config.apiUrl}/books-recommendation-engine`)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get books from algorithm, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const booksRecommendedEngine = {
    getRecommendedBooks,
};

export default booksRecommendedEngine;