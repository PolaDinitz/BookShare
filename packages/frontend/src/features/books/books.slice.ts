import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "./book.model";
import { RootState } from "../../types/types";
import { addUserBookThunk } from "../user-books/user-book.slice";
import BookService from "../../services/book.service";
import { rateBookTransactionThunk } from "../transactions/transactions.slice";

export const booksAdapter = createEntityAdapter<Book>({
    selectId: (book: Book) => book.id,
})

export const fetchBooksThunk = createAsyncThunk<{ books: Book[] }>(
    'books/fetch',
    async (payload, thunkApi) => {
        try {
            const books = await BookService.getBooks();
            return {books};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: "books",
    initialState: booksAdapter.getInitialState({
        selectedBookId: null as string | null
    }),
    reducers: {
        setSelectedBookId: (state, action) => {
            return {
                ...state,
                selectedBookId: action.payload.bookId
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserBookThunk.fulfilled, (state, action) => {
                booksAdapter.upsertOne(state, action.payload.book);
            })
            .addCase(fetchBooksThunk.fulfilled, (state, action) => {
                booksAdapter.setAll(state, action.payload.books);
            })
            .addCase(rateBookTransactionThunk.fulfilled, (state, action) => {
                booksAdapter.updateOne(state, {
                    id: action.payload.bookId,
                    changes: {
                        bookRating: state.entities[action.payload.bookId]!.bookRating + action.payload.transaction.bookRating,
                        count: state.entities[action.payload.bookId]!.count + 1,
                    }
                })
            })
    },
});

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.books);
export const {setSelectedBookId} = booksSlice.actions

const {reducer} = booksSlice;
export default reducer;
