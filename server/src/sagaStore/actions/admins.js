import { ADMINS_FETCH, ADMINS_SUCCESS, ADMINS_FAIL } from './constants';

export const adminsFetch = () => ({
  type: ADMINS_FETCH
});

export const adminsSuccess = payload => ({
  type: ADMINS_SUCCESS,
  payload
});

export const adminsFail = payload => ({
  type: ADMINS_FAIL,
  payload
});
