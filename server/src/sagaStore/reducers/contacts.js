import {
  CONTACTS_INPUT_CHANGE,
  CONTACTS_INPUT_FOCUS,
  CONTACTS_INPUT_BLUR,
  CONTACTS_COMMENT,
} from '../actions/constants';

export const contacts = (state = {}, action) => {
  const elem = action.elem;
  switch (action.type) {
    case CONTACTS_INPUT_CHANGE:
    case INPUT_CHANGE:
      return {
        ...state,
        [elem.target.name]: elem.target.value,
        disabled: state.name && state.text ? false : true,
      };
    case CONTACTS_INPUT_FOCUS:
      return {
        ...state,
        [elem.target.name]:
          elem.target.value === initialState.contactForm[elem.target.name] ? '' : elem.target.value,
        disabled: state.name && state.text ? false : true,
      };
    case CONTACTS_INPUT_BLUR:
      return {
        ...state,
        [elem.target.name]:
          elem.target.value === '' ? initialState.contactForm[elem.target.name] : elem.target.value,
        disabled: state.name && state.email && state.phone && state.message ? false : true,
      };
    case CONTACTS_COMMENT:
      const date = dateNow();
      const lastComment = {
        name: state.name,
        text: state.text,
        date: date,
      };
      return {
        ...state,
        comments: [...state.comments, lastComment],
        name: '',
        text: 'Ваш отзыв',
        disabled: true,
      };
    default:
      return state;
  }
};
