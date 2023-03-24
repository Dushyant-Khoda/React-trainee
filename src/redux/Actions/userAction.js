/* 
============ Basic Setup ============ 
*/

import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../Constant/userConstant';

/* 

======= Header Configuration =======

*/
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const tokenData = Cookies.get('x-access-token')
  ? Cookies.get('x-access-token')
  : localStorage.getItem('x-access-token')
  ? localStorage.getItem('x-access-token')
  : null;
const formHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${tokenData}`,
  },
};
const headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${tokenData}`,
  },
};

/* 

============ API Calling ===============
type: API Type will be called in Reducer

*/

/* 

All API Endpoint

* Authentication

Login = auth/login

Forgot Password = auth/forgotPassword

Logout = auth/logout

Reset Password = auth/resetPassword/:token

* User

[ . ]List User = /user/users?limit=5&page=1

[ . ]Add User = auth/register

[ . ]Get Profile = user/me

[ . ]Read user By Id = user/:id

[ . ]Edit Profile = user/:id

[ . ]Edit Password = auth/changePassword

[ . ]Remove User  = user/active/:id

[ . ]Delete User = user/:id

[ . ]Upload User Image = user/profile


* Sub Categories


Add Sub Category = //category/subcategory

List Sub Category = /category/subcategory

Get Sub Category By Id = /category/subcategory/:id

Get Sub Category By Category = 

Edit Sub Category = category/subcategory/:id

Remove Sub Category = category/subcategory/:id {Patch}

Delete Sub Category = category/subcategory/:id {Delete}

* Categories

Add Category = /category

List Category = /category

Get Category = /category/:id

Edit Category = /category/:id

Remove Category = /category/:id

Delete Category = /category/:id

* Blog 

Add Blog = /blog?cat_id=:id

List Blog = /blog?limit=2

Get Blog By Id= blog/639aa672fb57a6d9a614049c 

Get Blog By User Id = blog/user/6396fd325e51b473bf35845a

Edit Blog = blog/639aa649ae43816182b26e16

Remove Blog = blog/639aa649ae43816182b26e16

Delete Blog = blog/639aa649ae43816182b26e16

* Pages

Get Page Content By Page = 

Edit Page Content = 

* Activity

Get All Activity =

Get Activity By user Id = 

*/

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${BASE_URL}auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    Cookies.set('x-access-token', data?.result?.token);
    localStorage.setItem('x-access-token', data?.result?.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data?.result });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const bearerToken = Cookies.get('x-access-token')
      ? Cookies.get('x-access-token')
      : localStorage.getItem('x-access-token')
      ? localStorage.getItem('x-access-token')
      : null;

    const { data } = await axios.get(`${BASE_URL}user/me`, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: data?.result });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message });
  }
};

export const AddUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });
    const bearerToken = Cookies.get('x-access-token')
      ? Cookies.get('x-access-token')
      : localStorage.getItem('x-access-token')
      ? localStorage.getItem('x-access-token')
      : null;

    const { data } = await axios.post(`${BASE_URL}auth/register/V2`, userData, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log('🤩 ~ file: userAction.js:206 ~ AddUser ~ data', data);
    dispatch({ type: ADD_USER_SUCCESS, payload: data?.result });
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error?.response?.data?.message });
  }
};

export const listUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });
    const bearerToken = Cookies.get('x-access-token')
      ? Cookies.get('x-access-token')
      : localStorage.getItem('x-access-token')
      ? localStorage.getItem('x-access-token')
      : null;

    const { data } = await axios.get(`${BASE_URL}user/v2/users`, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log('🤩 ~ file: userAction.js:227 ~ listUser ~ data', data);
    dispatch({ type: ALL_USER_SUCCESS, payload: data?.result });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error?.response?.data?.message });
  }
};
export const EditUser = () => async (dispatch) => {};
export const RemoveUser = () => async (dispatch) => {};
export const DeleteUser = () => async (dispatch) => {};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('x-access-token');
    Cookies.remove('x-access-token');
    dispatch({ type: LOGOUT_SUCCESS, payload: 'Logout Successfully' });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: 'Something Error Occured' });
  }
};

/* 
 
===========Clearing Errors=================

*/
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
