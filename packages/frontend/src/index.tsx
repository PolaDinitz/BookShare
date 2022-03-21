import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import mainTheme from "./theme/Theme";
import "react-toastify/dist/ReactToastify.min.css";
import store from "./features/store";
import {Provider} from 'react-redux';
import {ToastContainer} from "react-toastify";

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
