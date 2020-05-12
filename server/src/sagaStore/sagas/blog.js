import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getAxiosApi, putAxiosApi, postAxiosApi } from '../../api';
import {
  BLOG_FETCH,
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_PUT_SINGLE,
  LOADER_MAIN_CHANGE,
  BLOG_CHANGE_ONE_SUCCESS,
  BLOG_ARTICLE_IS_EDITABLE,
  CREATE_NEW_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from '../actions/constants';

export function* fetchBlogArticles(action) {
  yield put({
    type: LOADER_MAIN_CHANGE,
    payload: true,
  });

  try {
    let data = [];
    const limit = yield select(state => state.blog.limit);
    const offset = yield select(state => state.blog.data.length);
    if (action.infinity) {
      data = yield call(getAxiosApi(`/blog?page=1&limit=10&offset=${offset}`), 'api', 'cookie');
    } else {
      data = yield call(
        getAxiosApi(`/blog?page=${action.payload}&limit=${limit}`),
        'api',
        'cookie'
      );
    }

    if (data.error) {
      yield put({
        type: BLOG_FETCH_FAIL,
        payload: data.error,
      });
    } else {
      yield put({
        type: BLOG_FETCH_SUCCESS,
        payload: { blog: data.blog, count: data.count, infinity: action.infinity },
      });
    }
    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
    });
  } catch (error) {
    console.log(error, 'sagad');
    yield put({
      type: BLOG_FETCH_FAIL,
      payload: error,
    });
    yield put({
      type: LOADER_MAIN_CHANGE,
      payload: false,
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

export function* putBlogSingleArticle(article) {
  yield put({
    type: LOADER_MAIN_CHANGE,
    payload: true,
  });
  try {
    const data = yield call(putAxiosApi(`/blog/edit`, article.payload), 'api', 'cookie');

    if (data.error) {
      yield put({
        type: BLOG_FETCH_SINGLE_FAIL,
        payload: data.error,
      });
    } else {
      yield put({
        type: BLOG_CHANGE_ONE_SUCCESS,
        payload: data.singleArticle,
      });
      yield put({
        type: BLOG_ARTICLE_IS_EDITABLE,
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

export function* createNewPost() {
  yield put({
    type: LOADER_MAIN_CHANGE,
    payload: true,
  });
  try {
    const getNewPostData = yield select(state => state.newPost.data);

    const newPost = yield call(postAxiosApi('/blog/add-post', getNewPostData), 'api', 'cookie');

    if (newPost.error) {
      yield put({
        type: LOADER_MAIN_CHANGE,
        payload: false,
      });
      yield put({
        type: CREATE_POST_FAIL,
        payload: newPost.error,
      });
    } else {
      console.log(newPost.newArticle);
      yield put({
        type: LOADER_MAIN_CHANGE,
        payload: false,
      });
      yield put({
        type: CREATE_POST_SUCCESS,
        payload: newPost.newArticle,
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_POST_FAIL,
      payload: error,
    });
    console.log(error, ' ошибка');
  }
}

export function* addNewPost() {
  yield takeEvery(CREATE_NEW_POST, createNewPost);
}
