import React, { useEffect } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider/LocalizationProvider';
import socketIOClient from "socket.io-client";
import './App.css';
import Routing from './Routing';
import { config } from "./config/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types/types";
import { newMessageThunk } from "./features/inbox/inbox.slice";
import { fetchTransactionsThunk } from "./features/transactions/transactions.slice";

export const socket = socketIOClient(config.apiUrl, {autoConnect: false, transports: ['websocket']});

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {userId: loggedInUserId};
            socket.connect()
        } else {
            socket.disconnect();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn && loggedInUserId) {
            dispatch(fetchTransactionsThunk({
                userId: loggedInUserId
            }));
        }
    }, []);

    useEffect(() => {
        socket.on("newMessage", (message: { transactionId: string, from: string, content: string, time: Date }) => {
            const fromSelf = (message.from === loggedInUserId);
            dispatch(newMessageThunk({
                transactionId: message.transactionId,
                chatMessage: {
                    content: message.content,
                    fromSelf,
                    time: message.time
                }
            }));
        });
    }, []);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Routing/>
        </LocalizationProvider>
    );
}

export default App;
