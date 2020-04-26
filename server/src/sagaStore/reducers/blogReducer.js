import {
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_ARTICLE_TEXT_CHANGE,
  BLOG_ARTICLE_IS_EDITABLE,
} from '../actions/constants';

const blogInitialState = { data: null, errors: [] };

export const blog = (state = blogInitialState, action) => {
  switch (action.type) {
    case BLOG_FETCH_SUCCESS:
      return { errors: [], data: action.payload };
    case BLOG_FETCH_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
};

const blogSingleInitialState = { data: null, errors: [], editable: false };

export const blogSingle = (state = blogSingleInitialState, action) => {
  switch (action.type) {
    case BLOG_FETCH_SINGLE_SUCCESS:
      return { errors: [], data: action.payload };
    case BLOG_FETCH_SINGLE_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    case BLOG_ARTICLE_IS_EDITABLE:
      return { ...state, editable: !state.editable };
    case BLOG_ARTICLE_TEXT_CHANGE:
      return { ...state, data: { ...state.data, [action.payload.name]: action.payload.value } };
    default:
      return state;
  }
};
