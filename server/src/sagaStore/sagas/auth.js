import { call, put, takeEvery, select } from 'redux-saga/effects';

import { postAxiosApi } from '../../api';

import {
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAIL,
  AUTH_FORM_CHANGE,
  AUTH_FETCH_LOG_IN,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_FETCH_REGISTER,
  AUTH_REGISTER_FAIL
} from '../actions/constants';

export function* fetchRegister() {
  try {
    const logForm = yield select(state => state.logForm);
    const user = yield call(postAxiosApi('/auth/local/register', logForm), 'api');

    if (user.error) {
      yield put({
        type: AUTH_REGISTER_FAIL,
        payload: user.error
      });
    } else {
      yield put({
        type: AUTH_SUCCESS,
        payload: true
      });

      yield put({
        type: CURRENT_USER_SUCCESS,
        payload: user
      });
    }
  } catch (error) {
    yield put({
      type: AUTH_REGISTER_FAIL,
      payload: 'somethink went wrong, try again'
    });
  }
}

export function* fetchLogInSaga() {
  yield takeEvery(AUTH_FORM_CHANGE, fetchLogIn);
}

export function* fetchLogIn() {
  try {
    const logForm = yield select(state => state.logForm);
    const user = yield call(postAxiosApi('/auth/local/login', logForm), 'api');

    yield put({
      type: AUTH_SUCCESS,
      payload: true
    });

    yield put({
      type: CURRENT_USER_SUCCESS,
      payload: user
    });
  } catch (error) {
    yield put({
      type: AUTH_FAIL,
      payload: error
    });

    yield put({
      type: CURRENT_USER_FAIL
    });
  }
}

export function* fetchLogOutSaga() {
  yield takeEvery(AUTH_FETCH_LOG_IN, fetchLogOut);
}

export function* fetchLogOut() {
  try {
    yield call(postAxiosApi('/auth/local/logout', false), 'api');

    yield put({
      type: AUTH_SUCCESS,
      payload: false
    });
  } catch (error) {
    yield put({
      type: AUTH_FAIL,
      payload: error
    });
  }
}

export function* fetchRegisterSaga() {
  yield takeEvery(AUTH_FETCH_REGISTER, fetchRegister);
}
