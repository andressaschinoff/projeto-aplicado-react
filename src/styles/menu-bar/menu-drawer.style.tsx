import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const MenuDrawerContainer = styled(Box)`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
`;

const ItemsNumber = styled(Typography)`
  padding: 2px;
  font-size: 12px;
  color: #f44336;
`;
const BoxItemsNumber = styled(Box)`
  margin-left: -15px;
  margin-top: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid white;
  width: 12px;
  height: 12px;
  background-color: white;
`;

export { MenuDrawerContainer, ItemsNumber, BoxItemsNumber };
