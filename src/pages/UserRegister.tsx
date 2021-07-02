import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  IUserError,
  IUserHelperText,
  IUserRegisterState,
  IAddressFunctions,
  ICpfFunctions,
  ICelphoneFunctions,
} from "../helpers/interfaces";
import {
  defaultUserRegister,
  defaultUserHelper,
  defaultUserErrors,
} from "../helpers/defaults";

import { FormContainer, useRegisterStyle } from "../styles/register.style";
import { useMainStyle } from "../styles/main.style";

import AddressComponent from "../components/Address.component";
import CpfInput from "../components/CpfInput";
import { IUserCreate, useUser } from "../hooks/useUser";
import CelphoneInput from "../components/CelphoneInput";
import { IFair, useFair } from "../hooks/useFair";
import { useHistory } from "react-router";

export function UserRegister() {
  const history = useHistory();
  const addressRef = useRef<IAddressFunctions>(null);
  const cpfRef = useRef<ICpfFunctions>(null);
  const celphoneRef = useRef<ICelphoneFunctions>(null);
  const { getAll } = useFair();
  const { create } = useUser();
  const { spaceButtons, boxSpace } = useRegisterStyle();
  const { secondaryText, flexBox, mgLeft } = useMainStyle();
  const [fairs, setFairs] = useState<IFair[]>();
  const [filterFairs, setFilterFairs] = useState<IFair[]>();
  const [states, setStates] = useState<IUserRegisterState>(defaultUserRegister);
  const [helperTexts, setHelperTexts] =
    useState<IUserHelperText>(defaultUserHelper);
  const [errors, setErrors] = useState<IUserError>(defaultUserErrors);
  type StateType = keyof typeof states;

  useEffect(() => {
    (async () => {
      const { data, status } = await getAll();
      if (status !== 200) {
        setFairs([]);
      }
      setFairs(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange =
    (prop: keyof IUserRegisterState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      setStates({ ...states, [prop]: value });
      setHelperTexts({ ...helperTexts, [prop]: "" });
      setErrors({ ...errors, [prop]: false });
    };

  const handleFairChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setStates({ ...states, fairName: value });
    const fairSelecteds = fairs?.filter(({ name }) =>
      name.toLocaleLowerCase().includes(value)
    );
    setFilterFairs(fairSelecteds);
  };

  const handleSelectedFairChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;
    const fairSelected = fairs?.find(({ id }) => id === value);
    setStates({ ...states, fair: fairSelected });
  };

  const handleClickShowPassword = (prop: keyof IUserRegisterState) => () => {
    const value = !states[prop];
    setStates({ ...states, [prop]: value });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasAddressError =
      states?.role === "buyer"
        ? addressRef.current?.checkAddressErrors()
        : false;
    const hasError = checkErrors();
    if (hasError || hasAddressError) {
      return;
    }
    if (states.password !== states.reapeatPassword) {
      setErrors({
        ...errors,
        password: true,
        reapeatPassword: true,
      });
      setHelperTexts({
        ...helperTexts,
        password: "As senhas não são iguais. Tente novamente.",
        reapeatPassword: "As senhas não são iguais. Tente novamente.",
      });
      return;
    }

    const formatterAddress =
      states?.role === "buyer" ? addressRef.current?.getAddressInfo() : null;

    const person: IUserCreate = {
      cpf: states.cpf,
      email: states.email,
      name: states.name,
      password: states.password,
      role: states.role,
      telephone: states.telephone,
      address: formatterAddress?.address,
      zipcode: formatterAddress?.zipcode,
      fair: states?.fair?.id !== "" ? states?.fair : undefined,
    };
    const { status } = await create(person);
    if (status >= 300) {
      return;
    }
    addressRef.current?.clearAddressInfo();
    cpfRef.current?.clearCpf();
    celphoneRef.current?.clearCelphone();
    setStates(defaultUserRegister);
    Swal.fire(
      "Eba!",
      "Seu usuário foi criado com sucesso! Faça login para acessar mais funcionalidades.",
      "success"
    );

    history.push("/login");
  };

  const checkErrors = () => {
    let newErrors = errors;
    let newHelpers = helperTexts;
    let hasError = false;
    Object.keys(states).forEach((key) => {
      const value = states[key as StateType];
      if (typeof value === "string" && key !== "fairName") {
        const cleanValue = value.replace(/[-.()]/g, "").trim();
        if (!cleanValue) {
          newErrors = { ...newErrors, [key]: true };
          newHelpers = {
            ...newHelpers,
            [key]: "Campo obrigatório.",
          };
          hasError = true;
        }
      }
    });
    setErrors(newErrors);
    setHelperTexts(newHelpers);
    return hasError;
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormControl fullWidth error={errors.name} variant="outlined">
        <FormLabel id="user-name-register" component="legend">
          Nome
        </FormLabel>
        <OutlinedInput
          id="user-name-register"
          value={states.name}
          autoFocus
          onChange={handleChange("name")}
          aria-describedby="user-name-register"
          inputProps={{
            "aria-label": "name",
          }}
          labelWidth={0}
        />
        <FormHelperText>{helperTexts.name}</FormHelperText>
      </FormControl>
      <Box className={flexBox}>
        <CpfInput
          id="user-cpf-input"
          label="CPF"
          ref={cpfRef}
          error={errors.cpf}
          helperText={helperTexts.cpf}
          onChange={handleChange("cpf")}
        />
        <FormControl
          className={mgLeft}
          fullWidth
          error={errors.email}
          variant="outlined"
        >
          <FormLabel id="user-email-register" component="legend">
            Email
          </FormLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={states.email}
            onChange={handleChange("email")}
            aria-describedby="user-email-register"
            inputProps={{
              "aria-label": "email",
            }}
            labelWidth={0}
          />
          <FormHelperText>{helperTexts.email}</FormHelperText>
        </FormControl>
      </Box>
      <Box className={flexBox}>
        <FormControl fullWidth error={errors.password} variant="outlined">
          <FormLabel id="outlined-adornment-password" component="legend">
            Senha
          </FormLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={states.showPassword ? "text" : "password"}
            value={states.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment component="i" position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword("showPassword")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {states.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />
          <FormHelperText>{helperTexts.password}</FormHelperText>
        </FormControl>
        <FormControl
          className={mgLeft}
          fullWidth
          error={errors.reapeatPassword}
          variant="outlined"
        >
          <FormLabel id="outlined-adornment-repeat-password" component="legend">
            Confirme a senha
          </FormLabel>
          <OutlinedInput
            id="outlined-adornment-repassword"
            type={states.showReapeatPassword ? "text" : "password"}
            value={states.reapeatPassword}
            onChange={handleChange("reapeatPassword")}
            endAdornment={
              <InputAdornment component="i" position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword("showReapeatPassword")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {states.showReapeatPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />
          <FormHelperText>{helperTexts.reapeatPassword}</FormHelperText>
        </FormControl>
      </Box>
      <CelphoneInput
        id="user-celphone"
        ref={celphoneRef}
        label="Celular"
        error={errors.telephone}
        helperText={helperTexts.telephone}
        onChange={handleChange("telephone")}
      />
      <Box className={flexBox}>
        <FormControl
          className={`${boxSpace} ${spaceButtons}`}
          component="fieldset"
          error={errors.role}
        >
          <FormLabel component="legend">Quem você é?</FormLabel>
          <RadioGroup
            aria-label="roleAnwser"
            name="roleAnwser"
            value={states.role}
            onChange={handleChange("role")}
          >
            <FormControlLabel
              value="buyer"
              control={<Radio color="primary" />}
              label="Comprador"
            />
            <FormControlLabel
              value="seller"
              control={<Radio color="primary" />}
              label="Feirante"
            />
          </RadioGroup>
          <FormHelperText>{helperTexts.role}</FormHelperText>
        </FormControl>
        {states?.role === "seller" && (
          <FormControl
            className={`${boxSpace} ${spaceButtons}`}
            fullWidth
            variant="outlined"
          >
            <FormLabel id="user-email-register" component="legend">
              Feira
            </FormLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={states?.fairName}
              onChange={handleFairChange}
              aria-describedby="user-email-register"
              inputProps={{
                "aria-label": "email",
              }}
              labelWidth={0}
            />
            {filterFairs?.length === 0 && states?.fairName !== "" && (
              <FormHelperText>
                Feira não encontrada. Verifique o nome e tente novamente.
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Box>
      <Box className={flexBox}>
        {!!filterFairs && (
          <FormControl component="fieldset" error={errors.role}>
            <RadioGroup
              aria-label="roleAnwser"
              name="roleAnwser"
              value={states?.fair?.id}
              onChange={handleSelectedFairChange}
            >
              {filterFairs.map(({ id, name }) => {
                return (
                  <FormControlLabel
                    key={id}
                    value={id}
                    control={<Radio color="primary" />}
                    label={name}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
      {states?.role === "buyer" && <AddressComponent ref={addressRef} />}
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
      <Button type="submit" variant="contained" color="primary">
        <Typography className={secondaryText} variant="body1">
          Cadastrar
        </Typography>
      </Button>
    </FormContainer>
  );
}

export default UserRegister;
