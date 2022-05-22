import { TransactionStatus } from "../services/transaction.service";

enum ChatStatusEnum {
    BORROW_REQUEST = "Borrow Request",
    AWAIT_BORROWING = "Await Borrowing",
    BORROW_IN_PROGRESS = "Borrow In Progress",
    BORROW_FINISHED = "Borrow Finished",
    LEND_REQUEST = "Lend Request",
    AWAIT_LENDING = "Await Lending",
    LEND_IN_PROGRESS = "Lend In Progress",
    LEND_FINISHED = "Lend Finished",
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
        ChatStatusEnum.AWAIT_BORROWING
    ],
    [
        {
            transactionStatus: TransactionStatus.WAITING_FOR_LEND,
            isBorrower: false
        },
        ChatStatusEnum.AWAIT_LENDING
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