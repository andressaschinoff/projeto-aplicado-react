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
}));

export { FormContainer, PasswordContainer, useRegisterStyle };
