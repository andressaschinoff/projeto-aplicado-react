import React, { useEffect, useState } from "react";
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
import { Box, Button, Container, Typography } from "@material-ui/core";

import { IFairError, IFairHelperText } from "../helpers/interfaces";

import {
  FormContainer,
  PasswordContainer,
  useRegisterStyle,
} from "../styles/register.style";

import { useMainStyle } from "../styles/main.style";
import { IFairCreate } from "../hooks/useFair";

export function FairRegister() {
  const { mainContainer } = useRegisterStyle();
  const { secondaryText } = useMainStyle();
  const [states, setStates] = useState<IFairCreate>({
    name: "",
    zipcode: "",
    address: "",
    opening: "",
    closing: "",
    weekDay: "",
    deliveryPrice: 0,
    types: [],
  });
  const [helperTexts, setHelperTexts] = useState<IFairHelperText>({
    name: "",
    zipcode: "",
    address: "",
    addressNumber: "",
    opening: "",
    closing: "",
    weekDay: "",
    deliveryPrice: "",
    types: "",
  });
  const [errors, setErrors] = useState<IFairError>({
    name: false,
    zipcode: false,
    address: false,
    addressNumber: false,
    opening: false,
    closing: false,
    weekDay: false,
    deliveryPrice: false,
    types: false,
  });
  type StateType = keyof typeof states;

  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, [errors, helperTexts, states]);

  const handleChange =
    (prop: keyof IFairCreate) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      setStates({ ...states, [prop]: value });
      setHelperTexts({ ...helperTexts, [prop]: "" });
      setErrors({ ...errors, [prop]: false });
    };

  const handleClickShowPassword = (prop: keyof IFairCreate) => () => {
    const value = !states[prop];
    setStates({ ...states, [prop]: value });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = checkErrors();
    if (hasError) {
      return;
    }
    if (states.types.length === 0) {
      setErrors({
        ...errors,
        types: true,
      });
      setHelperTexts({
        ...helperTexts,
        types: "Você precisa selecionar pelo menos um tipo de produto.",
      });
      return;
    }
    console.log("persiste");
    console.log(states);
  };

  const checkErrors = () => {
    let newErrors = errors;
    let newHelpers = helperTexts;
    let hasError = false;
    Object.keys(states).forEach((key) => {
      const value = states[key as StateType];
      if (!value && typeof value === "string") {
        newErrors = { ...newErrors, [key]: true };
        newHelpers = {
          ...newHelpers,
          [key]: "Campo obrigatório.",
        };
        hasError = true;
      }
    });
    setErrors(newErrors);
    setHelperTexts(newHelpers);
    return hasError;
  };

  return (
    // <Container className={mainContainer} maxWidth="sm">
    //   <FormContainer onSubmit={handleSubmit}>
    //     <FormControl
    //       fullWidth
    //       error={errors.name}
    //       // className={clsx(classes.margin, classes.textField)}
    //       variant="outlined"
    //     >
    //       <FormLabel id="fair-name-register" component="legend">
    //         Nome da feira
    //       </FormLabel>
    //       <fair-outlinedInput
    //         id="fair-name-register"
    //         value={states.name}
    //         onChange={handleChange("name")}
    //         aria-describedby="fair-name-register"
    //         inputProps={{
    //           "aria-label": "name",
    //         }}
    //         labelWidth={0}
    //       />
    //       <FormHelperText>{helperTexts.name}</FormHelperText>
    //     </FormControl>
    //     <FormControl
    //       fullWidth
    //       error={errors.zipcode}
    //       // className={clsx(classes.margin, classes.textField)}
    //       variant="outlined"
    //     >
    //       <FormLabel id="fair-zipcode-register" component="legend">
    //         CEP
    //       </FormLabel>
    //       <fair-outlinedInput
    //         id="fair-outlined-adornment-zipcode"
    //         value={states.zipcode}
    //         onChange={handleChange("zipcode")}
    //         aria-describedby="fair-zipcode-register"
    //         inputProps={{
    //           "aria-label": "zipcode",
    //         }}
    //         labelWidth={0}
    //       />
    //       <FormHelperText>{helperTexts.zipcode}</FormHelperText>
    //     </FormControl>
    //     <FormControl
    //       fullWidth
    //       error={errors.email}
    //       // className={clsx(classes.margin, classes.textField)}
    //       variant="outlined"
    //     >
    //       <FormLabel id="fair-email-register" component="legend">
    //         Email
    //       </FormLabel>
    //       <fair-outlinedInput
    //         id="fair-outlined-adornment-email"
    //         value={states.email}
    //         onChange={handleChange("email")}
    //         aria-describedby="fair-email-register"
    //         inputProps={{
    //           "aria-label": "email",
    //         }}
    //         labelWidth={0}
    //       />
    //       <FormHelperText>{helperTexts.email}</FormHelperText>
    //     </FormControl>
    //     <Box>
    //       <FormControl
    //         fullWidth
    //         error={errors.password}
    //         // className={clsx(classes.margin, classes.textField)}
    //         variant="outlined"
    //       >
    //         <FormLabel id="fair-outlined-adornment-password" component="legend">
    //           Senha
    //         </FormLabel>
    //         <fair-outlinedInput
    //           id="fair-outlined-adornment-password"
    //           type={states.showPassword ? "text" : "password"}
    //           value={states.password}
    //           onChange={handleChange("password")}
    //           endAdornment={
    //             <InputAdornment component="i" position="end">
    //               <IconButton
    //                 aria-label="toggle password visibility"
    //                 onClick={handleClickShowPassword("showPassword")}
    //                 onMouseDown={handleMouseDownPassword}
    //                 // edge="end"
    //               >
    //                 {states.showPassword ? <Visibility /> : <VisibilityOff />}
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //           labelWidth={0}
    //         />
    //         <FormHelperText>{helperTexts.password}</FormHelperText>
    //       </FormControl>
    //       <FormControl
    //         fullWidth
    //         error={errors.reapeatPassword}
    //         // className={clsx(classes.margin, classes.textField)}
    //         variant="outlined"
    //       >
    //         <FormLabel
    //           id="fair-outlined-adornment-repeat-password"
    //           component="legend"
    //         >
    //           Confirme a senha
    //         </FormLabel>
    //         <fair-outlinedInput
    //           id="fair-outlined-adornment-password"
    //           type={states.showReapeatPassword ? "text" : "password"}
    //           value={states.reapeatPassword}
    //           onChange={handleChange("reapeatPassword")}
    //           endAdornment={
    //             <InputAdornment component="i" position="end">
    //               <IconButton
    //                 aria-label="toggle password visibility"
    //                 onClick={handleClickShowPassword("showReapeatPassword")}
    //                 onMouseDown={handleMouseDownPassword}
    //                 // edge="end"
    //               >
    //                 {states.showReapeatPassword ? (
    //                   <Visibility />
    //                 ) : (
    //                   <VisibilityOff />
    //                 )}
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //           labelWidth={0}
    //         />
    //         <FormHelperText>{helperTexts.reapeatPassword}</FormHelperText>
    //       </FormControl>
    //     </Box>
    //     <FormControl
    //       fullWidth
    //       // className={clsx(classes.margin, classes.textField)}
    //       error={errors.telephone}
    //       variant="outlined"
    //     >
    //       <FormLabel id="fair-outlined-adornment-telephone" component="legend">
    //         Telefone
    //       </FormLabel>
    //       <fair-outlinedInput
    //         id="fair-outlined-adornment-telephone"
    //         value={states.telephone}
    //         onChange={handleChange("telephone")}
    //         labelWidth={0}
    //         // label="Telefone"
    //       />
    //       <FormHelperText>{helperTexts.telephone}</FormHelperText>
    //     </FormControl>
    //     <FormControl
    //       component="fieldset"
    //       error={errors.role}
    //       // className={classes.formControl}
    //     >
    //       <FormLabel component="legend">Quem você é?</FormLabel>
    //       <RadioGroup
    //         aria-label="roleAnwser"
    //         name="roleAnwser"
    //         value={states.role}
    //         onChange={handleChange("role")}
    //       >
    //         <FormControlLabel
    //           value="client"
    //           control={<Radio color="primary" />}
    //           label="Comprador"
    //         />
    //         <FormControlLabel
    //           value="fair"
    //           control={<Radio color="primary" />}
    //           label="Feirante"
    //         />
    //       </RadioGroup>
    //       <FormHelperText>{helperTexts.role}</FormHelperText>
    //     </FormControl>
    //     <Button type="submit" variant="contained" color="primary">
    //       <Typography className={secondaryText} variant="body1">
    //         Cadastrar
    //       </Typography>
    //     </Button>
    //   </FormContainer>
    // </Container>
    <Box />
  );
}

export default FairRegister;
