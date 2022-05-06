import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import inboxReducer from "./inbox/inbox.slice";
import booksReducer from "./books/books.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    inbox: inboxReducer,
    books: booksReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;