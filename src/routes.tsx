import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

const routes = [
  {
    path: "/",
    component: Home,
  },
];

export default function Routes() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouterConfig key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

//@ts-ignore
function RouterConfig(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
