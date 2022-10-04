import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import loginReducer from "./Login/Login_Reducers";
import uiReducer from "./ui/uiReducers";
import datasReducer from "./datas/datasReducers";

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig =   {   key: 'root',
                            storage
                        }

const reducers = combineReducers({  loginReducer,
                                    ui:     uiReducer,
                                    datas:  datasReducer
                                });

const persistedReducer = persistReducer( persistConfig, reducers )
//const store = createStore(persistedReducer)


export const store = createStore(   persistedReducer,
                                    composeEnhancers( applyMiddleware( thunk ) )
                                );
export const persistor = persistStore( store )