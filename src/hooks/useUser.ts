import { api } from "../services/api";
import { IFullAddress } from "./useFullAddress";
import { ITroller } from "./useTroller";

export interface IUserCreate {
  cpf: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  telephone: string;
  zipcode?: string;
  address?: string;
}

export interface IUser extends IUserCreate {
  id: string;
  trollers?: ITroller[];
  fair?: ITroller;
  fullAddress?: IFullAddress;
}

const useUser = () => {
  const create = async (user: IUserCreate) => {
    const { data, status } = await api.post("/product/", user);

    return { data, status } as {
      data: IUser[];
      status: number;
    };
  };

  return { create };
};

export { useUser };
