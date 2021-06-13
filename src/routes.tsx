import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./hooks/AuthContext";
import Buyer from "./pages/Buyer";
import Checkout from "./pages/Checkout";
import Fair from "./pages/Fair";
import FairRegister from "./pages/FairRegister";
import Fairs from "./pages/Fairs";
import Login from "./pages/Login";
import ProductRegister from "./pages/ProductRegister";
import Seller from "./pages/Seller";
import Troller from "./pages/Troller";
import UserRegister from "./pages/UserRegister";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/carrinho" component={Troller} />
      <Route path="/registrar" component={UserRegister} />
      <Route path="/feira/:id" component={Fair} />
      {/* <BuyerRoute path="/perfil"> */}
      <Route path="/perfil">
        <Buyer />
      </Route>
      {/* </BuyerRoute> */}
      {/* <SellerRoute path="/area-do-vendedor"> */}
      <Route path="/area-do-vendedor">
        <Seller />
      </Route>
      {/* </SellerRoute> */}
      <SellerRoute path="/cadastrar-feira">
        <FairRegister />
      </SellerRoute>
      <SellerRoute path="/cadastrar-produto/:id">
        <ProductRegister />
      </SellerRoute>
      <BuyerRoute path="/compra">
        <Checkout />
      </BuyerRoute>
      <Route exact path="/" component={Fairs} />
    </Switch>
  );
}

//@ts-ignore
function BuyerRoute({ children, ...rest }) {
  const { signed, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signed && user?.role === "buyer" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

// @ts-ignore
function SellerRoute({ children, ...rest }) {
  const { user, signed } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signed && user?.role === "seller" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
