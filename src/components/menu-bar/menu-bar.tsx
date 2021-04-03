import { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItems from "./menu-bar-items";
import MenuDrawer from "./menu-bar-drawer";
import Logo from "../../assets/FeiraNaMaoLogo.png";

import {
  LogoSection,
  MenuHeader,
  MenuImg,
  MenuSection,
} from "../../styles/menu-bar/menu-bar.style";

export function MenuBar() {
  const [open, setOpen] = useState(false);

  return (
    <MenuHeader>
      <LogoSection>
        <Box>
          <MenuImg src={Logo} alt="logo" />
        </Box>
        <Hidden xsDown>
          <Typography variant="h5">Feira na Mão</Typography>
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
  );
}

export default MenuBar;
