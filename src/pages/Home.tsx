import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "../components/menu-bar/MenuBar";
import {
  LandingFairContainer,
  LandingMainContainer,
} from "../styles/fairs/fairs.style";

import Routes from "../routes";

function Home() {
  return (
    <Router>
      <LandingMainContainer>
        <MenuBar />
        <LandingFairContainer>
          <Routes />
        </LandingFairContainer>
      </LandingMainContainer>
    </Router>
  );
}

export default Home;
