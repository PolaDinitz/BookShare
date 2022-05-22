import { Transaction } from "../features/transactions/transaction.model";
import { ChatMessage } from "../features/inbox/inbox.model";

const transactionsResponseToTransactionModel = (transactionsResponse: any[]) : Transaction[] => {
    return transactionsResponse.map((transactionResponse) => {
        return {
            id: transactionResponse.id,
            bookRating: transactionResponse.bookRating,
            borrowUser: transactionResponse.borrowUser,
            borrowUserRating: transactionResponse.borrowUserRating,
            isActive: transactionResponse.active,
            lentUserRating: transactionResponse.lentUserRating,
            startDate: transactionResponse.startDate,
            status: transactionResponse.status,
            userBookId: transactionResponse.userBookId
        } as Transaction;
    });
}

const chatMessagesResponseToChatMessagesModel = (chatMessagesResponse: any[], userId: string) : ChatMessage[] => {
    return chatMessagesResponse.map((chatMessageResponse) => {
        return {
            content: chatMessageResponse.content,
            time: chatMessageResponse.creationTimestamp,
            fromSelf: userId === chatMessageResponse.userId
        } as ChatMessage;
    })
}

const mapper = {
    transactionsResponseToTransactionModel,
    chatMessagesResponseToChatMessagesModel
};

export default mapper;