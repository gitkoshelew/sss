import { all } from 'redux-saga/effects';

import { fetchUsersSaga } from './users';
import { fetchCurrentUserSaga } from './currentUser';
import { fetchAdminsSaga } from './admins';
import { fetchLogInSaga, fetchRegisterSaga, fetchLogOutSaga } from './auth';

export default function* rootSaga() {
  yield all([
    fetchUsersSaga(),
    fetchCurrentUserSaga(),
    fetchAdminsSaga(),
    fetchLogInSaga(),
    fetchLogOutSaga(),
    fetchRegisterSaga(),
  ]);
}
