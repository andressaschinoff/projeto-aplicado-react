import styled from "styled-components";

const MenuHeader = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 220px auto;
  padding: 10px;
`;

const MenuSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LogoSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuImg = styled.img`
  width: 100px;
  height: 100px;
`;

const MainTitle = styled.h5`
  font-family: "Lobster", cursive;
  font-size: 32px;
`;

export { LogoSection, MenuHeader, MenuImg, MenuSection, MainTitle };
