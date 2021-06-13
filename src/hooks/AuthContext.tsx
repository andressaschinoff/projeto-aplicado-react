import React, { useState, createContext } from "react";
import { baseApi } from "../services/api";
import { IUser } from "./useUser";
import jwt_decode from "jwt-decode";
import { defaultUser } from "../helpers/defaults";
import Swal from "sweetalert2";

export const AuthContext = createContext<IContextProps>({} as IContextProps);

interface IContextProps {
  signed: boolean;
  token: string;
  user: IUser;
  login: (x: ILogin) => Promise<{ status: number; user?: IUser }>;
  logout: () => void;
}

export interface ILogin {
  email: string;
  password: string;
}

export const AuthProvider = (props: any) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);
  const [token, setToken] = useState("");

  const login = async (loginInfo: ILogin) => {
    try {
      const { data, status } = await baseApi.post("/login", loginInfo);

      const { token } = data;
      setToken(token);
      localStorage.token = token;
      const currentUser: IUser = jwt_decode(token);
      setUser(currentUser);
      setSigned(true);

      return { user: currentUser, status } as {
        user: IUser;
        status: number;
      };
    } catch (error) {
      console.error(error);
      setSigned(false);
      Swal.fire(
        "Ops",
        "Ocorreu algum erro ao logar, por favor tente mais tarde!",
        "error"
      );
      return {
        status: 401,
      };
    }
  };

  const logout = () => {
    baseApi.get("/login/logout");
    setUser(defaultUser);
    setSigned(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        token,
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
