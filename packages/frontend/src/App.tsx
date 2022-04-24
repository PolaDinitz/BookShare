import React, { useEffect } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider/LocalizationProvider';
import socketIOClient from "socket.io-client";
import './App.css';
import Routing from './Routing';
import { config } from "./config/config";
import { useSelector } from "react-redux";
import { RootState } from "./types/types";

export const socket = socketIOClient(config.apiUrl, {autoConnect: false, transports: ['websocket']});

function App() {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        // For Debugging
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        (isLoggedIn) ? socket.connect() : socket.disconnect();
    }, [isLoggedIn]);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Routing/>
        </LocalizationProvider>
    );
}

export default App;
