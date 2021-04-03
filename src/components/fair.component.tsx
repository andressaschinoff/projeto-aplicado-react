import React from "react";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { IFair } from "../hooks/useFairs";
import {
  FairComponentMainContainer,
  FairComponentRowBox,
  useFairsStyle,
} from "../styles/fairs/fairs.style";

interface Props {
  fair: IFair;
  onFairSelected: (id: string) => void;
}

export function FairComponent({ fair, onFairSelected }: Props) {
  const { name, id, score, deliveryPrice, types } = fair;
  const { star, scoreStyle, typesSpacing } = useFairsStyle();

  return (
    <FairComponentMainContainer onClick={() => onFairSelected(id)}>
      <Typography variant="h5" color="textSecondary">
        <b>{name}</b>
      </Typography>
      <FairComponentRowBox>
        <FairComponentRowBox>
          <StarIcon className={star} />
          <Typography variant="h6" className={scoreStyle}>
            <b>{score}</b>
          </Typography>
        </FairComponentRowBox>
        <FairComponentRowBox>
          <Typography color="textSecondary" variant="h6">
            <b>R$ {deliveryPrice}</b>
          </Typography>
        </FairComponentRowBox>
      </FairComponentRowBox>
      <FairComponentRowBox>
        {!!types &&
          types.length > 0 &&
          types.map((type) => {
            return (
              <Typography
                color="textSecondary"
                key={`${id}${type}`}
                variant="h6"
                className={typesSpacing}
              >
                {type}
              </Typography>
            );
          })}
      </FairComponentRowBox>
    </FairComponentMainContainer>
  );
}

export default FairComponent;
