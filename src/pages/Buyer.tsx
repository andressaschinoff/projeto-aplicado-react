import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import AuthContext from "../hooks/AuthContext";

import { MainContainer, LineBreak } from "../styles/main.style";
import { usePerfilStyle } from "../styles/perfil.style";
import { ITroller, useTroller } from "../hooks/useTroller";
import { roundedNumber } from "../helpers/functions";

const Buyer: React.FC = () => {
  const { user, signed } = useContext(AuthContext);
  const { getAllbyUser } = useTroller();
  const classes = usePerfilStyle();
  const [activeTrollers, setActiveTrollers] = useState<ITroller[]>([]);
  const [inactiveTrollers, setInactiveTrollers] = useState<ITroller[]>([]);

  useEffect(() => {
    if (signed && !!user) {
      (async () => {
        const { data } = await getAllbyUser(user);
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
        <Box className={classes.container} />
        <Typography variant="subtitle1">Seu endereço de entrega:</Typography>
        <Box className={classes.name}>
          <Typography variant="body1">
            {user?.address?.replace("|", ", ").split("|")[0]}{" "}
            {user?.address?.replaceAll("|", ", ").split("|")[1]}
          </Typography>
          <Typography variant="body1">
            {user?.address?.split("|")[3]}
          </Typography>
          <Typography variant="body1">
            {user?.address?.split("|")[4]}
          </Typography>
          <Typography variant="body1">
            {user?.address?.split("|")[5]}
          </Typography>
        </Box>
      </Box>
      <LineBreak />
      <Box className={classes.container}>
        <Typography variant="subtitle1">Pedido em aberto:</Typography>
        {activeTrollers.map(({ id, total, fair }) => {
          if (total === 0) {
            return <Typography></Typography>;
          } else {
            return (
              <Box key={id} className={classes.borderBox}>
                <Typography variant="subtitle2">{fair?.name}</Typography>
                <Typography variant="subtitle2">
                  R$ {roundedNumber(total)}
                </Typography>
              </Box>
            );
          }
        })}
      </Box>
      <Box className={classes.container}>
        <Typography variant="subtitle1">Pedidos anteriores:</Typography>
        {inactiveTrollers.length > 0 ? (
          inactiveTrollers.map(({ id, total, fair }) => {
            return (
              <Box key={id} className={classes.borderBox}>
                <Typography variant="subtitle2">{fair?.name}</Typography>
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

export default Buyer;
