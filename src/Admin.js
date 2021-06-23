import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

const Admin = () => {
  return (
    <Router>
      {console.log("ADMIN !")}
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboardPage} />
        <Redirect from="/admin" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
};

export default Admin;
