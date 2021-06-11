import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TrollerContext from "../hooks/TrollerContext";
import { MainContainer, LineBreak } from "../styles/main.style";
import { CenterContainer, useTrollerStyle } from "../styles/troller.style";
import { roundedNumber } from "../helpers/functions";
import Button from "@material-ui/core/Button";
import AuthContext from "../hooks/AuthContext";

interface Props {}

export default function Troller(props: Props) {
  const history = useHistory();
  const { troller, setIsCheckout } = useContext(TrollerContext);
  const { signed } = useContext(AuthContext);
  const classes = useTrollerStyle();

  const handleCheckout = () => {
    setIsCheckout(true);
    if (!signed) {
      history.push("/login");
    } else {
      history.push("/compra");
    }
  };

  return (
    <MainContainer>
      {!!troller && (
        <CenterContainer>
          <Box className={classes.container}>
            <Typography color="textPrimary" variant="h5">
              Pedido feito em
            </Typography>
            <Box className={classes.fairContainer}>
              <Avatar className={classes.avatar} />
              <Typography className={classes.fairName}>
                {troller?.fair?.name}
              </Typography>
            </Box>
          </Box>
          <LineBreak />
          <Box className={classes.products}>
            <Typography className={classes.text}>Produtos</Typography>
            {!!troller?.orderItens &&
              !!troller.orderItens[0]?.product &&
              troller?.orderItens
                // .sort((a, b) => a.product?.name.localeCompare(b.product?.name))
                .map(({ quantity, product, total }) => {
                  return (
                    <Box className={classes.elements}>
                      <Typography>
                        {quantity} X {product?.name}
                      </Typography>
                      <Typography>{roundedNumber(total)}</Typography>
                    </Box>
                  );
                })}
            <Link
              className={classes.link}
              component={RouterLink}
              to={
                !!troller?.orderItens && !!troller.orderItens[0]?.product
                  ? `/feira/${troller?.fair?.id}`
                  : "/"
              }
              color="error"
              variant="body1"
            >
              {!!troller?.orderItens && !!troller.orderItens[0]?.product
                ? "Adicionar mais produtos"
                : "Adicionar produtos"}
            </Link>
          </Box>
          <LineBreak />
          <Box className={classes.container}></Box>
          <Box className={classes.container}>
            <Box className={classes.elements}>
              <Typography>Subtotal</Typography>
              <Typography>R$ {roundedNumber(troller?.subtotal)}</Typography>
            </Box>
            <Box className={classes.elements}>
              <Typography>Taxa de entrega</Typography>
              <Typography>
                R$ {roundedNumber(troller?.fair?.deliveryPrice)}
              </Typography>
            </Box>
            <Box className={classes.elements}>
              <Typography>Total</Typography>
              <Typography>R$ {roundedNumber(troller?.total)}</Typography>
            </Box>
          </Box>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Comprar
          </Button>
        </CenterContainer>
      )}
    </MainContainer>
  );
}
