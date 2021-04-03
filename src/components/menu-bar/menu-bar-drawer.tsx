import { Link } from "react-router-dom";
import { Button, IconButton, Drawer, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { MenuDrawerContainer } from "../../styles/menu-bar/menu-drawer.style";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useContext, useEffect, useState } from "react";
import TrollerContext from "../../hooks/TrollerContext";

export interface Props {
  open: boolean;
  onClose: () => void;
}

function MenuDrawer(props: Props) {
  const { open, onClose } = props;
  const { troller } = useContext(TrollerContext);
  const [quantities, setQuantities] = useState(0);

  useEffect(() => {
    const quantity =
      !!troller && !!troller.products
        ? troller.products?.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0;
    console.log(quantity);
    setQuantities(quantity);
  }, [troller]);

  return (
    <Drawer anchor="right" variant="persistent" open={open} onClose={onClose}>
      <MenuDrawerContainer>
        <Button onClick={() => onClose()}>
          <Close />
        </Button>
        <Button color="secondary" onClick={onClose}>
          <Link to="/">
            <Typography id="text" variant="subtitle1">
              Home
            </Typography>
          </Link>
        </Button>
        <Button color="secondary" onClick={onClose}>
          <Link to="/login">
            <Typography id="text" variant="subtitle1">
              {/* {signed && person?.isActive ? "Perfil" : "Login"} */}
              Login
            </Typography>
          </Link>
          {/* {signed && person?.isActive ? 'Perfil' : 'Login'} */}
        </Button>
        <Button color="secondary" onClick={onClose}>
          <Link to="/login">
            <Typography id="text" variant="subtitle1">
              Registrar
            </Typography>
          </Link>
        </Button>
        <Button variant="outlined" color="primary" onClick={onClose}>
          <Link to="/login">
            <Typography id="text" variant="subtitle1">
              Cadastrar Feira?
            </Typography>
          </Link>
        </Button>
        <IconButton color="primary">
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
