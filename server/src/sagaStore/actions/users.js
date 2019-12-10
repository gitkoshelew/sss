import { USERS_FETCH, USERS_SUCCESS, USERS_FAIL } from './constants';

export const usersFetch = () => ({
  type: USERS_FETCH
});

export const usersSuccess = payload => {
  return {
    type: USERS_SUCCESS,
    payload
  };
};

export const usersFail = payload => ({
  type: USERS_FAIL,
  payload
});
