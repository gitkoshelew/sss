import { REVIEWS_INPUT_CHANGE, REVIEWS_SEND_FORM } from '../actions/constants';

const initialState = {
  name: '',
  text: '',
  comments: [],
};

const reviewsFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default reviewsFormReducer;
