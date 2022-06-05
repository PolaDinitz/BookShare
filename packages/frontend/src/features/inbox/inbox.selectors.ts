import { Selector } from "react-redux";
import { RootState } from "../../types/types";
import { createSelector, Dictionary } from "@reduxjs/toolkit";
import { transactionsSelectors } from "../transactions/transactions.slice";
import { Transaction } from "../transactions/transaction.model";
import { userBooksSelectors } from "../user-books/user-book.slice";
import { UserBook } from "../user-books/user-book.model";
import { booksSelectors } from "../books/books.slice";
import { Book } from "../books/book.model";
import { selectLoggedInUserId } from "../auth/auth.selectors";
import { User } from "../user/user.model";
import ChatStatusEnum, { transactionStatusToChatStatusMap } from "../../enums/ChatStatusEnum";

export interface ChatRoom {
    id: string;
    bookId: string;
    name: string;
    subName: string;
    imageUrl: string;
    globalUserRating: number;
    status?: ChatStatusEnum;
    transactionUserRating?: number;
    transactionBookRating?: number;
    creationTimestamp: Date;
}

const buildChatRoomsArray = (transactions: Transaction[],
                             userBooksDictionary: Dictionary<UserBook>,
                             booksDictionary: Dictionary<Book>,
                             loggedInUserId: string | undefined): ChatRoom[] => {
    const chatRooms: ChatRoom[] = [];
    for (const transaction of transactions) {
        const chatRoom = buildChatRoomObject(transaction, userBooksDictionary, booksDictionary, loggedInUserId)
        if (chatRoom)
            chatRooms.push(chatRoom);
    }
    return chatRooms;
}

const buildChatRoomObject = (transaction: Transaction,
                             userBooksDictionary: Dictionary<UserBook>,
                             booksDictionary: Dictionary<Book>,
                             loggedInUserId: string | undefined): ChatRoom | null => {
    const userBook: UserBook | undefined = userBooksDictionary[transaction.userBookId];
    const book: Book | undefined = userBook ? booksDictionary[userBook.bookId] : undefined;
    if (userBook && book) {
        const isBorrower: boolean = transaction.borrowUser.id === loggedInUserId;
        const user: User = isBorrower ? userBook?.user : transaction.borrowUser;
        return {
            id: transaction.id,
            bookId: book.id,
            name: user.firstName + " " + user.lastName,
            subName: book.title,
            imageUrl: user.imageUrl,
            globalUserRating: user.rating / user.count,
            transactionUserRating: isBorrower ? transaction.lentUserRating : transaction.borrowUserRating,
            transactionBookRating: transaction.bookRating,
            status: transactionStatusToChatStatusMap
                .get(Array.from(transactionStatusToChatStatusMap.keys()).find((k) => k?.transactionStatus.includes(transaction.status) && k?.isBorrower === isBorrower)),
            creationTimestamp: transaction.startDate
        }
    }
    return null;
}

export const selectChatRooms: Selector<RootState, ChatRoom[]> = createSelector(
    [
        transactionsSelectors.selectAll,
        userBooksSelectors.selectEntities,
        booksSelectors.selectEntities,
        selectLoggedInUserId
    ],
    buildChatRoomsArray
);
