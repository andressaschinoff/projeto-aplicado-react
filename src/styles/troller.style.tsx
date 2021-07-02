import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const CenterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 20px 0 0 0;
  }
`;

const useTrollerStyle = makeStyles((theme: Theme) => ({
  fairName: {
    paddingLeft: "30px",
    fontSize: "32px",
    fontFamily: "Jost",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
  },
  link: {
    fontWeight: "bold",
  },
  elements: {
    padding: "10px 0px",
    display: "flex",
    justifyContent: "space-between",
  },
  products: {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    padding: "10px 0",
  },
  container: {
    margin: "10px 50px",
  },
  fairContainer: {
    display: "flex",
    padding: "10px 20px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  noContent: {
    minHeight: "calc(100vh - 300px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export { CenterContainer, useTrollerStyle };
