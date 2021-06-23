import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import BudgetPage from "./pages/BudgetPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/budget" component={BudgetPage} />
        <Route path="/app/transactions" component={TransactionsPage} />
        <Route path="/app/projects" component={ProjectsPage} />
        <Redirect from="/app" to="/app/dashboard" />
      </Switch>
    </Router>
  );
};

export default App;
