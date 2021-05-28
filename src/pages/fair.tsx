import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MixedImage from "../assets/mixed.jpg";

import { IFair } from "../hooks/useFair";
import { IProduct, useProduct } from "../hooks/useProduct";
import { IOrderItem, useTroller } from "../hooks/useTroller";
import TrollerContext from "../hooks/TrollerContext";

import {
  FairRowBox,
  InfoProductContainer,
  ProductContainer,
  ProductsContainer,
} from "../styles/fairs/fair.style";
import { useFairsStyle } from "../styles/fairs/fairs.style";
import { MainContainer, useMainStyle } from "../styles/main.style";

import ProductComponent from "../components/Product.component";
import SearchComponent from "../components/Search.component";

const Fair: React.FC = () => {
  const { state: fair } = useLocation<IFair>();
  const { update } = useTroller();
  const { troller, setTroller, fairTroller, setFairTroller } =
    useContext(TrollerContext);
  // const { user, signed } = useContext(AuthContext);
  const { getAll } = useProduct();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orderItens, setOrderItens] = useState<IOrderItem[]>([]);
  const { largeAvatar } = useMainStyle();
  const { typesSpacing } = useFairsStyle();

  useEffect(() => {
    if (!!fair && !!fair.id) {
      (async () => {
        const { data, status } = await getAll(fair.id);
        if (status !== 200) {
          return;
        }
        setProducts(data);
      })();
    }
    console.log(troller);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fair]);

  useEffect(() => {
    const currentOrderItens = !!troller?.orderItens ? troller?.orderItens : [];
    setOrderItens(currentOrderItens);
  }, [troller]);

  const handleAddProduct = async (productId: string) => {
    const orderItensInfo = await orderInformation(productId, +1);

    if (!orderItensInfo) {
      return;
    }

    const { filterOrderItens, newOrderItem } = orderItensInfo;
    const newOrderItens = [...filterOrderItens, newOrderItem];

    await setNewInfo(newOrderItens);
  };

  const handleRemoveProduct = async (productId: string) => {
    const orderItensInfo = await orderInformation(productId, -1);

    if (!orderItensInfo) {
      return;
    }

    const { filterOrderItens, newOrderItem } = orderItensInfo;

    const newOrderItens =
      newOrderItem?.quantity <= 0
        ? [...filterOrderItens]
        : [...filterOrderItens, newOrderItem];

    await setNewInfo(newOrderItens);
  };

  const setNewInfo = async (newOrderItens: IOrderItem[]) => {
    setOrderItens(newOrderItens);
    console.log(fair);
    console.log(troller);
    const newTroller = { ...troller, orderItens: newOrderItens, fair: fair };
    if (!troller?.id) {
      setTroller(newTroller);
      return;
    }
    console.log(troller);
    const { data, status } = await update(troller?.id, newTroller);
    if (status >= 300) {
      setTroller(newTroller);
      return;
    }
    setTroller(data);
  };

  const orderInformation = async (productId: string, action: number) => {
    const foundProduct = products.find(({ id }) => id === productId);

    if (!foundProduct) {
      Swal.fire(
        "Ops!",
        "Ocorreu um erro enquanto removemos alguns produtos ao carrinho, por favor tente mais tarde!",
        "error"
      );
      return null;
    }

    if (fairTroller !== "" && foundProduct.fair.id !== fairTroller) {
      const cleanTroller = { ...troller, orderItens: [] };
      const { data } = await update(troller.id, cleanTroller);
      setTroller(data);
      setOrderItens([]);
      return null;
    }

    const filterOrderItens = orderItens.filter(
      ({ product }) => product?.id !== productId
    );

    const oldOrder = orderItens.filter(
      ({ product }) => product?.id === productId
    )[0];

    const newQuantity = !!+oldOrder?.quantity
      ? oldOrder.quantity + action
      : 0 + action;

    const newOrderItem = !!oldOrder
      ? {
          ...oldOrder,
          quantity: newQuantity,
        }
      : { quantity: newQuantity, product: foundProduct };

    return { filterOrderItens, newOrderItem };
  };

  return (
    <MainContainer>
      <Box>
        <Typography color="secondary" align="center" variant="h4">
          {fair?.name}
        </Typography>

        <FairRowBox>
          {fair?.types?.map((type) => {
            return (
              <Typography
                color="primary"
                align="center"
                className={typesSpacing}
                key={`${fair?.id}${type}`}
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
        {/* {signed && user.role === "seller" && ( */}
        <ProductContainer>
          <IconButton component={Link} to="/product-regiter" color="primary">
            <Avatar
              alt="Product Image"
              src={MixedImage}
              // src={`../assets${`/mixed.jpg`}`}
              className={largeAvatar}
            />
          </IconButton>
          <InfoProductContainer>
            <Box className={typesSpacing}>
              <Typography
                component={Link}
                color="inherit"
                to="/product-regiter"
                variant="h6"
              >
                Adicione um novo produto
              </Typography>
            </Box>
            {/* <Box className={typesSpacing}>
              <IconButton
                component={Link}
                to="/product-regiter"
                color="primary"
                onClick={() => {}}
              >
                <AddCircleIcon className={addIcon} color="primary" />
              </IconButton>
            </Box> */}
          </InfoProductContainer>
        </ProductContainer>
        {/* )} */}
        {!!products &&
          products.map((product) => {
            return (
              <ProductComponent
                key={product.id}
                product={product}
                addProduct={handleAddProduct}
                removeProduct={handleRemoveProduct}
              />
            );
          })}
      </ProductsContainer>
    </MainContainer>
  );
};

export default Fair;
