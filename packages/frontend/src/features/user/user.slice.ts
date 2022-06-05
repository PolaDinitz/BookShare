import { createAsyncThunk, createSlice, isAnyOf, } from "@reduxjs/toolkit";
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
    const userDetails: User = payload.userDetails;
    try {
        const user = await userService.updateUser(payload.userId, {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            gender: userDetails.gender,
            address: userDetails.address,
            dateOfBirth: userDetails.dateOfBirth,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber
        });
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
            .addMatcher(
                isAnyOf(
                    updateUserThunk.fulfilled,
                    fetchUserThunk.fulfilled,
                ), (state, action) => {
                    state.user = {
                        id: action.payload.user.id,
                        address: action.payload.user.address,
                        dateOfBirth: action.payload.user.dateOfBirth,
                        imageUrl: action.payload.user.imageUrl,
                        email: action.payload.user.email,
                        gender: action.payload.user.gender,
                        lastName: action.payload.user.lastName,
                        count: action.payload.user.count,
                        firstName: action.payload.user.firstName,
                        latitude: action.payload.user.latitude,
                        phoneNumber: action.payload.user.phoneNumber,
                        longitude: action.payload.user.longitude,
                        rating: action.payload.user.rating,
                    };
                }
            )
    },
});

const {reducer} = profileSlice;
export default reducer;
