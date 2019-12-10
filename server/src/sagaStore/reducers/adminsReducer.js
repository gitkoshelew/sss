import { ADMINS_SUCCESS, ADMINS_FAIL } from '../actions/constants';

export default (state = { data: [], errors: [] }, action) => {
  switch (action.type) {
    case ADMINS_SUCCESS:
      return { errors: [], data: action.payload };
    case ADMINS_FAIL:
      return { ...state, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
};
