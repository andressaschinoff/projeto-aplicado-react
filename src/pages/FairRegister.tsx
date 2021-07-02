import React, { useRef, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";

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

import { FormContainer, useRegisterStyle } from "../styles/register.style";
import { useMainStyle } from "../styles/main.style";

import AddressComponent from "../components/Address.component";
import { useTypes } from "../hooks/useTypes";
import { IFairCreate, useFair } from "../hooks/useFair";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export function FairRegister() {
  const addressRef = useRef<IAddressFunctions>(null);
  const history = useHistory();
  const { types } = useTypes();
  const { create } = useFair();
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

  const handleCheckboxChange =
    (prop: keyof IFairState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const current = states[prop];
      if (typeof current === "object") {
        const newArray = current.includes(name)
          ? current.filter((s) => s !== name)
          : [...current, name];

        setStates({ ...states, [prop]: [...newArray] });
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasAddressError = addressRef.current?.checkAddressErrors();
    const hasError = checkErrors();
    if (hasError || hasAddressError) {
      return;
    }

    const formatterAddress = !addressRef.current?.getAddressInfo()
      ? { address: "", zipcode: "" }
      : addressRef.current?.getAddressInfo();

    const fair: IFairCreate = {
      address: formatterAddress.address,
      closing: states.closing,
      deliveryPrice: states.deliveryPrice,
      name: states.name,
      opening: states.opening,
      types: states.types,
      weekdays: states.weekdays,
      zipcode: formatterAddress.zipcode,
    };
    const { status } = await create(fair);

    if (status >= 300) {
      return;
    }
    addressRef.current?.clearAddressInfo();
    setStates(defaultFairStates);

    Swal.fire("Eba!", "A feira foi criada com sucesso!", "success");

    history.push("/");
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
            fullWidth
            id="time-opening"
            type="time"
            value={states.opening}
            className={classes.textField}
            onChange={handleChange("opening")}
            aria-describedby="user-opening-register"
            labelWidth={0}
            inputProps={{
              step: 300,
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
            fullWidth
            id="time-closing"
            type="time"
            value={states.closing}
            className={classes.textField}
            onChange={handleChange("closing")}
            aria-describedby="user-closing-register"
            labelWidth={0}
            inputProps={{
              step: 300,
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
                  key={day}
                  control={
                    <Checkbox
                      checked={states.weekdays.includes(day)}
                      onChange={handleCheckboxChange("weekdays")}
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
                  key={type}
                  control={
                    <Checkbox
                      checked={states.types.includes(type)}
                      onChange={handleCheckboxChange("types")}
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
  );
}

export default FairRegister;
