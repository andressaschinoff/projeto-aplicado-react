import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { roundedNumber } from "../helpers/functions";
import AuthContext from "../hooks/AuthContext";
import { ITroller, useTroller } from "../hooks/useTroller";
import { LineBreak, MainContainer } from "../styles/main.style";
import { usePerfilStyle } from "../styles/perfil.style";

const Seller: React.FC = () => {
  const { user, signed } = useContext(AuthContext);
  const { getAllbyUser } = useTroller();
  const classes = usePerfilStyle();

  const [activeTrollers, setActiveTrollers] = useState<ITroller[]>([]);
  const [inactiveTrollers, setInactiveTrollers] = useState<ITroller[]>([]);

  useEffect(() => {
    console.log(user);
    if (signed && !!user) {
      (async () => {
        const { data } = await getAllbyUser(user);
        console.log(data);
        setActiveTrollers(data.actives);
        setInactiveTrollers(data.inactives);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <MainContainer>
      <Box className={classes.container}>
        <Typography variant="h6">Olá</Typography>
        <Typography className={classes.name} variant="h5">
          {user?.name}
        </Typography>
        <Box className={classes.container} />
      </Box>
      <LineBreak />
      <Box className={classes.container}>
        <Typography variant="subtitle1">Pedido em aberto:</Typography>
        {activeTrollers.length > 0 ? (
          activeTrollers.map(({ id, total, user, orderItems, orderNumber }) => {
            return (
              <Box key={id} className={classes.borderBox}>
                <Typography variant="subtitle2">{orderNumber}</Typography>
                <Typography variant="subtitle2">{user?.name}</Typography>
                {!!orderItems ? (
                  orderItems.map(({ id, quantity, product }) => {
                    return (
                      <Box key={id}>
                        <Typography>{quantity}</Typography>
                        <Typography>{product?.name}</Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography></Typography>
                )}
                <Typography variant="subtitle2">
                  R$ {roundedNumber(total)}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography>Você não tem nenhum pedido aberto.</Typography>
        )}
      </Box>
      <Box className={classes.container}>
        <Typography variant="subtitle1">Pedidos anteriores:</Typography>
        {inactiveTrollers.length > 0 ? (
          inactiveTrollers.map(({ id, total, user, orderNumber }) => {
            return (
              <Box key={id} className={classes.borderBox}>
                <Typography variant="subtitle2">{orderNumber}</Typography>
                <Typography variant="subtitle2">{user?.name}</Typography>
                <Typography variant="subtitle2">
                  R$ {roundedNumber(total)}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography>Você não tem nenhum pedido anterior.</Typography>
        )}
      </Box>
    </MainContainer>
  );
};

export default Seller;
