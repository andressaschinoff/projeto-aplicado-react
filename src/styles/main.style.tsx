import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const MainContainer = styled(Box)`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 200px);
  padding: 30px 70px;
  border-radius: 20px;
  background-color: #fff;
  overflow: auto;
`;

const useMainStyle = makeStyles((theme: Theme) => ({
  root: {},
  secondaryText: {
    color: "#FFFFFF",
  },
  flexBox: {
    display: "flex",
  },
  addIcon: {
    fontSize: "40px",
  },
  mainContainer: {
    paddingTop: "40px",
    paddingBottom: "40px",
    margin: "0 auto",
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export { MainContainer, useMainStyle };
