import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  MenuItemsHeader,
  MenuItemsOptions,
} from "../../styles/menu-bar/menu-items.style";

import { useMenuStyle } from "../../styles/menu-bar/menu-bar.style";
import { useContext, useEffect, useState } from "react";
import TrollerContext from "../../hooks/TrollerContext";

export function MenuItems() {
  const { linkDefault, linkOutline } = useMenuStyle();
  const { troller } = useContext(TrollerContext);
  const [quantities, setQuantities] = useState(0);

  useEffect(() => {
    const quantity =
      !!troller && !!troller.products
        ? troller.products?.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0;
    setQuantities(quantity);
  }, [troller]);

  return (
    <Router>
      <MenuItemsHeader>
        <MenuItemsOptions className="menu-options">
          <li>
            <Button component={RouterLink} to="/" color="inherit">
              <Typography id="text" variant="subtitle1">
                Home
              </Typography>
            </Button>
          </li>
          <li>
            <Button component={RouterLink} to="/login" color="inherit">
              <Typography id="text" variant="subtitle1">
                {/* {signed && person?.isActive ? "Perfil" : "Login"} */}
                Login
              </Typography>
            </Button>
          </li>
          <li>
            <Button component={RouterLink} to="/registrar" color="inherit">
              <Typography id="text" variant="subtitle1">
                Registrar
              </Typography>
            </Button>
          </li>
          <li>
            <Button
              component={RouterLink}
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
        <IconButton component={RouterLink} to="/carrinho" color="primary">
          <ShoppingCartIcon fontSize="large" color="primary" />
          {quantities > 0 && (
            <Typography variant="body2" color="error">
              {quantities}
            </Typography>
          )}
        </IconButton>
      </MenuItemsHeader>
    </Router>
  );
}

export default MenuItems;
