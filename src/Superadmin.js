import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import SuperadminDashboardPage from "./pages/superadmin/SuperadminDashboardPage";

const Superadmin = () => {
  return (
    <Router>
      <Switch>
        <Route path="/superadmin/dashboard" component={SuperadminDashboardPage} />
        <Redirect from="/superadmin" to="/superadmin/dashboard" />
      </Switch>
    </Router>
  );
};

export default Superadmin;
