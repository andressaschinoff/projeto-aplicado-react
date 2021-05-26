import Swal from "sweetalert2";
import { api } from "../services/api";

export interface ILogin {
  email: string;
  password: string;
}

const useLogin = () => {
  const login = async (loginInfo: ILogin) => {
    try {
      const { data, status } = await api.post("/login", loginInfo);

      return { data, status } as {
        data: string;
        status: number;
      };
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Ops",
        "Ocorreu algum erro ao logar, por favor tente mais tarde!",
        "error"
      );
      return {
        data: loginInfo,
        status: 400,
      };
    }
  };

  return { login };
};

export { useLogin };
