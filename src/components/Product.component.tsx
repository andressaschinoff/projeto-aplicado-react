import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { IProduct } from "../hooks/useProduct";
import {
  InfoProductContainer,
  ProductContainer,
} from "../styles/fairs/fair.style";
import { useFairsStyle } from "../styles/fairs/fairs.style";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { useMainStyle } from "../styles/main.style";

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
  const { largeAvatar } = useMainStyle();

  return (
    <ProductContainer>
      <Avatar
        alt="Product Image"
        src="../assets/mixed.jpg"
        // src={`../assets${`/mixed.jpg`}`}
        className={largeAvatar}
      />
      <InfoProductContainer>
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
            onClick={() => removeProduct(id)}
            color="secondary"
            component="span"
          >
            <RemoveShoppingCartIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => addProduct(id)}
            color="primary"
            component="span"
          >
            <AddShoppingCartIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </InfoProductContainer>
    </ProductContainer>
  );
}

export default ProductComponent;
