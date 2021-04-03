import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 5,
        margin: 5,
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: "Roboto, sans-serif",
      },
    },
  },
  palette: {
    background: {
      paper: colors.common.white,
    },
    primary: {
      main: "#22BF13",
    },
    secondary: {
      main: "#3F4E59",
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h4: {
      fontFamily: "Jost, sans-serif",
      fontSize: 48,
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 20,
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 20,
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    subtitle2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 15,
      fontWeight: 500,
    },
    body2: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "10px",
      fontWeight: 700,
    },
  },
  shadows,
});

export default theme;
