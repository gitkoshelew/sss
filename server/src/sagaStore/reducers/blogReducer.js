import {
  BLOG_FETCH_SINGLE,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
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

const blogSingleInitialState = { data: null, errors: [] };

export const blogSingle = (state = blogSingleInitialState, action) => {
  switch (action.type) {
    case BLOG_FETCH_SINGLE_SUCCESS:
      return { errors: [], data: action.payload };
    case BLOG_FETCH_SINGLE_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
};
