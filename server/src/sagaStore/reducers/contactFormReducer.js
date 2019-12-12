import {
  CONTACTS_INPUT_CHANGE,
  CONTACTS_INPUT_FOCUS,
  CONTACTS_INPUT_BLUR,
  CONTACTS_COMMENT,
} from '../actions/constants';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const contactFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CONTACTS_INPUT_FOCUS:
      return {
        ...state,
      };
    case CONTACTS_INPUT_BLUR:
      return {
        ...state,
      };
    case CONTACTS_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default contactFormReducer;
