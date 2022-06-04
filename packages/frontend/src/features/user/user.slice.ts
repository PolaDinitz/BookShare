import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import userService from "../../services/user.service";
import { User, UserState } from "./user.model";

export const fetchUserThunk = createAsyncThunk<{ user: User },
    { userId: string }>('user/fetch', async (payload, thunkApi) => {
    try {
        const user: User = await userService.getUserById(payload.userId);
        return {user};
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const updateUserThunk = createAsyncThunk<{ user: User },
    { userId: string, userDetails: User }>('user/updateUser', async (payload, thunkApi) => {
    try {
        const user = await userService.updateUser(payload.userId, payload.userDetails);
        return {user};
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
    }
});

const initialState: UserState = {
    user: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
            });
    },
});

const {reducer} = profileSlice;
export default reducer;
