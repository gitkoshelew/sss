import { AUTH_FORM_CHANGE } from '../../actions/constants';

const initialState = { email: '', password: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FORM_CHANGE:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
