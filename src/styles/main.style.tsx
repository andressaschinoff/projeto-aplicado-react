import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const MainContainer = styled(Box)`
  max-width: 80vw;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  min-height: calc(100vh - 220px);
  padding: 30px 70px;
  border-radius: 20px;
  background-color: #fff;
  overflow: auto;
  @media (max-width: 600px) {
    border-radius: 0;
    max-width: 100vw;
    min-height: calc(100vh - 124px);
    padding: 20px 30px;
  }
`;

const LineBreak = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
  background-color: #a6a6a5;
  opacity: 40%;
`;

const useMainStyle = makeStyles((theme: Theme) => ({
  secondaryText: {
    color: "#FFFFFF",
  },
  flexBox: {
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  mainContainer: {
    maxWidth: "1280px",
    paddingTop: "40px",
    paddingBottom: "40px",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      padding: 0,
      maxWidth: "100vw",
      maxHeight: "100vh",
    },
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  mgLeft: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));

export { MainContainer, LineBreak, useMainStyle };
