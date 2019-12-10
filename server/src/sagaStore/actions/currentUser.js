import { CURRENT_USER_FETCH, CURRENT_USER_SUCCESS, CURRENT_USER_FAIL } from './constants';

export const currentUserFetch = () => ({
  type: CURRENT_USER_FETCH
});

export const currentUserSuccess = payload => ({
  type: CURRENT_USER_SUCCESS,
  payload
});

export const currentUserFail = payload => ({
  type: CURRENT_USER_FAIL,
  payload
});
