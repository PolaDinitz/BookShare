import React, { useEffect } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider/LocalizationProvider';
import socketIOClient from "socket.io-client";
import './App.css';
import Routing from './Routing';
import { config } from "./config/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types/types";
import { newMessageThunk, transactionReceived } from "./features/inbox/inbox.slice";

export const socket = socketIOClient(config.apiUrl, {autoConnect: false, transports: ['websocket']});

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const loggedInUserEmail = useSelector((state: RootState) => state.auth.user?.email);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {email: loggedInUserEmail};
            socket.connect()
        } else {
            socket.disconnect();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(transactionReceived([
            {
                transactionId: "test1",
                messages: []
            },
            {
                transactionId: "test2",
                messages: []
            }
        ]));
    }, []);

    useEffect(() => {
        socket.on("newMessage", (message: { transactionId: string, from: string, content: string }) => {
            const fromSelf = (message.from === loggedInUserEmail);
            dispatch(newMessageThunk({
                transactionId: message.transactionId,
                chatMessage: {
                    content: message.content,
                    fromSelf
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
