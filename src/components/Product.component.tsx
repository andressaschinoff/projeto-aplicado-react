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
import { roundedNumber } from "../helpers/functions";
import { baseURL } from "../services/api";
import MixedImage from "../assets/mixed.jpg";

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
  const { id, name, price, type, description, unitsOfMeasure, image } = product;
  const { typesSpacing, icons } = useFairsStyle();
  const { largeAvatar } = useMainStyle();

  const currentImage = !!image ? `${baseURL}/assets/${image}` : MixedImage;

  return (
    <ProductContainer>
      <Avatar alt="Product Image" src={currentImage} className={largeAvatar} />
      <InfoProductContainer>
        <Box className={typesSpacing}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1" color="primary">
            {type}
          </Typography>
          {!!description && <Typography variant="h6">{description}</Typography>}
          <Typography variant="body2">R$ {roundedNumber(price)}</Typography>
          <Typography variant="body2">{unitsOfMeasure}</Typography>
        </Box>
        <Box className={typesSpacing}>
          <IconButton
            onClick={() => removeProduct(id)}
            color="secondary"
            component="span"
          >
            <RemoveShoppingCartIcon color="secondary" className={icons} />
          </IconButton>
          <IconButton
            onClick={() => addProduct(id)}
            color="primary"
            component="span"
          >
            <AddShoppingCartIcon color="primary" className={icons} />
          </IconButton>
        </Box>
      </InfoProductContainer>
    </ProductContainer>
  );
}

export default ProductComponent;
