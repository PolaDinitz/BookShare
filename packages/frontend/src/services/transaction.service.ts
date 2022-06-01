import { axiosInstance } from "../utils/AxiosInstance";
import { config } from "../config/config";
import { AxiosError, AxiosResponse } from "axios";
import TransactionStatus from "../enums/TransactionStatusEnum";
import { socket } from "../index";

const getTransactionsByUserId = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/transaction/user/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get the user transactions, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const getTransactionsById = (id: string) => {
    return axiosInstance.get(`${config.apiUrl}/transaction/` + id)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get the transaction, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const rateTransactionBook = (id: string, rateValue: number) => {
    return axiosInstance.patch(`${config.apiUrl}/transaction/bookRate/` + id, {bookRating: rateValue})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to rate the transaction book, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const rateTransactionUser = (id: string, rateValue: number) => {
    return axiosInstance.patch(`${config.apiUrl}/transaction/userRate/` + id, {userRating: rateValue})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to rate the user, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const updateTransaction = (transactionStatus: TransactionStatus, id: string) => {
    return axiosInstance.patch(`${config.apiUrl}/transaction/status/` + id, {status: transactionStatus})
        .then((response: AxiosResponse) => {
            socket.emit("transactionChanged", {transactionId: id});
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to update transaction, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const createTransaction = (borrowUserId: string, userBookId: string) => {
    return axiosInstance.post(`${config.apiUrl}/transaction`, {borrowUserId, userBookId})
        .then((response: AxiosResponse) => {
            socket.emit("newTransaction" , {transactionId: response.data.id});
            return response.data;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to create new transaction, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const approveTransactionChat = (id: string) => {
    return updateTransaction(TransactionStatus.WAITING_FOR_LEND, id);
}

const declineTransactionChat = (id: string) => {
    return updateTransaction(TransactionStatus.CHAT_DECLINED, id);
}

const declineTransactionLend = (id: string) => {
    return updateTransaction(TransactionStatus.LEND_DECLINED, id);
}

const cancelTransactionChat = (id: string) => {
    return updateTransaction(TransactionStatus.CHAT_CANCELED, id);
}

const finishTransactionChat = (id: string) => {
    return updateTransaction(TransactionStatus.FINISHED_TRANSACTION, id);
}

const lendBook = (id: string) => {
    return updateTransaction(TransactionStatus.WAITING_FOR_BOOK_RETURNED, id);
}

const returnBook = (id: string) => {
    return updateTransaction(TransactionStatus.WAITING_FOR_RETURN_APPROVAL, id);
}

const borrowerNotReceivingBookReport = (id: string) => {
    return updateTransaction(TransactionStatus.BORROWER_DIDNT_RECEIVE_BOOK, id);
}

const bookWasntReturnedReport = (id: string) => {
    return updateTransaction(TransactionStatus.BOOK_WASNT_RETURNED, id);
}

const lenderNotReceivingBookReport = (id: string) => {
    return updateTransaction(TransactionStatus.LENDER_DIDNT_RECEIVE_BOOK, id);
}

const transactionService = {
    getTransactionsByUserId,
    approveTransactionChat,
    declineTransactionChat,
    cancelTransactionChat,
    finishTransactionChat,
    lendBook,
    returnBook,
    getTransactionsById,
    rateTransactionBook,
    rateTransactionUser,
    declineTransactionLend,
    borrowerNotReceivingBookReport,
    bookWasntReturnedReport,
    lenderNotReceivingBookReport,
    createTransaction,
};

export default transactionService;