import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "./book.model";
import { RootState } from "../../types/types";
import { addUserBookThunk } from "../user-books/user-book.slice";
import BookService from "../../services/book.service";

export const booksAdapter = createEntityAdapter<Book>({
    selectId: (book: Book) => book.id,
})

export const fetchBooksThunk = createAsyncThunk<{ books: Book[] }>(
    'books/fetch',
    async (payload, thunkApi) => {
        try {
            const books = await BookService.getBooks();
            return {
                books: books.map((book: any) => {
                    return {
                        id: book.id,
                        title: book.title,
                        bookRating: book.bookRating,
                        author: book.author,
                        count: book.count,
                        description: book.description,
                        imageUrl: book.imageUrl,
                        genres: book.categories
                    } as Book
                })
            };
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: "books",
    initialState: booksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUserBookThunk.fulfilled, (state, action) => {
                booksAdapter.upsertOne(state, action.payload.book);
            })
            .addCase(fetchBooksThunk.fulfilled, (state, action) => {
                booksAdapter.setAll(state, action.payload.books);
            })
    },
});

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.books);

const {reducer} = booksSlice;
export default reducer;
