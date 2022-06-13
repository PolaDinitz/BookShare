import { createSelector, Dictionary } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import TransactionStatus from "../../enums/TransactionStatusEnum";
import { RootState } from "../../types/types";
import { selectLoggedInUserId } from "../auth/auth.selectors";
import { Book } from "../books/book.model";
import { booksSelectors } from "../books/books.slice";
import { Transaction } from "../transactions/transaction.model";
import { transactionsSelectors } from "../transactions/transactions.slice";
import { UserBook } from "./user-book.model";
import { userBooksSelectors } from "./user-book.slice";
import { selectSelectedBookId } from "../books/books.selectors";
import moment from "moment";

export interface LibraryBook {
    userBookId: string
    book: string
    author: string
    genres: string[]
    imageUrl: string
    isAvailable: boolean
    isLent: boolean
}

export interface LibraryTransactionBook {
    book: string
    author: string
    genres: string[]
    imageUrl: string | null
    isActive: boolean
    borrowedUserId: string
    lentUserId: string
    transactionId: string
    creationTimestamp: Date;
    borrowedUserName?: string
    lentUserName?: string
    borrowUserRating?: number | null
    lentUserRating?: number | null
}

const getLibraryMyBooks = (userBooks: UserBook[],
                           booksDictionary: Dictionary<Book>,
                           loggedInUserId: string | undefined): LibraryBook[] => {
    const libraryMyBooks: LibraryBook[] = [];
    userBooks.forEach((userBook) => {
        if (userBook.user.id === loggedInUserId) {
            const book = booksDictionary[userBook.bookId];
            if (book) {
                let libraryBook = {
                    userBookId: userBook.id,
                    book: book.title,
                    author: book.author,
                    genres: book.genres,
                    imageUrl: book.imageUrl,
                    isAvailable: userBook.isAvailable,
                    isLent: userBook.isLent,
                } as LibraryBook;
                libraryMyBooks.push(libraryBook);
            }
        }
    });
    return libraryMyBooks;
}

const getLibraryLentBooks = (transactions: Transaction[],
                             userBooks: Dictionary<UserBook>,
                             booksDictionary: Dictionary<Book>,
                             loggedInUserId: string | undefined): LibraryTransactionBook[] => {
    const libraryLentBooks: LibraryTransactionBook[] = [];
    transactions.forEach((transaction) => {
        const userBook = userBooks[transaction.userBookId];
        if (userBook && userBook.user.id === loggedInUserId && (transaction.status === TransactionStatus.FINISHED_TRANSACTION || (transaction.isActive && userBook.isLent))) {
            const book = booksDictionary[userBook.bookId];
            if (book) {
                libraryLentBooks.push({
                    book: book.title,
                    author: book.author,
                    imageUrl: book.imageUrl,
                    genres: book.genres,
                    isActive: transaction.status !== TransactionStatus.FINISHED_TRANSACTION && userBook.isLent,
                    lentUserId: loggedInUserId,
                    borrowedUserId: transaction.borrowUser.id,
                    borrowedUserName: `${transaction.borrowUser.firstName}  ${transaction.borrowUser.lastName}`,
                    lentUserRating: transaction.lentUserRating,
                    transactionId: transaction.id,
                    creationTimestamp: transaction.startDate
                });
            }
        }
    });
    return libraryLentBooks;
}

const getLibraryBorrowedBooks = (transactions: Transaction[],
                                 userBooks: Dictionary<UserBook>,
                                 booksDictionary: Dictionary<Book>,
                                 loggedInUserId: string | undefined): LibraryTransactionBook[] => {
    const libraryBorrowedBooks: LibraryTransactionBook[] = [];
    transactions.forEach((transaction) => {
        if (transaction.borrowUser.id === loggedInUserId) {
            const userBook = userBooks[transaction.userBookId];
            if (userBook) {
                const book = booksDictionary[userBook.bookId];
                if (book) {
                    libraryBorrowedBooks.push({
                        book: book.title,
                        author: book.author,
                        imageUrl: book.imageUrl,
                        genres: book.genres,
                        isActive: transaction.isActive,
                        lentUserId: userBook.user.id,
                        borrowedUserId: loggedInUserId,
                        lentUserName: `${userBook.user.firstName} ${userBook.user.lastName}`,
                        borrowUserRating: transaction.borrowUserRating,
                        transactionId: transaction.id,
                        creationTimestamp: transaction.startDate
                    });
                }
            }
        }
    });
    return libraryBorrowedBooks;
}

const getUserBooksAvailableForLend = (userBooks: UserBook[], selectedBookId: string | null, loggedInUserId: string | undefined) => {
    if (selectedBookId !== null)
        return userBooks.filter((userBook: UserBook) =>
            userBook.bookId === selectedBookId &&
            userBook.user.id !== loggedInUserId &&
            userBook.isAvailable &&
            !userBook.isLent
        )
    return [];
}

export const selectLibraryMyBooks: Selector<RootState, LibraryBook[]> = createSelector(
    [
        userBooksSelectors.selectAll,
        booksSelectors.selectEntities,
        selectLoggedInUserId
    ],
    getLibraryMyBooks
);

export const selectLibraryLentBooks: Selector<RootState, LibraryTransactionBook[]> = createSelector(
    [
        transactionsSelectors.selectAll,
        userBooksSelectors.selectEntities,
        booksSelectors.selectEntities,
        selectLoggedInUserId
    ],
    getLibraryLentBooks
);

export const selectLibraryBorrowedBooks: Selector<RootState, LibraryTransactionBook[]> = createSelector(
    [
        transactionsSelectors.selectAll,
        userBooksSelectors.selectEntities,
        booksSelectors.selectEntities,
        selectLoggedInUserId
    ],
    getLibraryBorrowedBooks
);

export const selectProfileBooksStats: Selector<RootState, { myBooks: number, borrowedBooks: number, lentBooks: number }> = createSelector(
    [
        transactionsSelectors.selectAll,
        userBooksSelectors.selectAll,
        booksSelectors.selectEntities,
        selectLoggedInUserId
    ],
    (transactions: Transaction[],
     userBooks: UserBook[],
     booksDictionary: Dictionary<Book>,
     loggedInUserId: string | undefined) => {
        let userBooksStats: { myBooks: number, borrowedBooks: number, lentBooks: number } = {
            myBooks: 0,
            borrowedBooks: 0,
            lentBooks: 0
        }
        transactions.forEach((transaction: Transaction) => {
            if (transaction.borrowUser.id === loggedInUserId) {
                userBooksStats.borrowedBooks++;
            } else if (transaction.status === TransactionStatus.FINISHED_TRANSACTION) {
                userBooksStats.lentBooks++;
            }
        });
        userBooks.forEach((userBook) => {
            if (userBook.user.id === loggedInUserId)
                userBooksStats.myBooks++
        });
        return userBooksStats;
    }
);

export const selectUserBooksAvailableForLend: Selector<RootState, UserBook[]> = createSelector(
    [
        userBooksSelectors.selectAll,
        selectSelectedBookId,
        selectLoggedInUserId
    ],
    getUserBooksAvailableForLend
)