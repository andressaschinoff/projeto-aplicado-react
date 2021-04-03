import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fair from "./pages/fair";
import Landing from "./pages/landing.page";

const routes = [
  {
    path: "/",
    exact: true,
    component: Landing,
  },
  {
    path: "/login",
    exact: true,
    component: Landing,
  },
  {
    path: "/feira",
    exact: true,
    component: Fair,
  },
  // {
  //   path: "/feira",
  //   component: "",
  //   routes: [
  //     {
  //       path: "/tacos/bus",
  //       component: Bus
  //     },
  //     {
  //       path: "/tacos/cart",
  //       component: Cart
  //     }
  //   ]
  // }
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
