import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const MenuItemsHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuItemsOptions = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
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

export { MenuItemsHeader, MenuItemsOptions, ItemsNumber, BoxItemsNumber };
