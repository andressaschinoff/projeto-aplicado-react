import { useState, createContext, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { ITroller, useTroller } from "./useTroller";

export const TrollerContext = createContext<IContexProps>({} as IContexProps);

interface IContexProps {
  troller: ITroller;
  setTroller: (troller: ITroller) => void;
}

export const TrollerProvider = ({ children }: any) => {
  const { signed, user } = useContext(AuthContext);
  const [troller, setTroller] = useState<ITroller>({ id: "" });
  const { getEmpty, getActive } = useTroller();

  useEffect(() => {
    if (!signed) {
      (async () => {
        const { data } = await getEmpty();
        setTroller(data);
      })();
    } else {
      (async () => {
        const { data } = await getActive(user);
        setTroller(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed, user]);

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
