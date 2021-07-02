import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const BorderBox = styled(Box)`
  width: 550px;
  margin: 10px 80px;
  padding: 20px;
  border: 1px solid #e3e3e1;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 300px;
    margin: 10px 0;
  }
`;

const InsideBorderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const OrderNumberBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    display: block;
  }
`;

const usePerfilStyle = makeStyles((theme: Theme) => ({
  container: {
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",
    },
  },
  name: {
    padding: "10px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 30px",
    },
  },
  elements: {
    padding: "10px 200px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  mgBtm: {
    marginBottom: "10px",
  },
  mgLft: {
    marginLeft: "30px",
  },
}));

export { BorderBox, OrderNumberBox, InsideBorderBox, usePerfilStyle };
