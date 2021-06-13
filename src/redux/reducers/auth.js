import {
  ON_LOGIN_BEGIN,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
  ON_USER_LOGOUT,
} from "../actions/auth";

const initialState = {
  error: undefined,
  data: undefined,
  loadingLogin: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case ON_LOGIN_BEGIN:
      return {
        ...state,
        loadingLogin: true,
        error: action.error,
      };
    case ON_LOGIN_SUCCESS:
      return { ...state, loadingLogin: false, ...action.payload };
    case ON_LOGIN_FAILURE:
      return {
        ...state,
        loadingLogin: false,
        error: action.error,
      };
    case ON_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}