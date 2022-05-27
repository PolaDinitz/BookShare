import { Transaction } from "../features/transactions/transaction.model";
import { ChatMessage } from "../features/inbox/inbox.model";

const transactionsResponseToTransactionModel = (transactionsResponse: any[]): Transaction[] => {
    return transactionsResponse.map((transactionResponse) => singleTransactionResponseToTransactionModel(transactionResponse));
}

const chatMessagesResponseToChatMessagesModel = (chatMessagesResponse: any[], userId: string): ChatMessage[] => {
    return chatMessagesResponse.map((chatMessageResponse) => singleChatMessagesResponseToChatMessagesModel(chatMessageResponse, userId));
}

const singleTransactionResponseToTransactionModel = (transactionResponse: any): Transaction => {
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
}

const singleChatMessagesResponseToChatMessagesModel = (chatMessagesResponse: any, userId: string): ChatMessage => {
    return {
        content: chatMessagesResponse.content,
        time: chatMessagesResponse.creationTimestamp,
        fromSelf: userId === chatMessagesResponse.userId,
        isSystemMessage: chatMessagesResponse.isSystemMessage
    } as ChatMessage;
}

const mapper = {
    transactionsResponseToTransactionModel,
    chatMessagesResponseToChatMessagesModel,
    singleTransactionResponseToTransactionModel,
    singleChatMessagesResponseToChatMessagesModel
};

export default mapper;