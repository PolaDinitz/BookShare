import { Dictionary } from "@reduxjs/toolkit";

enum ChatStatusEnum {
    BORROW_REQUEST = "Borrow Request",
    BORROW_IN_PROGRESS = "Borrow In Progress",
    BORROW_FINISHED = "Borrow Finished",
    LEND_REQUEST = "Lend Request",
    LEND_IN_PROGRESS = "Lend In Progress",
    LEND_FINISHED = "Lend Finished",
}

enum TransactionStatus {
    WAITING_CHAT_APPROVAL = "Waiting Chat Approval",
    CHAT_CANCELED = "Canceled chat",
    WAITING_FOR_LEND = "Waiting For Lend",
    CHAT_DECLINED = "Chat Declined",
    LEND_DECLINED = "Lend Declined",
    WAITING_FOR_BOOK_RETURNED = "Waiting for book return",
    WAITING_FOR_RETURN_APPROVAL = "Waiting for return approval",
    FINISHED_TRANSACTION = "Finished Transaction"
}

export const transactionStatusToChatStatusMap = new Map<{ transactionStatus: string, isBorrower: boolean } | undefined, ChatStatusEnum>([
    [
        {
            transactionStatus: TransactionStatus.WAITING_CHAT_APPROVAL,
            isBorrower: true
        },
        ChatStatusEnum.BORROW_REQUEST
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_CHAT_APPROVAL,
            isBorrower: false
        },
        ChatStatusEnum.LEND_REQUEST
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_LEND,
            isBorrower: true
        },
        ChatStatusEnum.BORROW_REQUEST
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_LEND,
            isBorrower: false
        },
        ChatStatusEnum.LEND_REQUEST
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_BOOK_RETURNED,
            isBorrower: true
        },
        ChatStatusEnum.BORROW_IN_PROGRESS
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_BOOK_RETURNED,
            isBorrower: false
        },
        ChatStatusEnum.LEND_IN_PROGRESS
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_RETURN_APPROVAL,
            isBorrower: true
        },
        ChatStatusEnum.BORROW_IN_PROGRESS
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_RETURN_APPROVAL,
            isBorrower: false
        },
        ChatStatusEnum.LEND_IN_PROGRESS
    ],
    [
        {
            transactionStatus: TransactionStatus.FINISHED_TRANSACTION,
            isBorrower: true
        },
        ChatStatusEnum.BORROW_FINISHED
    ],
    [
        {
            transactionStatus: TransactionStatus.FINISHED_TRANSACTION,
            isBorrower: false
        },
        ChatStatusEnum.LEND_FINISHED
    ],
]);

export default ChatStatusEnum;