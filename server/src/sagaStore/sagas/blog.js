import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getAxiosApi } from '../../api';
import {
  BLOG_FETCH,
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
} from '../actions/constants';

export function* fetchBlogArticles() {
  try {
    const data = yield call(getAxiosApi('/blog'), 'api', 'cookie');
    if (data.error) {
      yield put({
        type: BLOG_FETCH_FAIL,
        payload: data.error,
      });
    } else {
      yield put({
        type: BLOG_FETCH_SUCCESS,
        payload: data.blog,
      });
    }
  } catch (error) {
    yield put({
      type: BLOG_FETCH_FAIL,
      payload: error,
    });
  }
}

export function* fetchBlog() {
  yield takeEvery(BLOG_FETCH, fetchBlogArticles);
}

export function* fetchBlogSingleArticle({ id }) {
  // const id  = action.id;
  try {
    const data = yield call(getAxiosApi(`/blog/${id}`), 'api', 'cookie');
    if (data.error) {
      yield put({
        type: BLOG_FETCH_SINGLE_FAIL,
        payload: data.error,
      });
    } else {
      yield put({
        type: BLOG_FETCH_SINGLE_SUCCESS,
        payload: data.singleArticle,
      });
    }
  } catch (error) {
    yield put({
      type: BLOG_FETCH_SINGLE_FAIL,
      payload: error,
    });
  }
}

export function* fetchBlogArticle() {
  yield takeEvery(BLOG_FETCH_SINGLE, fetchBlogSingleArticle);
}
