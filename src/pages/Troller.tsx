import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TrollerContext from "../hooks/TrollerContext";
import { IFair, useFair } from "../hooks/useFair";
import { defaultFair } from "../helpers/defaults";
import { MainContainer } from "../styles/main.style";
import {
  CenterContainer,
  LineBreak,
  useTrollerStyle,
} from "../styles/troller.style";
import { Button } from "@material-ui/core";

interface Props {}

export default function Troller(props: Props) {
  const { fairTroller, troller } = useContext(TrollerContext);
  const { getOne } = useFair();
  const classes = useTrollerStyle();
  const [fair, setFair] = useState<IFair>(defaultFair);

  useEffect(() => {
    if (!!fairTroller) {
      (async () => {
        const { data, status } = await getOne(fairTroller);
        if (status >= 300) {
          return;
        }
        setFair(data);
      })();
    }
    return () => {
      // cleanup;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fairTroller]);

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

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
                {fair?.name || "Feira"}{" "}
              </Typography>
            </Box>
          </Box>
          <LineBreak />
          <Box className={classes.products}>
            <Typography className={classes.text}>Produtos</Typography>
            {troller?.orderItens?.map(({ quantity, product, total }) => {
              return (
                <Box className={classes.elements}>
                  <Typography>
                    {quantity} X {product?.name}
                  </Typography>
                  <Typography>{total}</Typography>
                </Box>
              );
            })}
            <Link
              className={classes.link}
              component={RouterLink}
              to={`/feira/${fair?.id}`}
              onClick={preventDefault}
              color="error"
              variant="body1"
            >
              Adicionar mais produtos
            </Link>
          </Box>
          <LineBreak />
          <Box className={classes.container}></Box>
          <Box className={classes.container}>
            <Box className={classes.elements}>
              <Typography>Subtotal</Typography>
              <Typography>R$ {troller?.total}</Typography>
            </Box>
            <Box className={classes.elements}>
              <Typography>Taxa de entrega</Typography>
              <Typography>R$ {fair?.deliveryPrice}</Typography>
            </Box>
            <Box className={classes.elements}>
              <Typography>Total</Typography>
              <Typography>R$ {troller?.total + fair?.deliveryPrice}</Typography>
            </Box>
          </Box>
        </CenterContainer>
      )}
    </MainContainer>
  );
}
