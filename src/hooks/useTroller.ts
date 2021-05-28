import api from "../services/api";
import { IUser } from "./useUser";
import { IProduct } from "./useProduct";
import { defaultTroller } from "../helpers/defaults";

export interface ITrollerCreate {
  orderItens?: IOrderItem[];
  user?: IUser;
}

export interface IOrderItem {
  quantity: number;
  product?: IProduct;
  total?: number;
}

export interface ITroller extends ITrollerCreate {
  id: string;
  active: boolean;
  total: number;
}

const useTroller = () => {
  const create = async (user: IUser) => {
    try {
      const troller: ITrollerCreate = { user: user };
      const { data, status } = await api.post("/troller", troller);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        data: defaultTroller,
        status: 400,
      };
    }
  };

  const getEmpty = async () => {
    try {
      const { data, status } = await api.get("/troller/empty");

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        data: defaultTroller,
        status: 400,
      };
    }
  };

  const update = async (id: string, troller: ITroller) => {
    try {
      const { data, status } = await api.put(`/troller/${id}`, troller);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        status: 400,
        data: troller,
      };
    }
  };

  const inactive = async (troller: ITroller) => {
    try {
      const { status } = await api.delete(`/troller/${troller?.id}`);

      return { status } as {
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        status: 400,
      };
    }
  };

  const getActive = async (user: IUser) => {
    try {
      const { data, status } = await api.get(`/troller/user/${user.id}`);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);

      try {
        const { data, status } = await create(user);

        return { data, status } as {
          data: ITroller;
          status: number;
        };
      } catch (e) {
        console.error(error);
        return { data: defaultTroller, status: 400 };
      }
    }
  };

  return { create, update, getEmpty, inactive, getActive };
};

export { useTroller };
