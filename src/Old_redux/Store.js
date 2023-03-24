import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authSlice';
import messageReducer from './Reducers/messageSlice';
import userReducer from './Reducers/userSlice';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});
