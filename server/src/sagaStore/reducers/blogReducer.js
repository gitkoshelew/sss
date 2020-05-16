import {
  BLOG_CHANGE_POSTS_LIMIT,
  BLOG_FETCH_SINGLE_SUCCESS,
  BLOG_FETCH_SINGLE_FAIL,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAIL,
  BLOG_ARTICLE_TEXT_CHANGE,
  BLOG_ARTICLE_IS_EDITABLE,
  BLOG_CHANGE_ONE_SUCCESS,
  NEW_POST_INPUT_CHANGE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_CHANGE_STATUS,
  CREATE_POST_ADD_BLOCK,
  CREATE_POST_SELECT_BLOCK,
  CREATE_POST_DELETE_BLOCK,
  CREATE_POST_CHANGE_BLOCK,
} from '../actions/constants';

const blogInitialState = { data: [], errors: [], count: 0, limit: 4 };

export const blog = (state = blogInitialState, action) => {
  switch (action.type) {
    case BLOG_FETCH_SUCCESS:
      return {
        ...state,
        errors: [],
        data: action.payload.infinity
          ? [...state.data, ...action.payload.blog]
          : action.payload.blog,
        count: action.payload.count,
      };
    case BLOG_FETCH_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    case BLOG_CHANGE_ONE_SUCCESS:
      return !state.data
        ? state
        : {
            ...state,
            data: state.data.map(element => {
              if (element.id == action.payload.id) {
                return action.payload;
              }
              return element;
            }),
          };
    case BLOG_CHANGE_POSTS_LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
};

const blogSingleInitialState = { data: null, errors: [], editable: false, message: '' };

export const blogSingle = (state = blogSingleInitialState, action) => {
  switch (action.type) {
    case BLOG_FETCH_SINGLE_SUCCESS:
      return { errors: [], data: action.payload, message: 'Успешная загрузка' };
    case BLOG_FETCH_SINGLE_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    case BLOG_ARTICLE_IS_EDITABLE:
      return { ...state, editable: !state.editable };
    case BLOG_ARTICLE_TEXT_CHANGE:
      return { ...state, data: { ...state.data, ...action.payload } };
    default:
      return state;
  }
};

const newPostInitialState = {
  data: [
    { type: 'title', value: '', id: '' },
    { type: 'text', value: '' },
    { type: 'image', value: '', alt: '', title: '' },
    { type: 'h', value: '', level: 2 },
    { type: 'link', value: '', href: '' },
  ],
  status: false,
  select: false,
  message: '',
};

export const newPost = (state = newPostInitialState, action) => {
  switch (action.type) {
    case CREATE_POST_ADD_BLOCK:
      return { ...state, select: !state.select };
    case CREATE_POST_SELECT_BLOCK: {
      let newBlock = null;
      if (action.payload == 'text') newBlock = { type: 'text', value: '' };
      else if (action.payload == 'h') newBlock = { type: 'h', value: '', level: 2 };
      else if (action.payload == 'image')
        newBlock = { type: 'image', value: '', alt: '', title: '' };
      else newBlock = { type: 'link', value: '', href: '' };
      return {
        ...state,
        data: [...state.data, newBlock],
      };
    }
    case NEW_POST_INPUT_CHANGE:
      return {
        ...state,
        data: state.data.map((element, index) => {
          if (index !== action.payload.index) {
            return element;
          }
          return { ...element, [action.payload.name]: action.payload.value };
        }),
      };
    case CREATE_POST_SUCCESS:
      return { ...state, status: true, message: 'Запись добавлена!' };
    case CREATE_POST_FAIL:
      return { ...state, status: true, message: action.payload };
    case CREATE_POST_CHANGE_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
