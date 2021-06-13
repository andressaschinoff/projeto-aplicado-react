import { useState, createContext } from "react";

export const LoadingContext = createContext<IContextProps>({} as IContextProps);

interface IContextProps {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const LoadingProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
