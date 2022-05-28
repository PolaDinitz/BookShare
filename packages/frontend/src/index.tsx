import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import store from "./features/store";
import mainTheme from "./theme/Theme";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import socketIOClient from "socket.io-client";
import { config } from "./config/config";

export const socket = socketIOClient(config.apiUrl, {autoConnect: false, transports: ['websocket']});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <App/>
                <ToastContainer autoClose={3000} theme='colored' position="bottom-right"/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
