import { HEADER_NAV_OPEN } from '../actions/constants';

const initialState = {
  isHeaderNavOpen: false,
};

const header = (state = initialState, action) => {
  switch (action.type) {
    case HEADER_NAV_OPEN:
      return {
        ...state,
        isHeaderNavOpen: !state.isHeaderNavOpen,
      };
    default:
      return state;
  }
};

export default header;
