import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { LoginFormInputs } from "../../utils/forms/LoginSchema";
import { RegisterFormInputs } from "../../utils/forms/RegisterSchema";
import { Auth, AuthState } from "./auth.model";

const user = localStorage.getItem("user");

export const loginThunk = createAsyncThunk<{ user: Auth }, LoginFormInputs>(
    'auth/login',
    async (payload: LoginFormInputs, thunkApi) => {
        try {
            const user = await AuthService.login(payload);
            return {user};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk<any, RegisterFormInputs>(
    'auth/register',
    async (payload: RegisterFormInputs, thunkApi) => {
        try {
            return await AuthService.register(payload);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout();
    }
);

const initialState: AuthState = user
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
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});

const {reducer} = authSlice;
export default reducer;