import { createSlice } from '@reduxjs/toolkit';

/* USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL, */

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoading: true, user: null },
  reducers: {
    USER_REGISTER_REQUEST: (user) => {
      user.isLoading = true;
    },
    USER_REGISTER_SUCCESS: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = true;
      user.user = action.payload;
      user.error = null;
    },
    USER_REGISTER_FAIL: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = false;
      user.user = null;
      user.error = action.payload;
    },
  },
});

export const { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;

/* 
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productLists: [],
    loading: true,
  },
  reducers: {
    PRODUCT_LIST_REQUEST: (products) => {
      products.loading = true;
    },
    PRODUCT_LIST_SUCCESS: (products, action) => {
      products.loading = false;
      products.productLists = action.payload;
    },
    PRODUCT_LIST_FAIL: (products, action) => {
      products.error = action.payload;
      products.loading = false;
    },
  },
});


export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } =
  productsSlice.actions;



*/
