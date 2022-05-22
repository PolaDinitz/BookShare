import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Transaction } from "./transaction.model";
import { RootState } from "../../types/types";
import TransactionService from "../../services/transaction.service";
import { Chat } from "../inbox/inbox.model";
import Mapper from "../../utils/Mapper";

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

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: transactionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
                transactionsAdapter.setAll(state, action.payload.transactions);
            })
            .addMatcher(isAnyOf(approveTransactionChatThunk.fulfilled), (state, action) => {
                transactionsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: {
                        status: action.payload.status
                    }
                })
            })
    },
});

export const transactionsSelectors = transactionsAdapter.getSelectors((state: RootState) => state.transactions);

const {reducer} = transactionsSlice;
export default reducer;