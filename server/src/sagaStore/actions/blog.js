import {
  BLOG_FETCH,
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_ARTICLE_TEXT_CHANGE,
  BLOG_ARTICLE_IS_EDITABLE,
} from './constants';

export const blogFetch = () => ({
  type: BLOG_FETCH,
});

export const blogFetchSuccess = payload => {
  return {
    type: BLOG_FETCH_SUCCESS,
    payload,
  };
};

export const blogFetchFail = payload => ({
  type: BLOG_FETCH_FAIL,
  payload,
});

export const blogFetchSingle = id => {
  console.log(id, ' action ID');
  return {
    type: BLOG_FETCH_SINGLE,
    id,
  };
};

export const blogFetchSingleSuccess = payload => {
  return {
    type: BLOG_FETCH_SINGLE_SUCCESS,
    payload,
  };
};

export const blogFetchSingleFail = payload => ({
  type: BLOG_FETCH_SINGLE_FAIL,
  payload,
});

export const blogSingleTextChange = payload => ({
  type: BLOG_ARTICLE_TEXT_CHANGE,
  payload,
});

export const blogSingleIsEditable = () => ({
  type: BLOG_ARTICLE_IS_EDITABLE,
});
