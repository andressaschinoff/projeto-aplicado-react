import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FairComponent from "../components/fair.component";
import { IFair, useFairs } from "../hooks/useFairs";
import { FairsGridContainer, useFairsStyle } from "../styles/fairs/fairs.style";

const Fairs: React.FC = () => {
  const [fairs, setFairs] = useState<IFair[]>([]);
  const { push } = useHistory();
  const { getAll } = useFairs();
  const { fairsMainContainer } = useFairsStyle();

  useEffect(() => {
    (async () => {
      const { data, status } = await getAll();
      if (status !== 200) {
        setFairs([]);
      }
      setFairs(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFairSelected = (id: string) => {
    const currentFair = fairs.find((fair) => fair.id === id);
    push("/feira", currentFair);
  };

  return (
    <Box className={fairsMainContainer}>
      <Typography variant="h3" align="center" color="textSecondary">
        Nossas parceiras
      </Typography>
      <FairsGridContainer>
        {!!fairs &&
          fairs.length > 0 &&
          fairs.map((fair) => {
            return (
              <FairComponent
                onFairSelected={handleFairSelected}
                key={fair.id}
                fair={fair}
              />
            );
          })}
      </FairsGridContainer>
    </Box>
  );
};

export default Fairs;
