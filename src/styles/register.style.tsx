import { makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const useRegisterStyle = makeStyles((theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  checkbox: {
    display: "flex",
    flexDirection: "row",
  },
  labelSpace: { marginBottom: "10px", marginLeft: "10px" },
  spaceButtons: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  boxSpace: {
    marginLeft: "15px",
  },
  quantity: {
    display: "flex",
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    width: "100%",
  },
  value: {
    maxWidth: "125px",
  },
  element: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    width: "100%",
  },
  insideBox: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginTop: "5px",
    },
    flexDirection: "row",
  },
  radioBox: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    flexDirection: "row",
  },
  imageBox: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  mgBottom: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
  },
}));

export { FormContainer, useRegisterStyle };
