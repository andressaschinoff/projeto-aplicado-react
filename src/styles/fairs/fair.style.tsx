import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
const FairRowBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;

const ProductsContainer = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  column-gap: 50px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    height: 100%;
  }
`;

const ProductContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const InfoProductContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const useFairStyle = makeStyles((theme: Theme) => ({
  container: {
    padding: "30px 70px",
    maxWidth: "80vw",
    minHeight: "calc(100vh - 200px)",
    marginBottom: "120px",
    borderRadius: "20px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export {
  FairRowBox,
  InfoProductContainer,
  ProductsContainer,
  ProductContainer,
  useFairStyle,
};
