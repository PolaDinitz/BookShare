import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Chat, ChatMessage } from "./inbox.model";
import { RootState } from "../../types/types";
import moment from "moment";

export const inboxAdapter = createEntityAdapter<Chat>({
    selectId: (chat) => chat.transactionId,
})

export const newMessageThunk = createAsyncThunk<{ transactionId: string, chatMessage: ChatMessage }, { transactionId: string, chatMessage: ChatMessage }>(
    'inbox/newMessage',
    async (payload: { transactionId: string, chatMessage: ChatMessage }, thunkApi) => {
        try {
            // TODO: Add new message to DB
            return {
                ...payload,
                chatMessage: {
                    ...payload.chatMessage,
                    time: moment(new Date()).format('DD/MM/YY HH:mm')
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
        transactionCreated: inboxAdapter.addOne,
        transactionReceived(state, action: { payload: Chat[] }) {
            inboxAdapter.setAll(state, action.payload);
        }
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
    },
});

export const {
    transactionCreated,
    transactionReceived,
} = inboxSlice.actions

export const inboxSelectors = inboxAdapter.getSelectors((state: RootState) => state.inbox);

const {reducer} = inboxSlice;
export default reducer;