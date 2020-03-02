import { LOADER_MAIN_CHANGE } from '../../actions/constants';

const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADER_MAIN_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
