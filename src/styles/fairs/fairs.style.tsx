import { Box, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const FairComponentRowBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
`;

const FairComponentMainContainer = styled(Box)`
  margin: 30px;
  padding: 20px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  @media (max-width: 600px) {
    margin: 30px 0px 0px 0px;
  }
`;

const FairsGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LandingFairContainer = styled(Box)`
  background-color: var(--secondary-color);
  min-height: calc(100vh - 124px);
  @media (max-width: 600px) {
    height: max-content;
  }
`;

const LandingMainContainer = styled(Box)`
  background-color: #fff;
`;

const useFairsStyle = makeStyles(() => ({
  star: {
    paddingRight: "10px",
    color: "var(--star-color)",
    fontSize: "36px",
  },
  scoreStyle: {
    color: "var(--star-color)",
    paddingRight: "40px",
  },
  typesSpacing: {
    paddingRight: "10px",
  },
}));

export {
  FairComponentRowBox,
  FairComponentMainContainer,
  FairsGridContainer,
  LandingFairContainer,
  LandingMainContainer,
  useFairsStyle,
};
