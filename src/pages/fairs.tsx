import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FairListComponent from "../components/FairList.component";
import { IFair, useFair } from "../hooks/useFair";
import { FairsGridContainer, useFairsStyle } from "../styles/fairs/fairs.style";

const Fairs: React.FC = () => {
  const [fairs, setFairs] = useState<IFair[]>([]);
  const { push } = useHistory();
  const { getAll } = useFair();
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
    <Container maxWidth="lg">
      <Box className={fairsMainContainer}>
        <Typography variant="h3" align="center" color="textPrimary">
          Nossas parceiras
        </Typography>
        <FairsGridContainer>
          {!!fairs &&
            fairs.length > 0 &&
            fairs.map((fair) => {
              return (
                <FairListComponent
                  onFairSelected={handleFairSelected}
                  key={fair.id}
                  fair={fair}
                />
              );
            })}
        </FairsGridContainer>
      </Box>
    </Container>
  );
};

export default Fairs;
