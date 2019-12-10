import { AUTH_SUCCESS, AUTH_FAIL, AUTH_REGISTER_FAIL } from '../../actions/constants';

const initialState = {
  data: null,
  errors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { data: action.payload, errors: [] };
    case AUTH_REGISTER_FAIL:
    case AUTH_FAIL:
      return { data: null, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
}
