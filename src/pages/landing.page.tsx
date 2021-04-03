import { Container } from "@material-ui/core";
import MenuBar from "../components/menu-bar/menu-bar";
import React from "react";
import Fairs from "./fairs";
import {
  LandingFairContainer,
  LandingMainContainer,
} from "../styles/fairs/fairs.style";

const Landing: React.FC = () => {
  return (
    <LandingMainContainer>
      <Container maxWidth="lg">
        <MenuBar />
      </Container>
      <LandingFairContainer>
        <Container maxWidth="lg">
          <Fairs />
        </Container>
      </LandingFairContainer>
    </LandingMainContainer>
  );
};

export default Landing;
