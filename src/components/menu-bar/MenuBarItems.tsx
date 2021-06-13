import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  MenuItemsHeader,
  MenuItemsOptions,
} from "../../styles/menu-bar/menu-items.style";

import TrollerContext from "../../hooks/TrollerContext";
import AuthContext from "../../hooks/AuthContext";

export function MenuItems() {
  const { push } = useHistory();
  const { troller, setIsCheckout } = useContext(TrollerContext);
  const { signed, user, logout } = useContext(AuthContext);
  const [quantities, setQuantities] = useState(0);

  useEffect(() => {
    const quantity =
      !!troller && !!troller.orderItems
        ? troller.orderItems?.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0;
    setQuantities(quantity);
  }, [troller]);

  return (
    <MenuItemsHeader>
      <MenuItemsOptions className="menu-options">
        <li>
          <Button component={Link} to="/" color="inherit">
            <Typography id="text" variant="subtitle1">
              Home
            </Typography>
          </Button>
        </li>
        <li>
          <Button
            component={Link}
            to={signed ? "/perfil" : "/login"}
            color="inherit"
          >
            <Typography id="text" variant="subtitle1">
              {signed ? "Perfil" : "Login"}
            </Typography>
          </Button>
        </li>
        {!signed && (
          <li>
            <Button
              component={Link}
              to="/registrar"
              variant="outlined"
              color="primary"
            >
              <Typography id="text" variant="subtitle1">
                Registrar
              </Typography>
            </Button>
          </li>
        )}
        {signed && user?.role === "seller" && (
          <li>
            <Button
              component={Link}
              to="/cadastrar-feira"
              variant="outlined"
              color="primary"
            >
              <Typography id="text" variant="subtitle1">
                Cadastrar Feira?
              </Typography>
            </Button>
          </li>
        )}
      </MenuItemsOptions>
      {signed && (
        <IconButton
          color="primary"
          onClick={() => {
            setIsCheckout(false);
            logout();
            push("/");
          }}
        >
          <ExitToAppIcon fontSize="large" color="error" />
        </IconButton>
      )}
      <IconButton component={Link} to="/carrinho" color="primary">
        <ShoppingCartIcon fontSize="large" color="primary" />
        {quantities > 0 && (
          <Typography variant="body2" color="error">
            {quantities}
          </Typography>
        )}
      </IconButton>
    </MenuItemsHeader>
  );
}

export default MenuItems;
