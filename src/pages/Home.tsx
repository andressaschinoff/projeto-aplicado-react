import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import MenuBar from "../components/menu-bar/menu-bar";
import {
  LandingFairContainer,
  LandingMainContainer,
} from "../styles/fairs/fairs.style";

import Fairs from "./Fairs";
import Fair from "./Fair";
import UserRegister from "./UserRegister";
import FairRegister from "./FairRegister";

const Home: React.FC = () => {
  return (
    <Router>
      <LandingMainContainer>
        <Container maxWidth="lg">
          <MenuBar />
        </Container>
        <LandingFairContainer>
          <Route exact path="/">
            <Container maxWidth="lg">
              <Fairs />
            </Container>
          </Route>
          <Route exact path="/feira">
            <Fair />
          </Route>
          <Route exact path="/registrar">
            <UserRegister />
          </Route>
          <Route exact path="/carrinho">
            <UserRegister />
          </Route>
          <Route exact path="/cadastrarfeira">
            {/* <FairRegister /> */}
          </Route>
          <Route exact path="/login">
            <UserRegister />
          </Route>
          <Route exact path="/cadastro">
            <UserRegister />
          </Route>
        </LandingFairContainer>
      </LandingMainContainer>
    </Router>
  );
};

export default Home;
