import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import FairListComponent from "../components/FairList.component";
import { IFair, useFair } from "../hooks/useFair";
import { FairsGridContainer } from "../styles/fairs/fairs.style";
import { MainContainer } from "../styles/main.style";

const Fairs: React.FC = () => {
  const [fairs, setFairs] = useState<IFair[]>([]);
  const { push } = useHistory();
  const { getAll } = useFair();

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
    push(`/feira/${id}`);
  };

  return (
    <MainContainer>
      <Typography variant="h3" align="center" color="primary">
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
      {/* </Box> */}
    </MainContainer>
  );
};

export default Fairs;
