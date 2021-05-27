import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import App from './App';
import ErrorPage from "./pages/ErrorPage";
import LoginPage from './pages/auth/LoginPage';
import reportWebVitals from './reportWebVitals';
import ValidationPage from './pages/auth/ValidationPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import RegistrationPage from './pages/auth/RegistrationPage';

import fr from "./translations/fr.json";
import en from "./translations/en.json";
import { getLang } from './utils/browserFunctions';

import './styles/index.scss';

const dict = {
  fr,
  en
}
const lang = getLang();

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={dict[lang]} locale={lang} defaultLocale="en">
      <Router>
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegistrationPage} />
          <Route path="/auth/forgot_password" component={ForgotPasswordPage} />
          <Route path="/auth/validate" component={ValidationPage} />
          <Route path="/app" component={App} />
          <Route path="/error500" component={ErrorPage} />
          <Route path="/error404" component={ErrorPage} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
