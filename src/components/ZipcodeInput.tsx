import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import MaskedInput from "react-text-mask";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

interface Props {
  id: string;
  error: boolean;
  label: string;
  helperText: string;
  onChange: (value: string) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

const ZipcodeInput = forwardRef((inputProps: Props, ref) => {
  const [value, setValue] = React.useState<string>("");

  useImperativeHandle(ref, () => ({
    clearZipcode,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    const cleanZipCode = value.replace("-", "").trim();
    if (cleanZipCode.length === 8) {
      inputProps.onChange(value);
    }
  };

  const clearZipcode = () => {
    setValue("");
  };

  return (
    <FormControl error={inputProps.error} variant="outlined">
      <FormLabel id="outlined-adornment-zipcode" component="legend">
        {inputProps.label}
      </FormLabel>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        id={inputProps.id}
        labelWidth={0}
        inputComponent={TextMaskCustom as any}
      />
      <FormHelperText>{inputProps.helperText}</FormHelperText>
    </FormControl>
  );
});

export default ZipcodeInput;
