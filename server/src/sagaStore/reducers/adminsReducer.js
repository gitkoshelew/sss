import { FETCH_ADMINS_SUCCESS, FETCH_ADMINS_FAIL } from '../actions';

export default (state = {data:[], errors: []}, action) => {
  switch (action.type) {
    case FETCH_ADMINS_SUCCESS:
      return {errors:[], data:action.payload};
    case FETCH_ADMINS_FAIL:
      return {...state, errors:[...state.errors, action.payload]};
    default:
      return state;
  }
};