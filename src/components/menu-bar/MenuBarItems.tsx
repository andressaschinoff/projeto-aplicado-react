import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  MenuItemsHeader,
  MenuItemsOptions,
} from "../../styles/menu-bar/menu-items.style";

import { useMenuStyle } from "../../styles/menu-bar/menu-bar.style";
import TrollerContext from "../../hooks/TrollerContext";
import AuthContext from "../../hooks/AuthContext";

export function MenuItems() {
  const { linkDefault, linkOutline } = useMenuStyle();
  const { troller } = useContext(TrollerContext);
  const { signed, user } = useContext(AuthContext);
  const [quantities, setQuantities] = useState(0);

  useEffect(() => {
    const quantity =
      !!troller && !!troller.products
        ? troller.products?.reduce((acc, curr) => acc + curr.quantity, 0)
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
            to={signed ? "/login" : "/perfil"}
            color="inherit"
          >
            <Typography id="text" variant="subtitle1">
              {signed ? "Perfil" : "Login"}
            </Typography>
          </Button>
        </li>
        <li>
          <Button component={Link} to="/registrar" color="inherit">
            <Typography id="text" variant="subtitle1">
              Registrar
            </Typography>
          </Button>
        </li>
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
      </MenuItemsOptions>
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
