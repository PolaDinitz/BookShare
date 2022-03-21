import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import {toast} from "react-toastify";
import {LoginFormInputs} from "../../utils/forms/LoginSchema";
import {RegisterFormInputs} from "../../utils/forms/RegisterSchema";

const user = localStorage.getItem("user");

export const loginThunk = createAsyncThunk<any, LoginFormInputs>(
    'auth/login',
    async (payload: LoginFormInputs, thunkApi) => {
        try {
            const user = await AuthService.login(payload);
            return {user};
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const registerThunk = createAsyncThunk<any, RegisterFormInputs>(
    'auth/register',
    async (payload: RegisterFormInputs, thunkApi) => {
        try {
            return await AuthService.register(payload);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            return thunkApi.rejectWithValue(error);
        }
    }
);

const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout();
    }
);

const initialState = user
    ? {isLoggedIn: true, user: JSON.parse(user)}
    : {isLoggedIn: false, user: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});

const {reducer} = authSlice;
export default reducer;