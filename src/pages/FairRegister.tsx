import React, { useContext, useEffect, useRef, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";

import {
  IAddressFunctions,
  IFairHelpers,
  IFairState,
  IFairError,
} from "../helpers/interfaces";
import {
  defaultFairStates,
  defaultFairHelpers,
  defaultFairErros,
  weekdays,
} from "../helpers/defaults";

import {
  FormContainer,
  PasswordContainer,
  useRegisterStyle,
} from "../styles/register.style";
import { useMainStyle } from "../styles/main.style";

import AddressComponent from "../components/Address.component";
import LoadingContext from "../hooks/LoadingContext";
import { useTypes } from "../hooks/useTypes";

export function FairRegister() {
  const addressRef = useRef<IAddressFunctions>(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { types } = useTypes();
  const classes = useRegisterStyle();
  const mainClasses = useMainStyle();
  const [states, setStates] = useState<IFairState>(defaultFairStates);
  const [helperTexts, setHelperTexts] =
    useState<IFairHelpers>(defaultFairHelpers);
  const [errors, setErrors] = useState<IFairError>(defaultFairErros);
  type StateType = keyof typeof states;

  const handleChange =
    (prop: keyof IFairState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      setStates({ ...states, [prop]: value });
      setHelperTexts({ ...helperTexts, [prop]: "" });
      setErrors({ ...errors, [prop]: false });
    };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const currentWeekdays = states.weekdays;
    const newWeekdays = currentWeekdays.includes(name)
      ? currentWeekdays.filter((s) => s !== name)
      : [...currentWeekdays, name];

    setStates({ ...states, weekdays: [...newWeekdays] });
  };

  // const handleSelectedFairChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { value } = event.target as HTMLInputElement;
  //   const fairSelected = fairs?.filter(({ name }) => name === value)[0];
  //   setStates({ ...states, fair: fairSelected });
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasAddressError = addressRef.current?.checkAddressErrors();
    const hasError = checkErrors();
    if (hasError || hasAddressError) {
      return;
    }

    const formatterAddress = addressRef.current?.getAddressInfo();

    // const person: IUserCreate = {
    //   cpf: states.cpf,
    //   email: states.email,
    //   name: states.name,
    //   password: states.password,
    //   role: states.role,
    //   telephone: states.telephone,
    //   address: formatterAddress?.address,
    //   zipcode: formatterAddress?.zipcode,
    // };
    // console.log("persiste");
    // console.log(person);
    // addressRef.current?.clearAddressInfo();
    // cpfRef.current?.clearCpf();
    // celphoneRef.current?.clearCelphone();
    // setStates(defaultUserRegister);
  };

  const checkErrors = () => {
    let newErrors = errors;
    let newHelpers = helperTexts;
    let hasError = false;
    Object.keys(states).forEach((key) => {
      const value = states[key as StateType];
      if (typeof value === "string") {
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
    <Container className={classes.mainContainer} maxWidth="md">
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
        <AddressComponent ref={addressRef} />
        <Box className={mainClasses.flexBox}>
          <FormControl fullWidth error={errors.opening} variant="outlined">
            <FormLabel id="user-opening-register" component="legend">
              Abertura
            </FormLabel>
            <OutlinedInput
              id="time-opening"
              type="time"
              value={states.opening}
              className={classes.textField}
              onChange={handleChange("opening")}
              aria-describedby="user-opening-register"
              labelWidth={0}
              inputProps={{
                step: 300, // 5 min
                "aria-label": "opening",
              }}
            />
            <FormHelperText>{helperTexts.opening}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors.closing} variant="outlined">
            <FormLabel id="user-opening-register" component="legend">
              Enceramento
            </FormLabel>
            <OutlinedInput
              id="time-closing"
              type="time"
              value={states.closing}
              className={classes.textField}
              onChange={handleChange("closing")}
              aria-describedby="user-closing-register"
              labelWidth={0}
              inputProps={{
                step: 300, // 5 min
                "aria-label": "opening",
              }}
            />
            <FormHelperText>{helperTexts.closing}</FormHelperText>
          </FormControl>
        </Box>
        <Box className={mainClasses.flexBox}>
          <FormControl fullWidth error={errors.weekdays}>
            <FormLabel id="user-opening-register" component="legend">
              Dias abertos
            </FormLabel>
            <FormGroup className={classes.checkbox}>
              {weekdays.map((day) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={states.weekdays.includes(day)}
                        onChange={handleCheckboxChange}
                        name={day}
                      />
                    }
                    label={day}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>{helperTexts.weekdays}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors.types}>
            <FormLabel id="user-opening-register" component="legend">
              Tipos de mercadoria
            </FormLabel>
            <FormGroup className={classes.checkbox}>
              {types.map((type) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={states.types.includes(type)}
                        onChange={handleCheckboxChange}
                        name={type}
                      />
                    }
                    label={type}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>{helperTexts.types}</FormHelperText>
          </FormControl>
        </Box>
        <FormControl fullWidth error={errors.deliveryPrice} variant="outlined">
          <FormLabel id="deliveryPrice" component="legend">
            Preço da entrega
          </FormLabel>
          <OutlinedInput
            id="deliveryPrice"
            value={states.deliveryPrice}
            autoFocus
            onChange={handleChange("deliveryPrice")}
            aria-describedby="deliveryPrice"
            inputProps={{
              "aria-label": "deliveryPrice ",
            }}
            labelWidth={0}
          />
          <FormHelperText>{helperTexts.deliveryPrice}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          <Typography className={mainClasses.secondaryText} variant="body1">
            Cadastrar
          </Typography>
        </Button>
      </FormContainer>
    </Container>
  );
}

export default FairRegister;
