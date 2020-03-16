import { call, put, takeEvery, select } from 'redux-saga/effects';
import { postAxiosApi } from '../../api';
import {
  AUTH_FETCH_LOG_OUT,
  AUTH_FETCH_LOG_IN,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_FETCH_REGISTER,
  AUTH_REGISTER_FAIL,
  AUTH_INITIAL_CHECK,
  LOADER_MAIN_CHANGE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
} from '../actions/constants';

const storageName = 'userData';

export function* authCheckSaga() {
  yield takeEvery(AUTH_INITIAL_CHECK, authCheck);
}

export function* authCheck() {
  const data = JSON.parse(localStorage.getItem(storageName));

  if (data && data.token) {
    yield put({
      type: AUTH_SUCCESS,
      payload: data,
    });
  }
}

export function* authRegisterSaga() {
  yield takeEvery(AUTH_FETCH_REGISTER, authRegister);
}

export function* authRegister() {
  yield put({
    type: LOADER_MAIN_CHANGE,
    payload: true,
  });

  try {
    const form = yield select(state => state.auth.form);
    const user = yield call(postAxiosApi('/auth/register', form), 'api');

    console.log(user, 'registeruser');
    if (user.error) {
      yield put({
        type: AUTH_REGISTER_FAIL,
        payload: user.error,
      });
    } else {
      yield put({
        type: AUTH_SUCCESS,
        payload: user,
      });

      localStorage.setItem(storageName, JSON.stringify(user));
    }

    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: AUTH_REGISTER_FAIL,
      payload: 'somethink went wrong, try again',
    });
    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
    });
  }
}

export function* authLogInSaga() {
  yield takeEvery(AUTH_FETCH_LOG_IN, authLogIn);
}

export function* authLogIn() {
  try {
    const logForm = yield select(state => state.auth.form);
    const user = yield call(postAxiosApi('/auth/login', logForm), 'api');
    console.log(user, 'loginuser');
    yield put({
      type: AUTH_SUCCESS,
      payload: user,
    });

    localStorage.setItem(storageName, JSON.stringify(user));
  } catch (error) {
    yield put({
      type: AUTH_FAIL,
      payload: error,
    });
  }
}

export function* authLogOutSaga() {
  yield takeEvery(AUTH_FETCH_LOG_OUT, authLogOut);
}

export function* authLogOut() {
  yield put({
    type: AUTH_LOGOUT_SUCCESS,
    payload: null,
  });

  localStorage.removeItem(storageName);

  try {
    yield call(postAxiosApi('/auth/logout', false), 'api');
  } catch (error) {
    yield put({
      type: AUTH_LOGOUT_FAIL,
      payload: error,
    });
  }
}
