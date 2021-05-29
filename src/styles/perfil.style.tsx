import styled from "styled-components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const HelloContainer = styled(Box)``;

const usePerfilStyle = makeStyles((theme: Theme) => ({
  root: {},
  helloText: {
    padding: "10px 50px",
  },
  personName: {
    fontFamily: "Jost",
  },
}));

export { HelloContainer, usePerfilStyle };
