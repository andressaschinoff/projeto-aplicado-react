import { makeStyles, Theme } from "@material-ui/core";
import styled from "styled-components";

const MenuHeader = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 250px auto;
  padding: 10px;
`;

const MenuSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LogoSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuImg = styled.img`
  width: 100px;
  height: 100px;
`;

const useMenuStyle = makeStyles((theme: Theme) => ({
  // linkOutline: {
  //   textDecoration: "none",
  //   color: theme.palette.primary.main,
  // },
  // linkDefault: {
  //   textDecoration: "none",
  //   color: theme.palette.grey[900],
  // },
}));

export { LogoSection, MenuHeader, MenuImg, MenuSection, useMenuStyle };
