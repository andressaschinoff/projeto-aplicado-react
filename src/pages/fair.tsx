import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MixedImage from "../assets/mixed.jpg";

import { IFair, useFair } from "../hooks/useFair";
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
import { defaultFair } from "../helpers/defaults";
import AuthContext from "../hooks/AuthContext";

const Fair: React.FC = () => {
  const { signed, user } = useContext(AuthContext);
  const { troller, setTroller } = useContext(TrollerContext);

  const { pathname } = useLocation();
  const { update } = useTroller();
  const { getAll } = useProduct();
  const { getOne } = useFair();

  const [currentFair, setCurrentFair] = useState<IFair>(defaultFair);
  const [products, setProducts] = useState<IProduct[]>([]);

  const { largeAvatar } = useMainStyle();
  const { typesSpacing } = useFairsStyle();

  useEffect(() => {
    if (!!pathname) {
      const id = pathname.split("/feira/")[1];
      (async () => {
        const { data, status } = await getOne(id);
        if (status !== 200) {
          return;
        }
        setCurrentFair(data);
      })();
      (async () => {
        const { data, status } = await getAll(id);
        if (status !== 200) {
          return;
        }
        setProducts(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleAddProduct = async (productId: string) => {
    const orderItensInfo = await handleOrderItem(productId, +1);

    if (!orderItensInfo) {
      return;
    }

    const newOrderItens = orderItensInfo;
    await sendTroller(newOrderItens);
  };

  const handleRemoveProduct = async (productId: string) => {
    const orderItensInfo = await handleOrderItem(productId, -1);

    if (!orderItensInfo) {
      return;
    }

    const newOrderItens = orderItensInfo;
    await sendTroller(newOrderItens);
  };

  const sendTroller = async (newOrderItens: IOrderItem[]) => {
    const newTroller = {
      ...troller,
      orderItems: newOrderItens,
      fair: currentFair,
    };
    if (!troller?.id) {
      setTroller(newTroller);
      return;
    }
    const { data, status } = await update(newTroller);
    if (status >= 300) {
      setTroller(newTroller);
      return;
    }
    setTroller(data);
  };

  const handleOrderItem = async (productId: string, action: number) => {
    const foundProduct = products.find(({ id }) => id === productId);

    if (!foundProduct) {
      Swal.fire(
        "Ops!",
        "Ocorreu um erro enquanto removemos alguns produtos ao carrinho, por favor tente mais tarde!",
        "error"
      );
      return null;
    }

    const newOrderItem = { quantity: action, product: foundProduct };

    return [newOrderItem];
  };

  return (
    <MainContainer>
      {!!currentFair?.id && (
        <Box>
          <Box>
            <Typography color="secondary" align="center" variant="h4">
              {currentFair?.name}
            </Typography>

            <FairRowBox>
              {currentFair?.types?.map((type) => {
                return (
                  <Typography
                    color="primary"
                    align="center"
                    className={typesSpacing}
                    key={`${currentFair?.id}${type}`}
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
            {signed && user.role === "seller" && (
              <ProductContainer>
                <IconButton
                  // component={Link}
                  // to={`cadastrar-produto/${currentFair.id}`}
                  color="primary"
                >
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
                      to={`/cadastrar-produto/${currentFair.id}`}
                      variant="h6"
                    >
                      Adicione um novo produto
                    </Typography>
                  </Box>
                </InfoProductContainer>
              </ProductContainer>
            )}
            {!!products &&
              products
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product) => {
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
        </Box>
      )}
    </MainContainer>
  );
};

export default Fair;
