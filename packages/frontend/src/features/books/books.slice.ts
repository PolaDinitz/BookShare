import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "./book.model";
import BookService from "../../services/book.service";
import { RootState } from "../../types/types";

export const booksAdapter = createEntityAdapter<Book>({
    selectId: (book: Book) => book.id,
})

export const addBookThunk = createAsyncThunk<{ book: Book }, { bookId: string, userId?: string, isAvailable: boolean }>(
    'books/addBook',
    async (payload, thunkApi) => {
        try {
            const userBook = await BookService.addBookToLibrary(payload.bookId, payload.userId, payload.isAvailable);
            const book = await BookService.getBookById(payload.bookId);
            return {userBook, book};
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
            .addCase(addBookThunk.fulfilled, (state, action) => {
                booksAdapter.upsertOne(state, action.payload.book);
            })
    },
});

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.books);

const {reducer} = booksSlice;
export default reducer;
