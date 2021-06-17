import {get} from "../../utils/http/fetching_utils";

// ========================================================================= //
// ================================= TYPES ================================= //
// ========================================================================= //

export const ON_LOAD_USER_BEGIN = "ON_LOAD_USER_BEGIN";
export const ON_LOAD_USER_SUCCESS = "ON_LOAD_USER_SUCCESS";
export const ON_LOAD_USER_FAILURE = "ON_LOAD_USER_FAILURE";

function onLoadUserBegin() {
  return {
    type: ON_LOAD_USER_BEGIN,
  };
}

function onLoadUserSuccess(payload) {
  return {
    type: ON_LOAD_USER_SUCCESS,
    payload,
  };
}

function onLoadUserFailure(err) {
  return {
    type: ON_LOAD_USER_FAILURE,
    err,
  };
}

// ========================================================================= //
// ================================ ACTIONS ================================ //
// ========================================================================= //

export function loadUser(callback = () => {}) {
  return dispatch => {
    dispatch(onLoadUserBegin());
    get(
      "/user",
      res => {
        dispatch(onLoadUserSuccess(res.data));
        callback(res, undefined);
      },
      err => {
        console.error(err);
        dispatch(onLoadUserFailure(err));
        callback(undefined, err);
      }
    );
  };
}
