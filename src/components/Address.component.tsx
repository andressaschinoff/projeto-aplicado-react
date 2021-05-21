import React, { forwardRef, useImperativeHandle, useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { IFullAddress, useFullAddress } from "../hooks/useFullAddress";
import { defaultFullAddress } from "../helpers/defaults";

import ZipcodeInput from "./ZipcodeInput";
import {
  IConvertAddress,
  IFullAddressError,
  IFullAddressHelper,
  IZipcodeFunctions,
} from "../helpers/interfaces";

interface Props {
  mustHasAddress: boolean;
}

const AddressComponent = forwardRef((props: Props, ref) => {
  const zipcodeRef = useRef<IZipcodeFunctions>(null);
  const [states, setStates] = React.useState<IFullAddress>(defaultFullAddress);
  const [helperTexts, setHelperTexts] = React.useState<IFullAddressHelper>({
    zipcode: "",
    number: "",
  });
  const [errors, setErrors] = React.useState<IFullAddressError>({
    zipcode: false,
    number: false,
  });

  const { getAddressByZipcode } = useFullAddress();

  useImperativeHandle(ref, () => ({
    checkAddressErrors,
    getAddressInfo,
    clearAddressInfo,
  }));

  const handleZipcodeChange = async (value: string) => {
    const { fullAddress, status } = await getAddressByZipcode(value);
    setStates({ ...states, ...fullAddress, zipcode: value });
    if (status !== 200) {
      setHelperTexts({
        ...helperTexts,
        zipcode: "O cep está incorreto tente novamente.",
        number: "",
      });
      setErrors({ ...errors, zipcode: true, number: true });
      return;
    }
    setHelperTexts({ ...helperTexts, zipcode: "" });
    setErrors({ ...errors, zipcode: false });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setStates({ ...states, number: value });
    setHelperTexts({ ...helperTexts, number: "" });
    setErrors({ ...errors, number: false });
  };

  const getAddressInfo = () => {
    const address = `${states.address}|${states.number}|${states.complement}|${states.county}|${states.city}|${states.uf}`;
    return { address, zipcode: states.zipcode } as IConvertAddress;
  };

  const clearAddressInfo = () => {
    zipcodeRef.current?.clearZipcode();
    setStates(defaultFullAddress);
  };

  const checkAddressErrors = () => {
    let newErrors = errors;
    let newHelpers = helperTexts;
    let hasError = false;
    if (!props.mustHasAddress) {
      newErrors = { number: false, zipcode: false };
      newHelpers = {
        number: "",
        zipcode: "",
      };
      setErrors(newErrors);
      setHelperTexts(newHelpers);
      return hasError;
    }
    const cleanZipcode = states.zipcode.replace("-", "").trim();
    if (cleanZipcode.length !== 8) {
      newErrors = { ...newErrors, zipcode: true };
      newHelpers = {
        ...newHelpers,
        zipcode: "Campo obrigatório.",
      };
      hasError = true;
    }
    if (states.number === "") {
      newErrors = { ...newErrors, number: true };
      newHelpers = {
        ...newHelpers,
        number: "Campo obrigatório.",
      };
      hasError = true;
    }
    setErrors(newErrors);
    setHelperTexts(newHelpers);
    return hasError;
  };

  return (
    <>
      <ZipcodeInput
        id="formatted-text-mask-input"
        ref={zipcodeRef}
        label="CEP"
        error={errors.zipcode}
        helperText={helperTexts.zipcode}
        onChange={handleZipcodeChange}
      />
      <FormControl fullWidth variant="outlined">
        <FormLabel id="outlined-adornment-address" component="legend">
          Logradouro
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-address"
          disabled
          value={states.address}
          labelWidth={0}
        />
      </FormControl>
      <FormControl
        fullWidth
        error={props.mustHasAddress && errors.number}
        variant="outlined"
      >
        <FormLabel id="outlined-adornment-number" component="legend">
          Número
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-number"
          value={states.number}
          onChange={handleNumberChange}
          labelWidth={0}
        />
        <FormHelperText>{helperTexts.number}</FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <FormLabel id="outlined-adornment-complement" component="legend">
          Complemento
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-complement"
          value={states.complement}
          labelWidth={0}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <FormLabel id="outlined-adornment-city" component="legend">
          Cidade
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-city"
          disabled
          value={states.city}
          labelWidth={0}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <FormLabel id="outlined-adornment-county" component="legend">
          Bairro
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-county"
          disabled
          value={states.county}
          labelWidth={0}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <FormLabel id="outlined-adornment-uf" component="legend">
          UF
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-uf"
          disabled
          value={states.uf}
          labelWidth={0}
        />
      </FormControl>
    </>
  );
});

export default AddressComponent;
