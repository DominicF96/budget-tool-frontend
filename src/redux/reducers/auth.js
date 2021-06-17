import {
  ON_LOGIN_BEGIN,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
  ON_USER_LOGOUT,
} from "../actions/auth";

const initialState = {
  error: undefined,
  data: undefined,
  isLoadingLogin: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ON_LOGIN_BEGIN:
      return {
        ...state,
        isLoadingLogin: true,
        error: action.error,
      };
    case ON_LOGIN_SUCCESS:
      return {...state, isLoadingLogin: false, ...action.payload};
    case ON_LOGIN_FAILURE:
      return {
        ...state,
        isLoadingLogin: false,
        error: action.error,
      };
    case ON_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
