import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import { LineBreak, MainContainer } from "../styles/main.style";
import { usePerfilStyle } from "../styles/perfil.style";

const Seller: React.FC = () => {
  const { user } = useContext(AuthContext);
  const classes = usePerfilStyle();

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
        <Typography variant="subtitle1">Pedidos feitos para você:</Typography>
        {/* {allTrollers.map(({ active, id, total, fair }) => {
          return (
            active === false && (
              <Box key={id} className={classes.borderBox}>
                <Typography variant="subtitle2">{fair?.name}</Typography>
                <Typography variant="subtitle2">
                  R$ {roundedNumber(total)}
                </Typography>
              </Box>
            )
          );
        })} */}
      </Box>
    </MainContainer>
  );
};

export default Seller;
