import { HttpException, HttpStatus } from "@nestjs/common";
import { TransactionStatus } from "src/enums/transaction-status.enum";
import { UserBookService } from "../user-book/user-book.service";
import { Transaction } from "./entities/transaction.entity";
import { TransactionService } from "./transaction.service";


export function handleChangeStatusFromWaitingForChat(transaction : Transaction, currentUserId : string, newStatus : TransactionStatus) : boolean{
  // In waiting for chat approval the borrow user can:
  // - cancel the chat request
  // The lend user can
  // - decline chat
  // - approve chat and update state to wating for lend
  let isActive = true;
  if (transaction.userBook.userId !== currentUserId) {
    if (newStatus !== TransactionStatus.CHAT_CANCELED) {
      throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
    }
    isActive = false;
  }
  else if (newStatus === TransactionStatus.CHAT_DECLINED) {
    isActive = false;
  }
  else if (newStatus !== TransactionStatus.WAITING_FOR_LEND) {
    throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
  }
  return isActive;
}

export async function handleChangeStatusFromWaitingForLend(transaction : Transaction, currentUserId : string, newStatus: TransactionStatus, userBookService: UserBookService, transactionService: TransactionService) : Promise<boolean> {
    // In waiting for lent the borrow user can:
    // - cancel the chat
    // The lend user can
    // - decline lent
    // - approve lent and pass to waiting for book returnal status
    let isActive = true;
    if (transaction.userBook.userId !== currentUserId) {
      if (newStatus !== TransactionStatus.CHAT_CANCELED) {
        throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
      }
      isActive = false;
    } else if (newStatus === TransactionStatus.LEND_DECLINED) {
      isActive = false;
    } else if (newStatus === TransactionStatus.WAITING_FOR_BOOK_RETURNED) {
      await userBookService.updateUserBookLent(transaction.userBookId, true);
      await transactionService.deactivateOtherTransactionsByUserBook(transaction.userBookId, transaction.id);
    } else {
      throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
    }
    return isActive;
}

export async function handleChangeStatusFromWaitingForBookReturn(transaction : Transaction, currentUserId : string, newStatus: TransactionStatus, userBookService: UserBookService) : Promise<boolean> {
  // in waiting for book returnal the borrow user can: 
  // - return the book and change the status to waiting for book return approval
  // The lent user can
  // - say the book was returned and finish the transaction
  let isActive = true;
  if (transaction.userBook.userId !== currentUserId) {
    if (newStatus !== TransactionStatus.WAITING_FOR_RETURN_APPROVAL) {
      throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
    }
  } else if (newStatus === TransactionStatus.FINSHED_TRANSACTION) {
    await userBookService.updateUserBookLent(transaction.userBookId, false);
    isActive = false;
  } else {
    throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
  }
  return isActive;
}

export async function handleChangeStatusFromWaitingForReturnApproval(transaction : Transaction, currentUserId : string, newStatus: TransactionStatus, userBookService: UserBookService) : Promise<boolean> {
  // in waiting for book return approval the borrow user can't do anything.
  // The lent user can
  // - approve and finish the transaction
  let isActive = true;    
  if (transaction.userBook.userId !== currentUserId) {
    throw new HttpException("UnAuthorized", HttpStatus.UNAUTHORIZED);
  } else if (newStatus === TransactionStatus.FINSHED_TRANSACTION) {
    await userBookService.updateUserBookLent(transaction.userBookId, false);
    isActive = false;
  } else {
    throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
  }
  return isActive;
}