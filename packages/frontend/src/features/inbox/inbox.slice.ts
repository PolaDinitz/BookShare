import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Chat, ChatMessage } from "./inbox.model";
import { RootState } from "../../types/types";
import { fetchTransactionsThunk } from "../transactions/transactions.slice";

export const inboxAdapter = createEntityAdapter<Chat>({
    selectId: (chat) => chat.transactionId,
})

export const newMessageThunk = createAsyncThunk<{ transactionId: string, chatMessage: ChatMessage }, { transactionId: string, chatMessage: ChatMessage }>(
    'inbox/newMessage',
    async (payload: { transactionId: string, chatMessage: ChatMessage }, thunkApi) => {
        try {
            return {
                ...payload,
                chatMessage: {
                    ...payload.chatMessage
                }
            };
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const inboxSlice = createSlice({
    name: "inbox",
    initialState: inboxAdapter.getInitialState(),
    reducers: {
        transactionCreated: inboxAdapter.addOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(newMessageThunk.fulfilled, (state, action) => {
                inboxAdapter.updateOne(state, {
                    id: action.payload.transactionId,
                    changes: {
                        messages: state.entities[action.payload.transactionId]?.messages.concat([action.payload.chatMessage])
                    }
                });
            })
            .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
                inboxAdapter.setAll(state, action.payload.chats);
            })
    },
});

export const {
    transactionCreated,
} = inboxSlice.actions

export const inboxSelectors = inboxAdapter.getSelectors((state: RootState) => state.inbox);

const {reducer} = inboxSlice;
export default reducer;