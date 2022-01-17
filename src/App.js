import React from "react";
import { Router, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
import GithubLogin from "./GithubLogin";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./routes/AuthRoute";
import Routes from "./routes/RouteConstant";
import Activity from "./pages/Activity";

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
        <Switch>
          <AuthRoute path={Routes.DASHBOARD} component={Dashboard} type="private" />           
          <AuthRoute path={Routes.ACTIVITY} component={Activity} type="private" />           
          <AuthRoute path={Routes.ROOT} exact component={GithubLogin} type="guest" />
        </Switch>
    </Router>
  );
}

export default App
