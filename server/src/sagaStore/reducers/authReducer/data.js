import { AUTH_SUCCESS, AUTH_FAIL, AUTH_REGISTER_FAIL } from '../../actions/constants';

const initialState = {
  value: false,
  errors: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { value: action.payload, errors: [] };
    case AUTH_REGISTER_FAIL:
    case AUTH_FAIL:
      return { value: null, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
}
