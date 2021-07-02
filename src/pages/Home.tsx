import { BrowserRouter as Router } from "react-router-dom";
import Container from "@material-ui/core/Container";
import MenuBar from "../components/menu-bar/MenuBar";
import {
  LandingFairContainer,
  LandingMainContainer,
} from "../styles/fairs/fairs.style";

import Routes from "../routes";
import { useMainStyle } from "../styles/main.style";

function Home() {
  const { mainContainer } = useMainStyle();
  return (
    <Router>
      <LandingMainContainer>
        <MenuBar />
        <LandingFairContainer>
          <Container className={mainContainer}>
            <Routes />
          </Container>
        </LandingFairContainer>
      </LandingMainContainer>
    </Router>
  );
}

export default Home;
