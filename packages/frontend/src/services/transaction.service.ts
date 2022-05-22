import { axiosInstance } from "../utils/AxiosInstance";
import { config } from "../config/config";
import { AxiosError, AxiosResponse } from "axios";

export enum TransactionStatus {
    WAITING_CHAT_APPROVAL = "Waiting Chat Approval",
    CHAT_CANCELED = "Canceled chat",
    WAITING_FOR_LEND = "Waiting For Lend",
    CHAT_DECLINED = "Chat Declined",
    LEND_DECLINED = "Lend Declined",
    WAITING_FOR_BOOK_RETURNED = "Waiting for book return",
    WAITING_FOR_RETURN_APPROVAL = "Waiting for return approval",
    FINISHED_TRANSACTION = "Finished Transaction"
}

const getTransactionsByUserId = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/transaction/user/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get the user transactions, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const updateTransaction = (transactionStatus: TransactionStatus, id: string) => {
    return axiosInstance.patch(`${config.apiUrl}/transaction/status/` + id, {status: transactionStatus})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to update transaction, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const approveTransactionChat = (id: string) => {
    return updateTransaction(TransactionStatus.WAITING_FOR_LEND, id);
}

const transactionService = {
    getTransactionsByUserId,
    approveTransactionChat
};

export default transactionService;