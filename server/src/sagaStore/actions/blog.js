import {
  BLOG_FETCH,
  BLOG_CHANGE_POSTS_LIMIT,
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_ARTICLE_TEXT_CHANGE,
  BLOG_ARTICLE_IS_EDITABLE,
  BLOG_PUT_SINGLE,
  CREATE_NEW_POST,
  BLOG_CHANGE_ONE_SUCCESS,
  NEW_POST_INPUT_CHANGE,
  CREATE_POST_FAIL,
  CREATE_POST_CHANGE_STATUS,
  CREATE_POST_ADD_BLOCK,
  CREATE_POST_SELECT_BLOCK,
  CREATE_POST_DELETE_BLOCK,
  CREATE_POST_CHANGE_BLOCK,
} from './constants';

export const blogFetch = (payload, infinity) => ({
  type: BLOG_FETCH,
  payload,
  infinity,
});

export const blogFetchSuccess = payload => {
  return {
    type: BLOG_FETCH_SUCCESS,
    payload,
  };
};

export const blogChangeOneSuccess = payload => {
  return {
    type: BLOG_CHANGE_ONE_SUCCESS,
    payload,
  };
};

export const blogFetchFail = payload => ({
  type: BLOG_FETCH_FAIL,
  payload,
});

export const blogChangePostsLimit = payload => ({
  type: BLOG_CHANGE_POSTS_LIMIT,
  payload,
});

export const blogFetchSingle = id => {
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

export const blogPutSingle = payload => ({
  type: BLOG_PUT_SINGLE,
  payload,
});

export const newPostInutChange = (name, value, index) => ({
  type: NEW_POST_INPUT_CHANGE,
  payload: { name, value, index },
});

export const createNewPost = () => ({
  type: CREATE_NEW_POST,
});

export const createPostFailure = () => ({
  type: CREATE_POST_FAIL,
});

export const createPostChangeStatus = payload => ({
  type: CREATE_POST_CHANGE_STATUS,
  payload,
});

export const createPostAddBlock = () => ({
  type: CREATE_POST_ADD_BLOCK,
});

export const createPostSelectBlock = payload => ({
  type: CREATE_POST_SELECT_BLOCK,
  payload,
});

export const createPostDeleteBlock = index => ({
  type: CREATE_POST_DELETE_BLOCK,
  payload: index,
});
export const createPostChangeBlock = (value, index) => ({
  type: CREATE_POST_CHANGE_BLOCK,
  payload: { value, index },
});
