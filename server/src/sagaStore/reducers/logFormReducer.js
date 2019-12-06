import { LOG_FORM_CHANGE } from '../actions';

export default (state = {email:'', password: ''}, action) => {
  switch (action.type) {
    case LOG_FORM_CHANGE:
      return { ...state, [action.payload.name]:action.payload.value };
    default:
      return state;
  }
};