import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import DashboardPage from "./pages/user/DashboardPage";
import BudgetPage from "./pages/user/BudgetPage";
import TransactionsPage from "./pages/user/TransactionsPage";
import ProjectsPage from "./pages/user/ProjectsPage";
import UserProfilePage from "./pages/user/UserProfilePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/budget" component={BudgetPage} />
        <Route path="/app/transactions" component={TransactionsPage} />
        <Route path="/app/projects" component={ProjectsPage} />
        <Route path="/app/profile" component={UserProfilePage} />
        <Redirect from="/app" to="/app/dashboard" />
      </Switch>
    </Router>
  );
};

export default App;
