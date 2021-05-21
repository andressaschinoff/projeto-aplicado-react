import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router";
import { IFair } from "../hooks/useFair";
import { useFairsStyle } from "../styles/fairs/fairs.style";

import {
  FairRowBox,
  ProductsContainer,
  useFairStyle,
} from "../styles/fairs/fair.style";
import { IProduct, useProduct } from "../hooks/useProduct";
import TrollerContext from "../hooks/TrollerContext";
import { useTroller } from "../hooks/useTroller";
import ProductComponent from "../components/Product.component";
import SearchComponent from "../components/Search.component";

const Fair: React.FC = () => {
  const { state } = useLocation<IFair>();
  const { update } = useTroller();
  const { troller, setTroller } = useContext(TrollerContext);
  const { getAll } = useProduct();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [trollerProducts, setTrollerProducts] = useState<IProduct[]>([]);
  const { container } = useFairStyle();
  const { typesSpacing } = useFairsStyle();

  useEffect(() => {
    (async () => {
      if (!!state && !!state.id) {
        const { data, status } = await getAll(state.id);
        if (status !== 200) {
          return;
        }
        setProducts(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleAddProduct = async (productId: string) => {
    const findProduct = products.find(({ id }) => id === productId);
    !!findProduct && setTrollerProducts([...trollerProducts, findProduct]);
    const quantity =
      trollerProducts.filter(({ id }) => id === productId).length + 1;

    const newTrollerProduct = {
      quantity,
      product: findProduct,
    };
    const newProducts = !!troller.products
      ? [
          ...troller.products?.filter(
            ({ product }) => product?.id !== productId
          ),
          newTrollerProduct,
        ]
      : [newTrollerProduct];
    const newTroller = { id: troller.id, products: newProducts };
    // const { data, status } = await update(newTroller);
    // if (status === 200) {
    //   setTroller(data);
    // }
    setTroller(newTroller);
  };

  const handleRemoveProduct = (productId: string) => {
    const findProduct = products.find(({ id }) => id === productId);
    !!findProduct && setTrollerProducts([...trollerProducts, findProduct]);
    const quantity =
      trollerProducts.filter(({ id }) => id === productId).length - 1;

    const newTrollerProduct = {
      quantity,
      product: findProduct,
    };
    const newProducts = !!troller.products
      ? [
          ...troller.products?.filter(
            ({ product }) => product?.id !== productId
          ),
          newTrollerProduct,
        ]
      : [newTrollerProduct];
    const newTroller = { id: troller.id, products: newProducts };
    // const { data, status } = await update(newTroller);
    // if (status === 200) {
    //   setTroller(data);
    // }
    setTroller(newTroller);
  };

  return (
    <>
      <Box height="40px"></Box>
      <Container maxWidth="lg" className={container}>
        <Box>
          <Typography color="secondary" align="center" variant="h4">
            {state?.name}
          </Typography>

          <FairRowBox>
            {state?.types?.map((type) => {
              return (
                <Typography
                  color="primary"
                  align="center"
                  className={typesSpacing}
                  key={`${state?.id}${type}`}
                  variant="h6"
                >
                  {type}
                </Typography>
              );
            })}
          </FairRowBox>
        </Box>
        <Box>
          <SearchComponent />
        </Box>
        <ProductsContainer>
          {!!products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <ProductComponent
                  product={product}
                  addProduct={handleAddProduct}
                  removeProduct={handleRemoveProduct}
                />
              );
            })}
        </ProductsContainer>
      </Container>
    </>
  );
};

export default Fair;
