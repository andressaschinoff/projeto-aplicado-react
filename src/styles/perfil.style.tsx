import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const HelloContainer = styled(Box)``;

const usePerfilStyle = makeStyles((theme: Theme) => ({
  root: {},
  container: {
    padding: "10px 50px",
  },
  name: {
    padding: "10px 80px",
  },
  personName: {
    fontFamily: "Jost",
  },
  borderBox: {
    width: "400px",
    margin: "10px 80px",
    padding: "20px",
    border: "1px solid #e3e3e1",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  elements: {
    padding: "10px 200px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export { HelloContainer, usePerfilStyle };
