import { Switch, Route } from "react-router-dom";
import Fair from "./pages/Fair";
import FairRegister from "./pages/FairRegister";
import Fairs from "./pages/Fairs";
import Login from "./pages/Login";
import Troller from "./pages/Troller";
import UserRegister from "./pages/UserRegister";

const routes = [
  {
    path: "/feira",
    exact: true,
    component: Fair,
  },
  {
    path: "/registrar",
    exact: true,
    component: UserRegister,
  },
  {
    path: "/carrinho",
    exact: true,
    component: Troller,
  },
  {
    path: "/cadastrar-feira",
    exact: true,
    component: FairRegister,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/perfil",
    exact: true,
    component: UserRegister,
  },
  {
    path: "/",
    exact: true,
    component: Fairs,
  },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouterConfig key={i} {...route} />
      ))}
    </Switch>
  );
}

// @ts-ignore
function RouterConfig(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
