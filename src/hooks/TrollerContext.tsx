import { useState, createContext, useEffect, useContext } from "react";
import { defaultTroller } from "../helpers/defaults";
import AuthContext from "./AuthContext";
import { ITroller, useTroller } from "./useTroller";

export const TrollerContext = createContext<IContexProps>({} as IContexProps);

interface IContexProps {
  troller: ITroller;
  setTroller: (troller: ITroller) => void;
  isCheckout: boolean;
  setIsCheckout: (isTrue: boolean) => void;
}

export const TrollerProvider = ({ children }: any) => {
  const { signed, user } = useContext(AuthContext);
  const [troller, setTroller] = useState<ITroller>(defaultTroller);
  const [isCheckout, setIsCheckout] = useState(false);
  const { getActive } = useTroller();

  useEffect(() => {
    const id = signed ? user.id : null;
    (async () => {
      const { data } = await getActive(id);
      setTroller(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed, troller.active]);

  return (
    <TrollerContext.Provider
      value={{
        troller,
        setTroller,
        isCheckout,
        setIsCheckout,
      }}
    >
      {children}
    </TrollerContext.Provider>
  );
};

export default TrollerContext;
