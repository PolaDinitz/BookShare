import React, { useEffect } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider/LocalizationProvider';
import './App.css';
import Routing from './Routing';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types/types";
import { newMessageThunk, transactionCreated } from "./features/inbox/inbox.slice";
import { fetchTransactionByIdThunk, fetchTransactionsThunk } from "./features/transactions/transactions.slice";
import { fetchBooksThunk } from "./features/books/books.slice";
import { fetchUserBooksThunk } from "./features/user-books/user-book.slice";
import { socket } from '.';
import { fetchUserThunk } from "./features/user/user.slice";

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {userId: loggedInUserId};
            socket.connect();
        } else {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (loggedInUserId) {
            dispatch(fetchTransactionsThunk({
                userId: loggedInUserId
            }));
        }
    }, [loggedInUserId]);

    useEffect(() => {
        if (loggedInUserId) {
            socket.on("newMessage", (message: { transactionId: string, from: string, content: string, time: Date, isSystemMessage: boolean }) => {
                const fromSelf = (message.from === loggedInUserId);
                dispatch(newMessageThunk({
                    transactionId: message.transactionId,
                    chatMessage: {
                        content: message.content,
                        fromSelf,
                        time: message.time,
                        isSystemMessage: message.isSystemMessage
                    }
                }));
            });
            socket.on("transactionChanged", (message: { transactionId: string }) => {
                dispatch(fetchTransactionByIdThunk({
                    transactionId: message.transactionId,
                }));
            });
            socket.on("newTransaction", (message: { transactionId: string, userId: string }) => {
                if (message.userId === loggedInUserId) {
                    socket.emit("joinTransaction", {transactionId: message.transactionId})
                    dispatch(fetchTransactionByIdThunk({
                        transactionId: message.transactionId,
                    }));
                    dispatch(transactionCreated({
                        transactionId: message.transactionId,
                        messages: []
                    }));
                }
            });
        }
    }, [loggedInUserId]);

    useEffect(() => {
        if (isLoggedIn && loggedInUserId) {
            dispatch(fetchBooksThunk());
            dispatch(fetchUserBooksThunk());
            dispatch(fetchUserThunk({userId: loggedInUserId}));
        }
    }, [isLoggedIn]);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Routing/>
        </LocalizationProvider>
    );
}

export default App;
