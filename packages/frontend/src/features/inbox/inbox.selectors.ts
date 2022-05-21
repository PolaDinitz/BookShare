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
import UserService from "../../services/user.service";
import { User } from "../user/user.model";

export interface ChatRoom {
    id: string;
    name: string;
    subName: string;
    imageUrl: string;
    status: string;
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
        let user: User = (transaction.borrowUser.id === loggedInUserId) ? userBook?.user : transaction.borrowUser;
        return {
            id: transaction.id,
            name: user.firstName + " " + user.lastName,
            subName: book.title,
            imageUrl: user.imageUrl,
            status: "test"
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
