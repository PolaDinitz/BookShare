import { RootState } from "../../types/types";
import { Selector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectBooksState = (state: RootState) => state.books;

export const selectSelectedBookId: Selector<RootState, string | null> = createSelector(
    [selectBooksState],
    (booksState): string | null => booksState.selectedBookId
);