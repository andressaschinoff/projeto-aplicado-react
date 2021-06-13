import Swal from "sweetalert2";
import { defaultUser } from "../helpers/defaults";
import { baseApi } from "../services/api";
import { IFair } from "./useFair";
import { ITroller } from "./useTroller";

export interface IUserCreate {
  name: string;
  cpf: string;
  email: string;
  password?: string;
  role: string;
  telephone: string;
  zipcode?: string;
  address?: string;
  fair?: IFair;
}

export interface IUser extends IUserCreate {
  id: string;
  trollers?: ITroller[];
}

const useUser = () => {
  const create = async (user: IUserCreate) => {
    try {
      const { data, status } = await baseApi.post("/user/", user);

      return { data, status } as {
        data: IUser[];
        status: number;
      };
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Ops!",
        "Ocorreu algum erro na criação do seu usuário, tente novamente mais tarde!",
        "error"
      );
      return { data: defaultUser, status: 400 };
    }
  };

  return { create };
};

export { useUser };
