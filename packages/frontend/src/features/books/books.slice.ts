import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "./book.model";
import { RootState } from "../../types/types";
import { addUserBookThunk } from "../user-books/user-book.slice";

export const booksAdapter = createEntityAdapter<Book>({
    selectId: (book: Book) => book.id,
})

const booksSlice = createSlice({
    name: "books",
    initialState: booksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUserBookThunk.fulfilled, (state, action) => {
                booksAdapter.upsertOne(state, action.payload.book);
            })
    },
});

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.books);

const {reducer} = booksSlice;
export default reducer;
