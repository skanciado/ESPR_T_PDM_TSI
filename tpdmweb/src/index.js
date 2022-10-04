import React from "react";
import ReactDOM from "react-dom";

//import App from './App';
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";

import { store, persistor } from "./stores/store";
import AppRouter from "./routers/AppRouter";

import CacheValidate from './CacheValidate'

import { PersistGate } from 'redux-persist/integration/react'

import "bootstrap/dist/css/bootstrap.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./index.css";

ReactDOM.render(
	// <React.StrictMode>
		<Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

                <CacheValidate>
                    {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                        if (loading) return null;
                        if (!loading && !isLatestVersion) {
                            // You can decide how and when you want to force reload
                            refreshCacheAndReload();
                        }
                        
                        return (			
                            <AppRouter />
                        );
                    }}
                </CacheValidate>
           
                
            </PersistGate>			
		</Provider>,
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
