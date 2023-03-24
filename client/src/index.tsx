import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId='890753516084-9daf8fr94htdopruv8gsqg64kq7754h0.apps.googleusercontent.com'>
            <Provider store={store}>
                <App/>
            </Provider>
        </GoogleOAuthProvider>
    </BrowserRouter>
);

