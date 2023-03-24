import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import { allUserReducers, authReducer } from './Reducers/userReducer';

// Call Reducer Here
const reducer = combineReducers({ auth: authReducer, allUser: allUserReducers });

// if the value is in cart otherwise it will be blank and we can store cartitems in localstorage

const initialState = {};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
