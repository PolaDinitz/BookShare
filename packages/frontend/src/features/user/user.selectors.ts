import { User, UserState } from "./user.model";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types/types";
import { Selector } from "react-redux";

const selectUserState = (state: RootState): UserState => state.profile;

export const selectLoggedInUserProfile: Selector<RootState, User | null> = createSelector(
    [selectUserState],
    (userState: UserState): User | null => userState.user
);