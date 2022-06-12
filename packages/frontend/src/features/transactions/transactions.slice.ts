import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Transaction } from "./transaction.model";
import { RootState } from "../../types/types";
import TransactionService from "../../services/transaction.service";
import { Chat } from "../inbox/inbox.model";
import Mapper from "../../utils/Mapper";
import { transactionCreated } from "../inbox/inbox.slice";

export const transactionsAdapter = createEntityAdapter<Transaction>();

export const fetchTransactionsThunk = createAsyncThunk<{ transactions: Transaction[], chats: Chat[] }, { userId: string }>(
    'transactions/fetch',
    async (payload: { userId: string }, thunkApi) => {
        try {
            const transactionsFromResponse: any[] = await TransactionService.getTransactionsByUserId(payload.userId);
            const chats: Chat[] = transactionsFromResponse.map((transaction: any) => {
                return {
                    transactionId: transaction.id,
                    messages: Mapper.chatMessagesResponseToChatMessagesModel(transaction.chatMessages, payload.userId)
                } as Chat
            });
            const transactions: Transaction[] = Mapper.transactionsResponseToTransactionModel(transactionsFromResponse);
            return {
                transactions,
                chats
            };
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const fetchTransactionByIdThunk = createAsyncThunk<{ transaction: Transaction }, { transactionId: string }>(
    'transactions/fetch-by-id',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            const transactionFromResponse: any = await TransactionService.getTransactionsById(payload.transactionId);
            return {
                transaction: Mapper.singleTransactionResponseToTransactionModel(transactionFromResponse)
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const createTransactionThunk = createAsyncThunk<{ transaction: Transaction }, { borrowUserId: string, userBookId: string }>(
    'transactions/create-transaction',
    async (payload: { borrowUserId: string, userBookId: string }, thunkApi) => {
        try {
            const transactionFromResponse: any = await TransactionService.createTransaction(payload.borrowUserId, payload.userBookId);
            thunkApi.dispatch(transactionCreated({
                transactionId: transactionFromResponse.id,
                messages: []
            }));
            return {
                transaction: Mapper.singleTransactionResponseToTransactionModel(transactionFromResponse)
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const rateBookTransactionThunk = createAsyncThunk<{ transaction: Transaction, bookId: string }, { bookId: string, transactionId: string, rateValue: number }>(
    'transactions/rate-book',
    async (payload: { bookId: string, transactionId: string, rateValue: number }, thunkApi) => {
        try {
            const transaction = await TransactionService.rateTransactionBook(payload.transactionId, payload.rateValue);
            return {bookId: payload.bookId, transaction}
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const rateUserTransactionThunk = createAsyncThunk<Transaction, { transactionId: string, rateValue: number }>(
    'transactions/rate-user',
    async (payload: { transactionId: string, rateValue: number }, thunkApi) => {
        try {
            return await TransactionService.rateTransactionUser(payload.transactionId, payload.rateValue);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const approveTransactionChatThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/approve-chat',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.approveTransactionChat(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const declineTransactionChatThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/decline-chat',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.declineTransactionChat(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const declineTransactionLendThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/decline-lend',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.declineTransactionLend(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const cancelTransactionChatThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/cancel-chat',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.cancelTransactionChat(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const finishTransactionChatThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/finish',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.finishTransactionChat(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const lendBookThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/lend-book',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.lendBook(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const returnBookThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/return-book',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.returnBook(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const borrowerNotReceivingBookThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/borrower-didnt-receive-book',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.borrowerNotReceivingBookReport(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const bookWasntReturnedThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/book-wasnt-returned',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.bookWasntReturnedReport(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const lenderNotReceivingBookThunk = createAsyncThunk<Transaction, { transactionId: string }>(
    'transactions/lender-didnt-receive-book',
    async (payload: { transactionId: string }, thunkApi) => {
        try {
            return await TransactionService.lenderNotReceivingBookReport(payload.transactionId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: transactionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
                transactionsAdapter.setAll(state, action.payload.transactions);
            })
            .addCase(fetchTransactionByIdThunk.fulfilled, (state, action) => {
                transactionsAdapter.upsertOne(state, action.payload.transaction);
            })
            .addCase(rateBookTransactionThunk.fulfilled, (state, action) => {
                transactionsAdapter.updateOne(state, {
                    id: action.payload.transaction.id,
                    changes: {
                        bookRating: action.payload.transaction.bookRating
                    }
                });
            })
            .addCase(rateUserTransactionThunk.fulfilled, (state, action) => {
                transactionsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: {
                        borrowUserRating: action.payload.borrowUserRating,
                        lentUserRating: action.payload.lentUserRating
                    }
                });
            })
            .addCase(createTransactionThunk.fulfilled, (state, action) => {
                transactionsAdapter.addOne(state, action.payload.transaction);
            })
            .addMatcher(
                isAnyOf(
                    approveTransactionChatThunk.fulfilled,
                    declineTransactionChatThunk.fulfilled,
                    cancelTransactionChatThunk.fulfilled,
                    finishTransactionChatThunk.fulfilled,
                    lendBookThunk.fulfilled,
                    returnBookThunk.fulfilled,
                    declineTransactionLendThunk.fulfilled,
                    borrowerNotReceivingBookThunk.fulfilled,
                    bookWasntReturnedThunk.fulfilled,
                    lenderNotReceivingBookThunk.fulfilled,
                ), (state, action) => {
                    transactionsAdapter.updateOne(state, {
                        id: action.payload.id,
                        changes: {
                            status: action.payload.status
                        }
                    })
                }
            )
    },
});

export const transactionsSelectors = transactionsAdapter.getSelectors((state: RootState) => state.transactions);

const {reducer} = transactionsSlice;
export default reducer;