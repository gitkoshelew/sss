import { LOADER_MAIN_CHANGE } from './constants';

export const loaderMainChange = payload => {
  return {
    type: LOADER_MAIN_CHANGE,
    payload,
  };
};

export const loaderSecondaryChange = payload => {
  return {
    payload,
  };
};
