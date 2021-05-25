import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Drawer, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { MenuDrawerContainer } from "../../styles/menu-bar/menu-drawer.style";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TrollerContext from "../../hooks/TrollerContext";
import AuthContext from "../../hooks/AuthContext";
import Routes from "../../routes";
import Fairs from "../../pages/Fairs";
import Fair from "../../pages/Fair";
import UserRegister from "../../pages/UserRegister";
import FairRegister from "../../pages/FairRegister";
import Login from "../../pages/Login";

export interface Props {
  open: boolean;
  onClose: () => void;
}

function MenuDrawer(props: Props) {
  const { open, onClose } = props;
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
    <Drawer anchor="right" variant="persistent" open={open} onClose={onClose}>
      <MenuDrawerContainer>
        <Button onClick={onClose}>
          <Close />
        </Button>
        <Button color="secondary" component={Link} to="/" onClick={onClose}>
          <Typography id="text" variant="subtitle1">
            Home
          </Typography>
        </Button>
        <Button
          color="secondary"
          component={Link}
          to={signed ? "/login" : "/perfil"}
          onClick={onClose}
        >
          <Typography id="text" variant="subtitle1">
            {signed ? "Perfil" : "Login"}
          </Typography>
        </Button>
        {!signed && (
          <Button
            color="secondary"
            component={Link}
            to="/registrar"
            onClick={onClose}
          >
            <Typography id="text" variant="subtitle1">
              Registrar
            </Typography>
          </Button>
        )}
        {signed && user?.role === "seller" && (
          <Button
            variant="outlined"
            component={Link}
            to="/cadastrar-feira"
            color="primary"
            onClick={onClose}
          >
            <Typography id="text" variant="subtitle1">
              Cadastrar Feira?
            </Typography>
          </Button>
        )}
        <IconButton
          component={Link}
          to="/carrinho"
          color="primary"
          onClick={onClose}
        >
          <ShoppingCartIcon fontSize="large" color="primary" />
          {quantities > 0 && (
            <Typography variant="body2" color="error">
              {quantities}
            </Typography>
          )}
        </IconButton>
      </MenuDrawerContainer>
    </Drawer>
  );
}

export default MenuDrawer;
