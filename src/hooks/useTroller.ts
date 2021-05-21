import api from "../services/api";
import { IUser } from "./useUser";
import { IProduct } from "./useProduct";

export interface ITrollerCreate {
  products?: IProducts[];
  client?: IUser;
}

export interface IProducts {
  quantity: number;
  product?: IProduct;
}

export interface ITroller extends ITrollerCreate {
  id: string;
  active?: boolean;
}

const useTroller = () => {
  const create = async () => {
    const { data, status } = await api.post("/troller");

    return { data, status } as {
      data: ITroller;
      status: number;
    };
  };

  const update = async (troller: ITroller) => {
    const { data, status } = await api.put(`/troller/${troller?.id}`, troller);

    return { data, status } as {
      data: ITroller;
      status: number;
    };
  };

  return { create, update };
};

export { useTroller };
