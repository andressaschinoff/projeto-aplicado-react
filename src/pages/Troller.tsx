import { useContext, useEffect } from "react";
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
import { useTroller } from "../hooks/useTroller";

interface Props {}

export default function Troller(props: Props) {
  const history = useHistory();
  const { troller, setIsCheckout, setTroller } = useContext(TrollerContext);
  const { signed, user } = useContext(AuthContext);
  const { getActive } = useTroller();
  const classes = useTrollerStyle();

  useEffect(() => {
    const id = signed ? user.id : null;
    (async () => {
      const { data } = await getActive(id);
      setTroller(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed, user, troller.active]);

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
      <CenterContainer>
        {!!troller && !!troller.orderItems && troller.orderItems.length > 0 ? (
          <>
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
              {!!troller?.orderItems &&
                !!troller.orderItems[0]?.product &&
                troller?.orderItems
                  .sort((a, b) => a.quantity - b.quantity)
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
                  !!troller?.orderItems && !!troller.orderItems[0]?.product
                    ? `/feira/${troller?.fair?.id}`
                    : "/"
                }
                color="primary"
                variant="body1"
              >
                {!!troller?.orderItems && !!troller.orderItems[0]?.product
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Comprar
            </Button>
          </>
        ) : (
          <Box className={classes.noContent}>
            <Typography>Você ainda não tem produtos adicionados.</Typography>
          </Box>
        )}
      </CenterContainer>
    </MainContainer>
  );
}
