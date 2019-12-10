import {
  AUTH_FORM_CHANGE,
  AUTH_FETCH_LOG_IN,
  AUTH_FETCH_LOG_OUT,
  AUTH_FETCH_REGISTER,
  AUTH_REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL
} from './constants';

export const authFormChange = payload => ({
  type: AUTH_FORM_CHANGE,
  payload
});

export const authFetchLogIn = () => ({
  type: AUTH_FETCH_LOG_IN
});

export const authFetchLogOut = () => ({
  type: AUTH_FETCH_LOG_OUT
});

export const authFetchRegister = () => ({
  type: AUTH_FETCH_REGISTER
});

export const authRegisterFail = payload => ({
  type: AUTH_REGISTER_FAIL,
  payload
});

export const authSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload
});

export const authFail = payload => ({
  type: AUTH_FAIL,
  payload
});
