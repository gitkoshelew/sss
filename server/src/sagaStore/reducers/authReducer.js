import { FETCH_AUTH_SUCCESS, FETCH_AUTH_FAIL } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_AUTH_SUCCESS:
      return action.payload;
    case FETCH_AUTH_FAIL:
      return null;
    default:
      return state;
  }
}
