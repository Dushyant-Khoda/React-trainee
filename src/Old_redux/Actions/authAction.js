import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../Reducers/authSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL;
console.log('🤩 ~ file: authAction.js:6 ~ API_URL', API_URL);

export const login = (userData) => async (dispatch) => {
  console.log('User Login API Called');
  try {
    dispatch({ type: LOGIN_REQUEST.type });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(`${API_URL}auth/login`, userData);

    if (data.result) {
      localStorage.setItem('user', JSON.stringify(data.result.user));
      localStorage.setItem('x-access-token', data.result.token);
    }

    console.log('🤩 ~ file: userAction.js:34 ~ register ~ data', data);
    dispatch({ type: LOGIN_SUCCESS.type, payload: data.result });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL.type,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = (userData) => async (dispatch) => {
  console.log('User Login API Called');
  try {
    dispatch({ type: LOAD_USER_REQUEST.type });

    const cookieData = localStorage.getItem('x-access-token');
    const { data } = await axios.get(`${API_URL}user/me`, {
      headers: {
        authorization: `Bearer ${cookieData}`,
      },
    });
    console.log('🤩 ~ file: authAction.js:50 ~ loadUser ~ result', data);

    dispatch({ type: LOAD_USER_SUCCESS.type, payload: data.result });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOAD_USER_FAIL.type,
      payload: error.response.data.message,
    });
  }
};

/* export const register = createAsyncThunk('auth/register', async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}signup`, {
      username,
      email,
      password,
    });
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  // // debugger; // eslint-disable-line no-// debugger
  console.log('🤩 ~ file: authAction.js:26 ~ login ~ email, password', email, password);
  try {
    const { data } = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    const result = data.result;
    console.log('🚀 ~ file: authAction.js:22 ~ .then ~ response.data', result);
    if (result) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('x-access-token', result.token);
    }
    console.log('Successfully Login', result.data);
    return { user: result.data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const loadUser = createAsyncThunk('auth/loaduser', async (thunkAPI) => {
  try {
    const cookieData = localStorage.getItem('x-access-token');
    const result = await axios.get(`${API_URL}user/me`, {
      headers: {
        authorization: `Bearer ${cookieData}`,
      },
    });
    return { user: result.data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  // await AuthService.logout();
  localStorage.removeItem('user');
  localStorage.removeItem('x-access-token');
  return axios.post(`${API_URL}logout`).then((response) => {
    return response.data;
  });
}); */
