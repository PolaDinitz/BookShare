import { RootState } from "../../types/types";
import { createSelector } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { AuthState } from "./auth.model";

const selectAuthState = (state: RootState): AuthState => state.auth;

export const selectLoggedInUserId: Selector<RootState, string | undefined> = createSelector(
    [selectAuthState],
    (authState: AuthState): string | undefined => authState.user?.id
);