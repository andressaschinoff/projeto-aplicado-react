import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { IFair } from "../hooks/useFair";
import {
  FairComponentMainContainer,
  FairComponentRowBox,
  useFairsStyle,
} from "../styles/fairs/fairs.style";

interface Props {
  fair: IFair;
  onFairSelected: (id: string, name: string) => void;
}

export function FairListComponent({ fair, onFairSelected }: Props) {
  const { name, id, score, deliveryPrice, types } = fair;
  const { star, scoreStyle, typesSpacing } = useFairsStyle();

  return (
    <FairComponentMainContainer onClick={() => onFairSelected(id, name)}>
      <Typography variant="h5" color="secondary">
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
          <Typography color="secondary" variant="h6">
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
                color="secondary"
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

export default FairListComponent;
