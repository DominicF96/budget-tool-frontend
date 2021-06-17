import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import auth from "./auth";
import user from "./user";

const appReducer = combineReducers({
  auth,
  user,
});

// This enables the Redux debugging tool in the browser
// Install the Redux-devtools to access redux's state in your browser;
// Chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=fr
// Firefox: https://addons.mozilla.org/fr/firefox/addon/reduxdevtools/
const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
