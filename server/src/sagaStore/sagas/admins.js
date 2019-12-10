import { call, put, takeEvery } from 'redux-saga/effects';

import { getAxiosApi } from '../../api';

import { ADMINS_FETCH, ADMINS_SUCCESS, ADMINS_FAIL } from '../actions/constants';

export function* fetchAdmins() {
  try {
    const admins = yield call(getAxiosApi('/admins'), 'api');
    if (admins.error) {
      yield put({
        type: ADMINS_FAIL,
        payload: admins.error
      });
    } else {
      yield put({
        type: ADMINS_SUCCESS,
        payload: admins
      });
    }
  } catch (error) {
    yield put({
      type: ADMINS_FAIL,
      payload: error
    });
  }
}

export function* fetchAdminsSaga() {
  yield takeEvery(ADMINS_FETCH, fetchAdmins);
}
