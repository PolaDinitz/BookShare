export enum TransactionStatus {
    WAITING_CHAT_APPROVAL="Waiting Chat Approval",
    CHAT_CANCELED="Canceled chat",
    WAITING_FOR_LEND="Waiting For Lend", 
    CHAT_DECLINED="Chat Declined",
    LEND_DECLINED="Lend Declined",
    WAITING_FOR_BOOK_RETURNED="Waiting for book return",
    WAITING_FOR_RETURN_APPROVAL="Waiting for return approval",
    FINISHED_TRANSACTION="Finished Transaction"
}

// Request to chat 
// cancel request to chat
// Approve chat // decline chat
// Waiting for lend // decline lend
// Waiting for return 
// Report ? how to know who reported who ?
// waiting for return approval
// what to do if user said dont have the book?
// finished transaction