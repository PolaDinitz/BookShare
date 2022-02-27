import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    auth: authReducer,
});

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
};

const store = configureStore();
export default store;