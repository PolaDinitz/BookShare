import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import BookService from "../../services/book.service";
import { RootState } from "../../types/types";
import { UserBook } from "./user-book.model";
import { Book } from "../books/book.model";
import userBookService from "../../services/user-book.service";

export const userBooksAdapter = createEntityAdapter<UserBook>({
    selectId: (userBook: UserBook) => userBook.id,
})

export const fetchUserBooksThunk = createAsyncThunk<{ userBooks: UserBook[] }>(
    'user-books/fetch',
    async (payload, thunkApi) => {
        try {
            const userBooks: UserBook[] = await BookService.getUserBooks();
            return {userBooks};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const setUserBooksAvilabilityThunk = createAsyncThunk<{ userBook: UserBook }, { userBookId: string, isAvailable: boolean }>(
    'user-books/setAvailability',
    async (payload, thunkApi) => {
        try {
            const userBook = await userBookService.updateUserBookAvailability(payload.isAvailable, payload.userBookId);
            return {userBook};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteUserBookThunk = createAsyncThunk<{ userBookId: string }, { userBookId: string }>(
    'user-books/deleteUserBook',
    async (payload, thunkApi) => {
        try {
            await userBookService.deleteUserBook(payload.userBookId);
            return {
                userBookId: payload.userBookId
            };
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addUserBookThunk = createAsyncThunk<{ userBook: UserBook, book: Book }, { bookId: string, userId?: string, isAvailable: boolean }>(
    'user-books/addUserBook',
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

const userBooksSlice = createSlice({
    name: "user-books",
    initialState: userBooksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUserBookThunk.fulfilled, (state, action) => {
                userBooksAdapter.upsertOne(state, action.payload.userBook);
            })
            .addCase(setUserBooksAvilabilityThunk.fulfilled, (state, action) => {
                userBooksAdapter.upsertOne(state, action.payload.userBook);
            })
            .addCase(fetchUserBooksThunk.fulfilled, (state, action) => {
                userBooksAdapter.setAll(state, action.payload.userBooks);
            })
            .addCase(deleteUserBookThunk.fulfilled, (state, action) => {
                userBooksAdapter.removeOne(state, action.payload.userBookId);
            })
    },
});

export const userBooksSelectors = userBooksAdapter.getSelectors((state: RootState) => state.userBooks);

const {reducer} = userBooksSlice;
export default reducer;
