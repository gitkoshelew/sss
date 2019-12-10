import { USERS_SUCCESS, USERS_FAIL } from '../actions/constants';

export default (state = { data: [], errors: [] }, action) => {
  switch (action.type) {
    case USERS_SUCCESS:
      return { errors: [], data: action.payload };
    case USERS_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
};
