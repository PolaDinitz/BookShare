import { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const getBooksByTitle = (title: string) => {
    return axiosInstance.get(`${config.apiUrl}/book/title/` + title)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get books list, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const bookService = {
    getBooksByTitle
};

export default bookService;