import { FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } from '../actions';

export default (state = {data:[], errors: []}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return { errors: [], data: action.payload };
    case FETCH_USERS_FAIL:
      return { ...state, errors:[...state.errors, action.payload] };
    default:
      return state;
  }
};
