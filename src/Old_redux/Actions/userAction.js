import axios from 'axios';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../Reducers/userSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL;
console.log('🤩 ~ file: authAction.js:6 ~ API_URL', API_URL);

export const AddUser = (userData) => async (dispatch) => {
  console.log('🤩 ~ file: userAction.js:24 ~ register ~ userData', userData);
  try {
    dispatch({ type: USER_REGISTER_REQUEST.type });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(`${API_URL}auth/register`, userData);
    console.log('🤩 ~ file: userAction.js:34 ~ register ~ data', data);
    dispatch({ type: USER_REGISTER_SUCCESS.type, payload: data.result });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL.type,
      payload: error.response.data.message,
    });
  }
};
