import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const PasswordContainer = styled(Box)``;

const useMainStyle = makeStyles((theme: Theme) => ({
  root: {},
  secondaryText: {
    color: "#FFFFFF",
  },
  flexBox: {
    display: "flex",
  },
}));

export { useMainStyle };
