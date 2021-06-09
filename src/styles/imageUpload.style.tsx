import styled from "styled-components";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const ImageBox = styled(Avatar)`
  width: 120px;
  height: 120px;
  padding: 16px;
`;

const useImageUploadStyle = makeStyles((theme: Theme) => ({
  mainBox: {
    minWidth: "290px",
    display: "flex",
    marginBottom: "30px",
  },
  insideBox: {
    height: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "20px",
  },
}));

const DeleteButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    color: "white",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#c0392b",
      borderColor: "#c0392b",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#c0392b",
      borderColor: "#c0392b",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem #c0392b",
    },
  },
})(Button);

export { ImageBox, DeleteButton, useImageUploadStyle };
