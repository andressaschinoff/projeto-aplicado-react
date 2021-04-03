import { api } from "../services/api";

export interface IProductCreate {
  name: string;
  type: string;
  price: number;
  fair: string;
}

export interface IProduct extends IProductCreate {
  id: string;
  description?: string;
}

const useProducts = () => {
  const getAll = async (fairId: string) => {
    const { data, status } = await api.get(`/product/${fairId}`);

    return { data, status } as {
      data: IProduct[];
      status: number;
    };
  };

  return { getAll };
};

export { useProducts };
