import { TransactionStatus } from "../enums/transaction-status.enum";

export const TRANSACTION_STATUS_SYSTEM_MESSAGE = new Map<TransactionStatus, string>([
  [TransactionStatus.WAITING_FOR_LEND, "The lender has accepted the chat request, you can now write to each other"],
  [TransactionStatus.CHAT_CANCELED, "The borrower has canceled the chat request"],
  [TransactionStatus.CHAT_DECLINED, "The lender has declined the chat request"],
  [TransactionStatus.LEND_DECLINED, "The borrower has canceled the transaction"],
  [TransactionStatus.WAITING_FOR_BOOK_RETURNED, "The book was lent, await the borrower to return it"],
  [TransactionStatus.WAITING_FOR_RETURN_APPROVAL, "The book has returned, await the lender to approve it"],
  [TransactionStatus.FINISHED_TRANSACTION, "The transaction has ended"]
]);