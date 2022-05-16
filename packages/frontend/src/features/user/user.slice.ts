import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import userService from "../../services/user.service";
import { RootState } from "../../types/types";
import { User } from "./user.model";

export const userAdapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
});

export const fetchUserThunk = createAsyncThunk<
  { user: User },
  { userId: string }
>('user/fetch', async (payload, thunkApi) => {
  try {
    const user: User = await userService.getUserById(payload.userId);
    return { user };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const updateUserThunk = createAsyncThunk<
  { user: User },
  { userId: string, userDetails: User }
>('user/updateUser', async (payload, thunkApi) => {
  try {
    const user = await userService.updateUser(payload.userId, payload.userDetails);
    return { user };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        userAdapter.upsertOne(state, action.payload.user);
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user);
      });
  },
});

export const userSelectors = userAdapter.getSelectors(
  (state: RootState) => state.user
);

const { reducer } = userSlice;
export default reducer;
