import React, { forwardRef, useImperativeHandle } from "react";
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
  error?: boolean;
  label: string;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

const CelphoneInput = forwardRef((inputProps: Props, ref) => {
  const [value, setValue] = React.useState<string>("");

  useImperativeHandle(ref, () => ({
    clearCelphone,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const cleanZipCode = event.target.value.replace(/[()-\s+]/g, "");
    if (cleanZipCode.length === 11) {
      inputProps.onChange(event);
    }
  };

  const clearCelphone = () => {
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

export default CelphoneInput;
