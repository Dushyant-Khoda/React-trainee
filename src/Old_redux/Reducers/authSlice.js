import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));
console.log('🤩 ~ file: authSlice.js:5 ~ user', user);

// const initialState = user ? { isAuthenticated: true, user } : { isAuthenticated: false, user: null };
// console.log('🤩 ~ file: authSlice.js:8 ~ initialState', initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoading: true, user: null },
  reducers: {
    LOGIN_REQUEST: (user) => {
      user.isLoading = true;
    },
    LOGIN_SUCCESS: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = true;
      user.user = action.payload;
      user.error = null;
    },
    LOGIN_FAIL: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = false;
      user.user = null;
      user.error = action.payload;
    },
    LOAD_USER_REQUEST: (user) => {
      user.isLoading = true;
    },
    LOAD_USER_SUCCESS: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = true;
      user.user = action.payload;
      user.error = null;
    },
    LOAD_USER_FAIL: (user, action) => {
      user.isLoading = false;
      user.isAuthenticated = false;
      user.user = null;
      user.error = action.payload;
    },
  },
});

/* 
extraReducers: {
    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    [loadUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isAuthenticated = action.payload.user;
    },
    [loadUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.errMessage = action.payload;
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [logout.pending]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },

*/

export const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL } =
  authSlice.actions;

const { reducer } = authSlice;
export default reducer;
