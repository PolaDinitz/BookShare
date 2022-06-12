import { RootState } from "../../types/types";
import { Selector } from "react-redux";
import { createSelector, Dictionary } from "@reduxjs/toolkit";
import { Book } from "./book.model";
import { booksSelectors } from "./books.slice";
import { userBooksSelectors } from "../user-books/user-book.slice";
import { UserBook } from "../user-books/user-book.model";
import { calcDistanceFromAddress } from "../../utils/distance-calculation";
import { selectLoggedInUserProfile } from "../user/user.selectors";
import { User } from "../user/user.model";

export type BookPostType = {
    book: Book;
    minDistance: number;
    maxUserRating: number;
};

const selectBooksState = (state: RootState) => state.books;

export const selectSelectedBookId: Selector<RootState, string | null> = createSelector(
    [selectBooksState],
    (booksState): string | null => booksState.selectedBookId
);

export const selectBooksPosts: Selector<RootState, BookPostType[]> = createSelector(
    [booksSelectors.selectEntities, userBooksSelectors.selectEntities, selectLoggedInUserProfile],
    (books: Dictionary<Book>, userBooks: Dictionary<UserBook>, user: User | null): BookPostType[] => {
        const booksPosts: Dictionary<BookPostType> = {};
        if (user) {
            Object.values(userBooks).forEach((userBook) => {
                if (userBook && userBook.user.id !== user.id && userBook.isAvailable && !userBook.isLent) {
                    const book: Book | undefined = books[userBook.bookId];
                    const bookPost: BookPostType | undefined = booksPosts[userBook.bookId];
                    const distance = calcDistanceFromAddress(
                        {lat: userBook.user.latitude, lon: userBook.user.longitude},
                        {lat: user.latitude, lon: user.longitude}
                    )
                    const minDistance = bookPost ? (distance < bookPost.minDistance ? distance : bookPost.minDistance) : distance
                    const userRating = userBook.user.rating ? (userBook.user.rating / userBook.user.count) : 0;
                    const maxUserRating = bookPost ? (userBook.user.rating > bookPost.maxUserRating ? (userBook.user.rating / userBook.user.count) : bookPost.maxUserRating) : userRating
                    if (book) {
                        booksPosts[userBook.bookId] = {
                            book,
                            minDistance,
                            maxUserRating
                        }
                    }
                }
            });
        }

        return convertBookPostDicToArray(booksPosts).sort((a, b) => a.minDistance - b.minDistance);
    }
);

const convertBookPostDicToArray = (booksPostsDict: Dictionary<BookPostType>) => {
    const booksPostsArray: BookPostType[] = [];
    Object.values(booksPostsDict).forEach((bookPost) => {
        if (bookPost)
            booksPostsArray.push(bookPost)
    });
    return booksPostsArray;
}