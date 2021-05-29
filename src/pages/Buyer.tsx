import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import AuthContext from "../hooks/AuthContext";

import { MainContainer, LineBreak } from "../styles/main.style";
import { usePerfilStyle } from "../styles/perfil.style";

const Buyer: React.FC = () => {
  const { user } = useContext(AuthContext);
  const classes = usePerfilStyle();
  return (
    <MainContainer>
      <Box>
        <Typography className={classes.helloText} variant="h5">
          Olá
        </Typography>
        <Typography variant="h4">{user?.name}</Typography>
      </Box>
      <LineBreak />
    </MainContainer>
  );
};

export default Buyer;
