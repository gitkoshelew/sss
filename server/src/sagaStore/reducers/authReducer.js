import { FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAIL } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_SUCCESS:
      return action.payload;
    case FETCH_CURRENT_USER_FAIL:
      return null;
    default:
      return state;
  }
}
