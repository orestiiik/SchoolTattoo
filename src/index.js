import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ThemeContext from "./context/ThemeContext";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {createMuiTheme, ThemeProvider} from "@mui/material";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Roboto Mono", monospace',
            '"Rubik Mono One", sans-serif'
        ].join(','),
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeContext.Provider value={{
                        primaryColor: '#ffffff',
                        secondaryColor: '#750000',
                        backgroundColor: '#1a1a1a',
                        textColor: '#a98383',
                        elevationColor: '#75757C',
                        secondaryFont: '"Rubik Mono One", sans-serif'
                    }}>
                        <MainLayout>
                            <App/>
                        </MainLayout>
                    </ThemeContext.Provider>
                </LocalizationProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
