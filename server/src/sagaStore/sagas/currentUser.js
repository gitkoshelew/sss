import { call, put, takeEvery } from 'redux-saga/effects';
import { getAxiosApi } from '../../api';
import { CURRENT_USER_FETCH, CURRENT_USER_SUCCESS, CURRENT_USER_FAIL } from '../actions/constants';

export function* fetchCurrentUser() {
  try {
    const user = yield call(getAxiosApi('/current_user'), 'api');

    yield put({
      type: CURRENT_USER_SUCCESS,
      payload: user
    });
  } catch (error) {
    yield put({
      type: CURRENT_USER_FAIL,
      payload: error
    });
  }
}

export function* fetchCurrentUserSaga() {
  yield takeEvery(CURRENT_USER_FETCH, fetchCurrentUser);
}
