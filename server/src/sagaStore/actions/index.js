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

export const FETCH_AUTH_LOG_IN = 'fetch_auth_log_in';
export const fetchLogIn = () => ({
  type: FETCH_AUTH_LOG_IN
});

export const FETCH_AUTH_LOG_OUT = 'fetch_auth_log_out';
export const fetchLogOut = () => ({
  type: FETCH_AUTH_LOG_OUT
});

export const FETCH_AUTH_REGISTER = 'fetch_auth_register';
export const fetchAuthRegister = () => ({
  type: FETCH_AUTH_REGISTER
});

export const FETCH_AUTH_REGISTER_FAIL = 'fetch_auth_register_fail';
export const fetchAuthRegisterFail = (payload) => ({
  type: FETCH_AUTH_REGISTER_FAIL,
  payload: payload
});

export const FETCH_AUTH_SUCCESS = 'fetch_auth_success';
export const fetchAuthSuccess = payload => ({
  type: FETCH_AUTH_SUCCESS,
  payload: payload
});

export const FETCH_AUTH_FAIL = 'fetch_auth_fail';
export const fetchAuthFail = () => ({
  type: FETCH_AUTH_FAIL
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

export const LOG_FORM_CHANGE = 'log_form_change';
export const logFromChange = payload => ({
  type: LOG_FORM_CHANGE,
  payload
})
