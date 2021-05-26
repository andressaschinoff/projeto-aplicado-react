import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { FormContainer, useRegisterStyle } from "../styles/register.style";
import { useMainStyle } from "../styles/main.style";

import { ILoginState } from "../helpers/interfaces";
import { defaultLogin } from "../helpers/defaults";
import AuthContext from "../hooks/AuthContext";
import FormGroup from "@material-ui/core/FormGroup";

export default function Login() {
  const { mainContainer, spaceButtons } = useRegisterStyle();
  const { secondaryText } = useMainStyle();

  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [states, setStates] = useState<ILoginState>(defaultLogin);
  type StateType = keyof typeof states;

  useEffect(() => {
    checkEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.email, states.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { status } = await login({
      email: states.email,
      password: states.password,
    });

    if (status >= 300) {
      setStates({
        ...states,
        helper: "Seu email ou senha não está correto.",
        error: true,
      });
      return;
    }

    setStates(defaultLogin);
    history.push("/");
  };

  const checkEmpty = () => {
    const empties = Object.keys(states).filter(
      (key) =>
        typeof states[key as StateType] === "string" &&
        !key.includes("helper") &&
        states[key as StateType] === ""
    );
    const isReady = empties.length === 0;
    setStates({ ...states, isReady });
  };

  const handleChange =
    (prop: keyof ILoginState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      setStates({ ...states, [prop]: value });
    };

  const handleClickShowPassword = () => {
    const value = !states.showpass;
    setStates({ ...states, showpass: value });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container className={mainContainer} maxWidth="md">
      <FormContainer onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <FormGroup>
            <FormLabel id="login-email" component="legend">
              Email
            </FormLabel>
            <OutlinedInput
              id="outlined-email-login"
              value={states.email}
              onChange={handleChange("email")}
              aria-describedby="login-email"
              inputProps={{
                "aria-label": "email",
              }}
              labelWidth={0}
            />
          </FormGroup>
        </FormControl>
        <FormControl error={states.error} fullWidth variant="outlined">
          <FormGroup>
            <FormLabel id="login--password" component="legend">
              Senha
            </FormLabel>
            <OutlinedInput
              id="outlined-password-login"
              type={states.showpass ? "text" : "password"}
              value={states.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment component="i" position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {states.showpass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={0}
            />
          </FormGroup>
          <FormHelperText>{states.helper}</FormHelperText>
        </FormControl>
        <Button
          className={spaceButtons}
          type="submit"
          variant="contained"
          color="secondary"
        >
          <Typography className={secondaryText} variant="body1">
            Cancelar
          </Typography>
        </Button>
        <Button
          type="submit"
          disabled={!states.isReady}
          variant="contained"
          color="primary"
        >
          <Typography className={secondaryText} variant="body1">
            Entrar
          </Typography>
        </Button>
      </FormContainer>
    </Container>
  );
}
