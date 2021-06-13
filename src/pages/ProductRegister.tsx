import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import {
  IProductState,
  IProductError,
  IProductHelpers,
  IImageUploadFunctions,
} from "../helpers/interfaces";
import {
  defaultProductErros,
  defaultProductHelpers,
  defaultProductState,
} from "../helpers/defaults";

import { FormContainer, useRegisterStyle } from "../styles/register.style";

import { useTypes } from "../hooks/useTypes";
import { IProductCreate, useProduct } from "../hooks/useProduct";
import { useFair } from "../hooks/useFair";
import { useImageUpload } from "../hooks/useImageUpload";
import ImageUpload from "../components/ImageUpload";

export function ProductRegister() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { types } = useTypes();
  const { create } = useProduct();
  const { upload } = useImageUpload();
  const { getOne } = useFair();

  const imageUploadRef = useRef<IImageUploadFunctions>(null);

  const [fairId, setFairId] = useState("");
  const [states, setStates] = useState<IProductState>(defaultProductState);
  const [helpers, setHelpers] = useState<IProductHelpers>(
    defaultProductHelpers
  );
  const [errors, setErrors] = useState<IProductError>(defaultProductErros);

  const classes = useRegisterStyle();

  type StateType = keyof typeof states;

  useEffect(() => {
    const id = pathname.split("/cadastrar-produto/")[1];
    setFairId(id);
  }, [pathname]);

  const handleChange =
    (prop: keyof IProductState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      setStates({ ...states, [prop]: value });
      setHelpers({ ...helpers, [prop]: "" });
      setErrors({ ...errors, [prop]: false });
    };

  const createProduct = async () => {
    const imageFile = imageUploadRef.current?.getImage();
    const hasError = checkErrors();
    if (hasError) {
      return false;
    }

    const fairData = await getOne(fairId);
    if (fairData.status >= 300) {
      Swal.fire(
        "Ops",
        "Ocorreu algum erro ao criar seu produto, por favor tente mais tarde!",
        "error"
      );
      return;
    }

    const product: IProductCreate = {
      fair: fairData.data,
      name: states.name,
      price: states.price,
      type: states.type,
      unitsOfMeasure: `${states.unitQuantity} ${states.unit}`,
      countInStock: states.countInStock,
    };

    if (!!imageFile) {
      const imageUpload = await upload(imageFile);

      if (imageUpload.data.success === false && imageUpload.status !== 400) {
        Swal.fire(
          "Ops",
          "Ocorreu algum erro ao fazer upload da sua imagem, por favor tente mais tarde!",
          "error"
        );
        return false;
      }

      const { filename } = imageUpload.data;
      product.image = filename;
    }

    const { status } = await create(product);

    if (status >= 300) {
      return false;
    }
    Swal.fire("Eba!", "Seu produto foi criado com sucesso!", "success");

    setStates(defaultProductState);
    imageUploadRef.current?.clearImage();
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isCreated = await createProduct();

    if (!isCreated) {
      return;
    }

    handleGoBack();
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const checkErrors = () => {
    let newErrors = errors;
    let newHelpers = helpers;
    let hasError = false;
    const mandatories = Object.keys(errors);
    Object.keys(states).forEach((key) => {
      const value = states[key as StateType];
      const isMandatory = !!mandatories.includes(key);
      if (typeof value === "string" && isMandatory && value === "") {
        newErrors = { ...newErrors, [key]: true };
        newHelpers = {
          ...newHelpers,
          [key]: "Campo obrigatório.",
        };
        console.log(key);
        console.log(value);
        hasError = true;
      }
    });
    setErrors(newErrors);
    setHelpers(newHelpers);
    return hasError;
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Box className={classes.imageBox}>
        <ImageUpload ref={imageUploadRef} />
        <Box className={classes.radioBox}>
          <FormControl
            className={classes.element}
            fullWidth
            error={errors.name}
            variant="outlined"
          >
            <FormLabel
              className={classes.labelSpace}
              id="user-name-register"
              component="legend"
            >
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
            <FormHelperText>{helpers.name}</FormHelperText>
          </FormControl>
          <FormControl className={classes.element} fullWidth variant="outlined">
            <FormLabel
              className={classes.labelSpace}
              id="user-name-register"
              component="legend"
            >
              Descrição
            </FormLabel>
            <OutlinedInput
              id="user-name-register"
              value={states.description}
              autoFocus
              onChange={handleChange("description")}
              aria-describedby="user-name-register"
              inputProps={{
                "aria-label": "name",
              }}
              labelWidth={0}
            />
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.insideBox}>
        <Box className={classes.insideBox}>
          <FormControl
            className={classes.element}
            component="fieldset"
            error={errors.type}
          >
            <FormLabel className={classes.labelSpace} component="legend">
              Qual o tipo?
            </FormLabel>
            <RadioGroup
              className={classes.radioBox}
              aria-label="roleAnwser"
              name="roleAnwser"
              value={states.type}
              onChange={handleChange("type")}
            >
              {types.map((type) => {
                return (
                  <FormControlLabel
                    value={type}
                    control={<Radio color="primary" />}
                    label={type}
                  />
                );
              })}
            </RadioGroup>
            <FormHelperText>{helpers.type}</FormHelperText>
          </FormControl>
          <FormControl className={classes.element} fullWidth variant="outlined">
            <FormLabel
              className={classes.labelSpace}
              id="product-register-countInStock"
              component="legend"
            >
              Quantidade em estoque
            </FormLabel>
            <OutlinedInput
              type="number"
              id="product-register-unitsOfMeasure"
              value={states.countInStock}
              onChange={handleChange("countInStock")}
              labelWidth={0}
            />
          </FormControl>
        </Box>
        <Box className={classes.insideBox}>
          <FormGroup className={classes.quantity}>
            <FormLabel
              className={classes.labelSpace}
              id="product-register-price"
              component="legend"
            >
              Quantidade pelo preço
            </FormLabel>
            <Box>
              <FormControl
                className={classes.value}
                error={errors.unitQuantity}
                variant="outlined"
              >
                <OutlinedInput
                  id="product-register-price"
                  type="number"
                  value={states.unitQuantity}
                  onChange={handleChange("unitQuantity")}
                  labelWidth={0}
                />
              </FormControl>
              <FormControl
                className={classes.value}
                error={errors.unit}
                variant="outlined"
              >
                <OutlinedInput
                  id="product-register-unitsOfMeasure"
                  value={states.unit}
                  placeholder="ex: kg"
                  onChange={handleChange("unit")}
                  labelWidth={0}
                />
                <FormHelperText>
                  {helpers.unitQuantity !== ""
                    ? helpers.unitQuantity
                    : helpers.unit}
                </FormHelperText>
              </FormControl>
            </Box>

            <FormHelperText className={classes.labelSpace}>
              Exemplo: 100 gramas
            </FormHelperText>
          </FormGroup>
          <FormControl
            fullWidth
            className={classes.element}
            error={errors.price}
            variant="outlined"
          >
            <FormLabel
              className={classes.labelSpace}
              id="product-register-price"
              component="legend"
            >
              Preço
            </FormLabel>
            <OutlinedInput
              id="product-register-price"
              type="number"
              value={states.price}
              onChange={handleChange("price")}
              aria-describedby="price"
              inputProps={{
                "aria-label": "price",
              }}
              labelWidth={0}
            />
            <FormHelperText>{helpers.price}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.insideBox}>
        <Box className={classes.insideBox}>
          <Button
            onClick={createProduct}
            className={`${classes.element} ${classes.mgBottom}`}
            variant="outlined"
            color="primary"
          >
            Cadastrar outro produto
          </Button>
          <Box className={classes.element}></Box>
        </Box>
        <Box className={classes.insideBox}></Box>
      </Box>
      <Box className={classes.insideBox}>
        <Box className={classes.insideBox}></Box>
        <Box className={classes.insideBox}>
          <Button
            className={`${classes.element} ${classes.mgBottom}`}
            onClick={handleGoBack}
            variant="contained"
            color="secondary"
          >
            Cancelar
          </Button>
          <Button
            className={classes.element}
            type="submit"
            variant="contained"
            color="primary"
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
}

export default ProductRegister;
