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
  const getAll = async (fairId: string) => {
    const { data, status } = await api.get(`/product/${fairId}`);

    return { data, status } as {
      data: IUser[];
      status: number;
    };
  };

  return { getAll };
};

export { useUser };
