import { TransactionStatus } from "../enums/transaction-status.enum";

export const TRANSACTION_STATUS_SYSTEM_MESSAGE = new Map<TransactionStatus, string>([
  [TransactionStatus.WAITING_FOR_LEND, "The lender has accepted the chat request, you can now write to each other"],
  [TransactionStatus.CHAT_CANCELED, "The borrower has canceled the chat request"],
  [TransactionStatus.CHAT_DECLINED, "The lender has declined the chat request"],
  [TransactionStatus.LEND_DECLINED, "The lender has declined the transaction"],
  [TransactionStatus.WAITING_FOR_BOOK_RETURNED, "The book was lent, await the borrower to return it"],
  [TransactionStatus.WAITING_FOR_RETURN_APPROVAL, "The book has returned, await the lender to approve it"],
  [TransactionStatus.BORROWER_DIDNT_RECEIVE_BOOK, "Borrower reported the transaction as he claims to not receiving the book"],
  [TransactionStatus.BOOK_WASNT_RETURNED, "Lender reported the transaction as he claims that the book wasn't returned"],
  [TransactionStatus.LENDER_DIDNT_RECEIVE_BOOK, "Lender reported the transaction as he claims to not receiving the book"],
  [TransactionStatus.FINISHED_TRANSACTION, "The transaction has ended"]
]);