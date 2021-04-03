import { api } from "../services/api";
import { ITroller } from "./useTroller";

export interface IClienteCreate {
  name: string;
  cpf: string;
  email: string;
  password?: string;
  telephone: string;
}

export interface ICliente extends IClienteCreate {
  id: string;
  trollers?: ITroller;
}

const useProducts = () => {
  const getAll = async (fairId: string) => {
    const { data, status } = await api.get(`/product/${fairId}`);

    return { data, status } as {
      data: ICliente[];
      status: number;
    };
  };

  return { getAll };
};

export { useProducts };
