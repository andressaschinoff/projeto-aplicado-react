import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IProduct } from "../hooks/useProduct";
import { ProductContainer } from "../styles/fairs/fair.style";
import { useFairsStyle } from "../styles/fairs/fairs.style";
import Box from "@material-ui/core/Box";

interface Props {
  product: IProduct;
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
}

export function ProductComponent({
  product,
  addProduct,
  removeProduct,
}: Props) {
  const { id, name, price, type, description } = product;
  const { typesSpacing } = useFairsStyle();

  return (
    <ProductContainer key={id}>
      <Box className={typesSpacing}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6" color="primary">
          {type}
        </Typography>
        {!!description && <Typography variant="h6">{description}</Typography>}
        <Typography variant="h6">R$ {price}</Typography>
      </Box>
      <Box className={typesSpacing}>
        <IconButton
          onClick={() => addProduct(id)}
          color="secondary"
          component="span"
        >
          <RemoveCircleIcon color="secondary" fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => removeProduct(id)}
          color="primary"
          component="span"
        >
          <AddCircleIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>
    </ProductContainer>
  );
}

export default ProductComponent;
