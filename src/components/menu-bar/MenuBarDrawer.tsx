import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton, Drawer, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  MenuDrawerContainer,
  ItemsNumber,
  BoxItemsNumber,
} from "../../styles/menu-bar/menu-drawer.style";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrollerContext from "../../hooks/TrollerContext";
import AuthContext from "../../hooks/AuthContext";

export interface Props {
  open: boolean;
  onClose: () => void;
}

function MenuDrawer(props: Props) {
  const { open, onClose } = props;
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
          to={signed ? "/perfil" : "/login"}
          onClick={onClose}
        >
          <Typography id="text" variant="subtitle1">
            {signed ? "Perfil" : "Login"}
          </Typography>
        </Button>
        {!signed && (
          <Button
            variant="outlined"
            color="primary"
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
        {signed && (
          <IconButton
            onClick={() => {
              onClose();
              setIsCheckout(false);
              logout();
              push("/");
            }}
          >
            <ExitToAppIcon fontSize="large" color="error" />
          </IconButton>
        )}
        <IconButton
          component={Link}
          to="/carrinho"
          color="primary"
          onClick={onClose}
        >
          <ShoppingCartIcon fontSize="large" color="primary" />
          {quantities > 0 && (
            <BoxItemsNumber>
              <ItemsNumber>{quantities}</ItemsNumber>
            </BoxItemsNumber>
          )}
        </IconButton>
      </MenuDrawerContainer>
    </Drawer>
  );
}

export default MenuDrawer;
