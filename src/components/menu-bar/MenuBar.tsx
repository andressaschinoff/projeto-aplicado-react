import { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItems from "./MenuBarItems";
import MenuDrawer from "./MenuBarDrawer";
import Logo from "../../assets/FeiraNaMaoLogo.png";

import {
  LogoSection,
  MainTitle,
  MenuHeader,
  MenuImg,
  MenuSection,
} from "../../styles/menu-bar/menu-bar.style";
import Container from "@material-ui/core/Container";

export function MenuBar() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleBackToHome = () => {
    history.push("/");
  };

  return (
    <Container maxWidth="lg">
      <MenuHeader>
        <LogoSection onClick={handleBackToHome}>
          <Box>
            <MenuImg src={Logo} alt="logo" />
          </Box>
          <Hidden xsDown>
            <Box>
              <MainTitle style={{ marginLeft: "10px" }}>Feira</MainTitle>
              <MainTitle>na Mão</MainTitle>
            </Box>
          </Hidden>
        </LogoSection>
        <Hidden mdUp>
          <MenuSection>
            <Button onClick={() => setOpen(true)}>
              <MenuIcon />
            </Button>
          </MenuSection>
        </Hidden>
        {open && <MenuDrawer open={open} onClose={() => setOpen(false)} />}
        <Hidden smDown>
          <MenuSection>
            <MenuItems />
          </MenuSection>
        </Hidden>
      </MenuHeader>
    </Container>
  );
}

export default MenuBar;
