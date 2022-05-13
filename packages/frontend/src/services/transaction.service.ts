import { axiosInstance } from "../utils/AxiosInstance";
import { config } from "../config/config";
import { AxiosError, AxiosResponse } from "axios";

const getTransactionsByUserId = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/transaction/user/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get the user transactions, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const transactionService = {
    getTransactionsByUserId
};

export default transactionService;