import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT_SUCCESS,
} from "./auth.type";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

// login success action
export const authLoginSucc = (payload) => {
  return {
    type: AUTH_LOG_IN_SUCCESS,
    payload,
  };
};

// login fail action
export const authLoginFail = () => {
  return {
    type: AUTH_LOG_IN_ERROR,
  };
};

// login loading action
export const authLoginLoad = () => {
  return {
    type: AUTH_LOG_IN_LOADING,
  };
};

// logout success action
export const logoutProcess = () => {
  return {
    type: AUTH_LOG_OUT_SUCCESS,
  };
};

// async login function
export const loginProcess = (data) => async (dispatch) => {
  dispatch(authLoginLoad());
  try {
    let res = await axios.post(`${baseUrl}/user/login`, data);
    // console.log(res)
    if (res.status === 200) {
      // console.log(res.data.token)
      dispatch(authLoginSucc(res.data));
      localStorage.setItem("token", res.data.token);
      return res.data.message;
    } else {
      dispatch(authLoginFail());
      return false;
    }
  } catch (error) {
    dispatch(authLoginFail());
    return false;
  }
};

