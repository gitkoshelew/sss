import { call, put, takeEvery } from 'redux-saga/effects';

import { getAxiosApi } from '../../api';

import { USERS_FETCH, USERS_SUCCESS, USERS_FAIL } from '../actions/constants';

export function* fetchUsers() {
  try {
    const users = yield call(getAxiosApi('/users'), 'api', 'cookie');
    if (users.error) {
      yield put({
        type: USERS_FAIL,
        payload: users.error,
      });
    } else {
      yield put({
        type: USERS_SUCCESS,
        payload: users,
      });
    }
  } catch (error) {
    yield put({
      type: USERS_FAIL,
      payload: error,
    });
  }
}

export function* fetchUsersSaga() {
  yield takeEvery(USERS_FETCH, fetchUsers);
}
