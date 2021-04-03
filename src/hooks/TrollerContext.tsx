import { useState, createContext, useEffect } from "react";
import { ITroller, useTroller } from "./useTroller";

export const TrollerContext = createContext<IContexProps>({} as IContexProps);

interface IContexProps {
  troller: ITroller;
  setTroller: (troller: ITroller) => void;
}

// |

export const TrollerProvider = ({ children }: any) => {
  const [troller, setTroller] = useState<ITroller>({ id: "" });
  const { create } = useTroller();

  useEffect(() => {
    (async () => {
      const { data, status } = await create();
      if (status === 200) {
        setTroller(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TrollerContext.Provider
      value={{
        troller,
        setTroller,
      }}
    >
      {children}
    </TrollerContext.Provider>
  );
};

export default TrollerContext;
