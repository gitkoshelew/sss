import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_REGISTER_FAIL,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
} from '../../actions/constants';

const initialState = {
  value: null,
  errors: [],
  logoutErrors: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
    case AUTH_LOGOUT_SUCCESS:
      return { value: action.payload, errors: [] };
    case AUTH_REGISTER_FAIL:
    case AUTH_FAIL:
      return { value: null, errors: [...state.errors, action.payload] };
    case AUTH_LOGOUT_FAIL:
      return { ...state, value: null, logoutErrors: [...state.logoutErrors, action.payload] };
    default:
      return state;
  }
}
