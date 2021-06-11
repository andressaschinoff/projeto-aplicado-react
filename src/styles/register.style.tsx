import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const PasswordContainer = styled(Box)`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
`;

const FormContainer = styled.form`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 30px 70px;
  border-radius: 20px;
  background-color: #fff;
  overflow: auto;
`;

const useRegisterStyle = makeStyles((theme: Theme) => ({
  root: {
    padding: "2px 4px",
    alignItems: "center",
    width: 400,
  },
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
  btwBox: {
    margin: "2rem",
  },
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
    width: "100%",
  },
  value: {
    maxWidth: "125px",
  },
  element: {
    marginLeft: "20px",
    width: "100%",
  },
  insideBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  radioBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  imageBox: {
    display: "flex",
  },
}));

export { FormContainer, PasswordContainer, useRegisterStyle };
