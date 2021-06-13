import { post } from '../../utils/http/fetching_utils';

// ========================================================================= //
// ================================= TYPES ================================= //
// ========================================================================= //

export const ON_LOGIN_BEGIN = 'ON_LOGIN_BEGIN';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';

export const ON_USER_LOGOUT = "ON_USER_LOGOUT";

export const ON_ACCESS_DENIED = 'ON_ACCESS_DENIED';

const onLoginBegin = () => {
  return {
    type: ON_LOGIN_BEGIN,
    error: undefined,
  };
}

const onLoginSuccess = (data) => {
  return {
    type: ON_LOGIN_SUCCESS,
    payload: data,
  };
}

const onLoginFailure = (error) => {
  return {
    type: ON_LOGIN_FAILURE,
    error,
  };
}

const onLogout = () => {
  return {
    type: ON_USER_LOGOUT,
  };
}

const onAccessDenied = () => {
  return {
    type: ON_ACCESS_DENIED,
  };
}

export const login = (data, callback = () => { }) => {
  return dispatch => {
    dispatch(onLoginBegin());
    post("/auth/login", {
      username: data.username,
      password: data.password,
    }).then((res) => {
      dispatch(onLoginSuccess({
        ...res.data.user,
        token: res.data.token
      }))
      callback(res);
    })
      .catch((err) => {
        onLoginFailure(err);
        callback(undefined, err);
      });
  };
}

export const logout = () => {
  return dispatch => {
    dispatch(onLogout());
  };
}
export const handleAccessDenied = () => {
  return dispatch => {
    dispatch(onAccessDenied());
  };
}