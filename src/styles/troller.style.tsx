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
`;

const LineBreak = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
  background-color: #a6a6a5;
  opacity: 40%;
`;

const useTrollerStyle = makeStyles((theme: Theme) => ({
  root: {},
  fairName: {
    paddingLeft: "30px",
    fontSize: "36px",
    fontFamily: "Jost",
  },
  link: {
    fontWeight: "bold",
  },
  elements: {
    padding: "10px 0px",
    display: "flex",
    justifyContent: "space-between",
  },
  productInfo: {
    display: "flex",
  },
  productTextButton: {
    color: "white",
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
  },
}));

export { CenterContainer, LineBreak, useTrollerStyle };
