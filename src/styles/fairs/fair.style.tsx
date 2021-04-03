import { Box, makeStyles, Theme } from "@material-ui/core";
import styled from "styled-components";

const FairRowBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;

const FairContainer = styled(Box)`
  background-color: var(--secondary-color);
  height: calc(100vh - 124px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    background-color: var(--background-color-paper);
  }
`;

const ProductsContainer = styled(Box)`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 50px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    height: 100%;
  }
`;

const ProductContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const useFairStyle = makeStyles((theme: Theme) => ({
  container: {
    padding: "30px 70px",
    minHeight: "calc(100% - 160px)",
    borderRadius: "20px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export {
  FairContainer,
  FairRowBox,
  ProductsContainer,
  ProductContainer,
  useFairStyle,
};
