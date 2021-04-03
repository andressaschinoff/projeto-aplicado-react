import React, { useContext, useEffect, useState } from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box, Container, Typography, IconButton } from "@material-ui/core";
import { useLocation } from "react-router";
import MenuBar from "../components/menu-bar/menu-bar";
import { IFair } from "../hooks/useFairs";
import {
  LandingMainContainer,
  useFairsStyle,
} from "../styles/fairs/fairs.style";

import {
  FairContainer,
  FairRowBox,
  ProductsContainer,
  ProductContainer,
  useFairStyle,
} from "../styles/fairs/fair.style";
import { IProduct, useProducts } from "../hooks/useProduct";
import TrollerContext from "../hooks/TrollerContext";
import { useTroller } from "../hooks/useTroller";

const Fair: React.FC = () => {
  const { state } = useLocation<IFair>();
  const { update } = useTroller();
  const { troller, setTroller } = useContext(TrollerContext);
  const { getAll } = useProducts();
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
    console.log("add");
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
    console.log(troller);
    setTroller(newTroller);
  };

  const handleRemoveProduct = (productId: string) => {
    console.log("remove");
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
    console.log(troller);
    setTroller(newTroller);
  };

  return (
    <LandingMainContainer>
      <Container maxWidth="lg">
        <MenuBar />
      </Container>
      <FairContainer>
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
          <ProductsContainer>
            {!!products &&
              products.length > 0 &&
              products.map(({ id, name, price, type, description }) => {
                return (
                  <ProductContainer key={id}>
                    <Box className={typesSpacing}>
                      <Typography variant="h5">{name}</Typography>
                      <Typography variant="h6" color="primary">
                        {type}
                      </Typography>
                      {!!description && (
                        <Typography variant="h6">{description}</Typography>
                      )}
                      <Typography variant="h6">R$ {price}</Typography>
                    </Box>
                    <Box className={typesSpacing}>
                      <IconButton
                        onClick={() => handleRemoveProduct(id)}
                        color="secondary"
                        component="span"
                      >
                        <RemoveCircleIcon color="secondary" fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleAddProduct(id)}
                        color="primary"
                        component="span"
                      >
                        <AddCircleIcon color="primary" fontSize="large" />
                      </IconButton>
                    </Box>
                  </ProductContainer>
                );
              })}
          </ProductsContainer>
        </Container>
      </FairContainer>
    </LandingMainContainer>
  );
};

export default Fair;
