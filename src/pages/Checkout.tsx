import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import TrollerContext from "../hooks/TrollerContext";
import { useTroller } from "../hooks/useTroller";

import { MainContainer } from "../styles/main.style";
import { usePerfilStyle } from "../styles/perfil.style";
import { CenterContainer } from "../styles/troller.style";

const Checkout: React.FC = () => {
  const history = useHistory();
  const classes = usePerfilStyle();
  const { troller } = useContext(TrollerContext);
  const { checkout } = useTroller();

  const handleCheckout = async () => {
    const { status } = await checkout(troller?.id, {});

    if (status >= 300) {
      Swal.fire(
        "Ops",
        "Ocorreu um erro durante a compra, por favor tente mais tarde!",
        "error"
      );
    } else {
      Swal.fire("Parabéns", "Sua compra ocorreu com sucesso!", "success");
      history.push("/");
    }
  };

  return (
    <MainContainer>
      <CenterContainer>
        <Typography color="textPrimary" variant="h5">
          Informações de pagamento
        </Typography>
        <Box className={classes.container} />
        <Box className={classes.container} />
        <Box className={classes.elements}>
          <Typography color="textPrimary" variant="subtitle1">
            Total a pagar:
          </Typography>
          <Typography color="textPrimary" variant="subtitle2">
            R$ {troller.total}
          </Typography>
        </Box>
        <Box className={classes.container} />
        <Box className={classes.container} />
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Concluir compra
        </Button>
      </CenterContainer>
    </MainContainer>
  );
};

export default Checkout;
