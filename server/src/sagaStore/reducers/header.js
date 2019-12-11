import { HEADER_NAV_OPEN } from '../actions/constants';

export const header = (state = {}, action) => {
  switch (action.type) {
    case HEADER_NAV_OPEN:
      return {
        ...state,
        isHeaderNavOpen: !state.isHeaderNavOpen,
        headerButtonText: state.isHeaderNavOpen ? 'Открыть меню' : 'Закрыть меню',
      };
    default:
      return state;
  }
};
