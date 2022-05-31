export enum TransactionStatus {
  WAITING_CHAT_APPROVAL = "Waiting Chat Approval",
  CHAT_CANCELED = "Canceled chat",
  WAITING_FOR_LEND = "Waiting For Lend",
  CHAT_DECLINED = "Chat Declined",
  LEND_DECLINED = "Lend Declined",
  WAITING_FOR_BOOK_RETURNED = "Waiting for book return",
  WAITING_FOR_RETURN_APPROVAL = "Waiting for return approval",
  BORROWER_DIDNT_RECEIVE_BOOK = "Borrower didn't receive book",
  BOOK_WASNT_RETURNED = "Book wasn't returned",
  LENDER_DIDNT_RECEIVE_BOOK = "Lender didn't receive book",
  FINISHED_TRANSACTION = "Finished Transaction"
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