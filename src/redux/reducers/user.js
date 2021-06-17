import {
  ON_LOAD_USER_BEGIN,
  ON_LOAD_USER_FAILURE,
  ON_LOAD_USER_SUCCESS,
} from "../actions/user";

const initialState = {
  error: undefined,
  isLoadingUser: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ON_LOAD_USER_BEGIN:
      return {
        ...state,
        isLoadingUser: true,
        error: action.error,
      };
    case ON_LOAD_USER_SUCCESS:
      return {...state, isLoadingUser: false, ...action.payload};
    case ON_LOAD_USER_FAILURE:
      return {
        ...state,
        isLoadingUser: false,
        error: action.error,
      };
    default:
      return state;
  }
}
