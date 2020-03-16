import { all } from 'redux-saga/effects';

import { fetchUsersSaga } from './users';
import { fetchAdminsSaga } from './admins';
import { authLogInSaga, authRegisterSaga, authLogOutSaga, authCheckSaga } from './auth';

export default function* rootSaga() {
  yield all([
    fetchUsersSaga(),
    fetchAdminsSaga(),
    authLogInSaga(),
    authLogOutSaga(),
    authRegisterSaga(),
    authCheckSaga(),
  ]);
}
