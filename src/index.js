import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider} from "react-intl";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./App";
import Admin from "./Admin";
import Superadmin from "./Superadmin";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/auth/LoginPage";
import reportWebVitals from "./reportWebVitals";
import ValidationPage from "./pages/auth/ValidationPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ValidationEmailSentPage from "./pages/auth/ValidationEmailSentPage";

import store from "./redux/reducers/_index";

import fr from "./translations/fr.json";
import en from "./translations/en.json";
import {getLang} from "./utils/browserFunctions";

import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import RouteAuth from "./components/auth/RouteAuth";

import "./styles/index.scss";

const dict = {
  fr,
  en,
};
const lang = getLang();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <IntlProvider messages={dict[lang]} locale={lang} defaultLocale="en">
        <Router>
          <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/auth/register" component={RegistrationPage} />
            <Route path="/auth/forgot_password" component={ForgotPasswordPage} />
            <Route path="/auth/reset_password/:id" component={ResetPasswordPage} />
            <Route path="/auth/validate/:id" component={ValidationPage} />
            <Route path="/auth/check_inbox/:id" component={ValidationEmailSentPage} />
            <RouteAuth path="/app" component={App} />
            <Route path="/admin" component={Admin} />
            <Route path="/superadmin" component={Superadmin} />
            <Route path="/error500" component={ErrorPage} />
            <Route path="/error404" component={ErrorPage} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Router>
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
