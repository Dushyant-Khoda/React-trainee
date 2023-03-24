/* eslint-disable */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../Constant/userConstant';

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case ADD_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return { isLoading: true };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

/* export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADD_USER_:
      return { isLoading: true };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}; */

export const allUserReducers = (state = { user: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case ALL_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
