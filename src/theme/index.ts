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
      contrastText: colors.common.white,
    },
    secondary: {
      main: "#3F4E59",
      contrastText: colors.common.white,
    },
  },
  typography: {
    h4: {
      fontFamily: "Jost, sans-serif",
      fontSize: 36,
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 24,
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 20,
      fontWeight: 700,
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
      fontSize: 16,
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 16,
      fontWeight: 700,
    },
  },
  shadows,
});

export default theme;
