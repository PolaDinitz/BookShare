import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import {toast} from "react-toastify";

const user = localStorage.getItem("user");

const login = createAsyncThunk<
    any,
    { email: string, password: string }
    >(
    'auth/login',
    async (payload, thunkApi) => {
        try {
            const user = await AuthService.login(payload);
            return { user };
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            return thunkApi.rejectWithValue(error);
        }
    }
);

const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user: JSON.parse(user) }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});

const { reducer } = authSlice;
export default reducer;