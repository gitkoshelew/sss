import { CURRENT_USER_SUCCESS, CURRENT_USER_FAIL } from '../actions/constants';

export default function(state = null, action) {
  switch (action.type) {
    case CURRENT_USER_SUCCESS:
      return action.payload;
    case CURRENT_USER_FAIL:
      return null;
    default:
      return state;
  }
}
