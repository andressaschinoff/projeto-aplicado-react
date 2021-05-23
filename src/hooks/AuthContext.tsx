import React, { useState, createContext } from "react";
import api from "../services/api";
import { IUser } from "./useUser";
import jwt_decode from "jwt-decode";
import { defaultUser } from "../helpers/defaults";

export const AuthContext = createContext<IContextProps>({} as IContextProps);

interface IContextProps {
  signed: boolean;
  user: IUser;
  login: (x: ILogin) => Promise<{ status: number }>;
  logout: () => void;
}

export interface ILogin {
  email: string;
  password: string;
}

export const AuthProvider = (props: any) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);

  const login = async (loginInfo: ILogin) => {
    const { data, status } = await api.post("/login", loginInfo);

    if (status !== 200) {
      setSigned(false);
      console.log("here");
      return { status } as { status: number };
    }
    const { token } = data;
    const currentUser: IUser = jwt_decode(token);
    console.log(currentUser);
    setUser(currentUser);
    setSigned(true);
    return { status } as { status: number };
  };

  const logout = () => {
    setUser(defaultUser);
    setSigned(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
