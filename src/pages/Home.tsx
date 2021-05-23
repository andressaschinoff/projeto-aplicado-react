import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import MenuBar from "../components/menu-bar/MenuBar";
import {
  LandingFairContainer,
  LandingMainContainer,
} from "../styles/fairs/fairs.style";

import Fairs from "./Fairs";
import Fair from "./Fair";
import UserRegister from "./UserRegister";
import FairRegister from "./FairRegister";
import Login from "./Login";

const Home: React.FC = () => {
  return (
    <Router>
      <LandingMainContainer>
        <MenuBar />
        <LandingFairContainer>
          <Switch>
            <Route exact path="/">
              <Fairs />
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
            <Route exact path="/cadastrar-feira">
              <FairRegister />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/perfil">
              <UserRegister />
            </Route>
          </Switch>
        </LandingFairContainer>
      </LandingMainContainer>
    </Router>
  );
};

export default Home;
