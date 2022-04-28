import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import inboxReducer from "./inbox/inbox.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    inbox: inboxReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;