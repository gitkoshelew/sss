import { all } from 'redux-saga/effects';

import { fetchUsersSaga } from './users';
import { fetchAdminsSaga } from './admins';
import { authLogInSaga, authRegisterSaga, authLogOutSaga, authCheckSaga } from './auth';
import { fetchBlog, fetchBlogArticle, putBlogArticle, addNewPost } from './blog';

export default function* rootSaga() {
  yield all([
    fetchUsersSaga(),
    fetchAdminsSaga(),
    authLogInSaga(),
    authLogOutSaga(),
    authRegisterSaga(),
    authCheckSaga(),
    fetchBlogArticle(),
    fetchBlog(),
    putBlogArticle(),
    addNewPost(),
  ]);
}
