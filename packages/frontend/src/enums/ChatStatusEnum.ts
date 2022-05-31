import TransactionStatus from "./TransactionStatusEnum";

enum ChatStatusEnum {
    BORROW_REQUEST = "Borrow Request",
    AWAIT_BORROWING = "Await Borrowing",
    BORROW_IN_PROGRESS = "Borrow In Progress",
    BORROW_AWAIT_RETURN_APPROVE = "Await Return Approve",
    BORROW_FINISHED = "Borrow Finished",
    BORROW_LENDER_DECLINED = "Lender Declined",
    BORROW_BORROWER_CANCELED = "Borrowing Canceled",
    LEND_REQUEST = "Lend Request",
    AWAIT_LENDING = "Await Lending",
    LEND_IN_PROGRESS = "Lend In Progress",
    LEND_APPROVE_RETURN = "Approve Book Return",
    LEND_FINISHED = "Lend Finished",
    LEND_LENDER_DECLINED = "Lending Declined",
    LEND_BORROWER_CANCELED = "Borrower Canceled",
    TRANSACTION_ABORTED = "Transaction Aborted",
}

export const enableChatForStatusArray = [ChatStatusEnum.AWAIT_BORROWING, ChatStatusEnum.AWAIT_LENDING, ChatStatusEnum.BORROW_IN_PROGRESS, ChatStatusEnum.LEND_IN_PROGRESS];

export const transactionStatusToChatStatusMap = new Map<{ transactionStatus: string[], isBorrower: boolean } | undefined, ChatStatusEnum>([
    [
        {
            transactionStatus: [TransactionStatus.WAITING_CHAT_APPROVAL],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_REQUEST
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_CHAT_APPROVAL],
            isBorrower: false
        },
        ChatStatusEnum.LEND_REQUEST
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_LEND],
            isBorrower: true
        },
        ChatStatusEnum.AWAIT_BORROWING
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_LEND],
            isBorrower: false
        },
        ChatStatusEnum.AWAIT_LENDING
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_BOOK_RETURNED],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_IN_PROGRESS
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_BOOK_RETURNED],
            isBorrower: false
        },
        ChatStatusEnum.LEND_IN_PROGRESS
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_RETURN_APPROVAL],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_AWAIT_RETURN_APPROVE
    ],
    [
        {
            transactionStatus: [TransactionStatus.WAITING_FOR_RETURN_APPROVAL],
            isBorrower: false
        },
        ChatStatusEnum.LEND_APPROVE_RETURN
    ],
    [
        {
            transactionStatus: [TransactionStatus.FINISHED_TRANSACTION],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_FINISHED
    ],
    [
        {
            transactionStatus: [TransactionStatus.FINISHED_TRANSACTION],
            isBorrower: false
        },
        ChatStatusEnum.LEND_FINISHED
    ],
    [
        {
            transactionStatus: [TransactionStatus.CHAT_DECLINED, TransactionStatus.LEND_DECLINED],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_LENDER_DECLINED
    ],
    [
        {
            transactionStatus: [TransactionStatus.CHAT_DECLINED, TransactionStatus.LEND_DECLINED],
            isBorrower: false
        },
        ChatStatusEnum.LEND_LENDER_DECLINED
    ],
    [
        {
            transactionStatus: [TransactionStatus.CHAT_CANCELED],
            isBorrower: true
        },
        ChatStatusEnum.BORROW_BORROWER_CANCELED
    ],
    [
        {
            transactionStatus: [TransactionStatus.CHAT_CANCELED],
            isBorrower: false
        },
        ChatStatusEnum.LEND_BORROWER_CANCELED
    ],
    [
        {
            transactionStatus: [TransactionStatus.BORROWER_DIDNT_RECEIVE_BOOK, TransactionStatus.BOOK_WASNT_RETURNED, TransactionStatus.LENDER_DIDNT_RECEIVE_BOOK],
            isBorrower: true
        },
        ChatStatusEnum.TRANSACTION_ABORTED
    ],
    [
        {
            transactionStatus: [TransactionStatus.BORROWER_DIDNT_RECEIVE_BOOK, TransactionStatus.BOOK_WASNT_RETURNED, TransactionStatus.LENDER_DIDNT_RECEIVE_BOOK],
            isBorrower: false
        },
        ChatStatusEnum.TRANSACTION_ABORTED
    ]
]);

export default ChatStatusEnum;