import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getAxiosApi } from '../../api';
import {
  BLOG_FETCH,
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_PUT_SINGLE,
  LOADER_MAIN_CHANGE,
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
    console.log(data, ' +++++++++++++++');
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

export function* putBlogSingleArticle({ id }) {
  yield put({
    type: LOADER_MAIN_CHANGE,
    payload: true,
  });
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
    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: BLOG_FETCH_SINGLE_FAIL,
      payload: error,
    });
    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
    });
  }
}

export function* putBlogArticle() {
  yield takeEvery(BLOG_PUT_SINGLE, putBlogSingleArticle);
}
