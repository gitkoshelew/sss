export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => ({
    type: FETCH_USERS,
    payload: {}
});

export const FETCH_USERS_SUCCESS = 'fetch_users_success';
export const fetchUsersSuccess = payload => {
  return{
    type: FETCH_USERS_SUCCESS,
    payload: payload
  }
};

export const FETCH_USERS_FAIL = 'fetch_users_fail';
export const fetchUsersFail = payload => ({
  type: FETCH_USERS_FAIL,
  payload: payload
});

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => ({
  type: FETCH_CURRENT_USER,
  payload: {}
});

export const FETCH_CURRENT_USER_SUCCESS = 'fetch_current_user_success';
export const fetchCurrentUserSuccess = payload => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: payload
});

export const FETCH_CURRENT_USER_FAIL = 'fetch_current_user_fail';
export const fetchCurrentUserFail = payload => ({
  type: FETCH_CURRENT_USER_FAIL,
  payload: payload
});


export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => ({
  type: FETCH_ADMINS,
  payload: {}
});

export const FETCH_ADMINS_SUCCESS = 'fetch_admins_success';
export const fetchAdminsSuccess = payload => ({
    type: FETCH_ADMINS_SUCCESS,
    payload: payload
});

export const FETCH_ADMINS_FAIL = 'fetch_admins_fail';
export const fetchAdminsFail = payload => ({
  type: FETCH_ADMINS_FAIL,
  payload: payload
});
