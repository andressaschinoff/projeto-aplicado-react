import { api } from "../services/api";

export interface ILogin {
  email: string;
  password: string;
}

const useLogin = () => {
  const login = async (loginInfo: ILogin) => {
    const { data, status } = await api.post("/login", loginInfo);

    return { data, status } as {
      data: string;
      status: number;
    };
  };

  return { login };
};

export { useLogin };
