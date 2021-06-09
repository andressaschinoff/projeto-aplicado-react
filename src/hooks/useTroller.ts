import api from "../services/api";
import { IUser } from "./useUser";
import { IProduct } from "./useProduct";
import { defaultTroller } from "../helpers/defaults";
import { IFair } from "./useFair";

export interface ITrollerCreate {
  orderItens?: IOrderItem[];
  user?: IUser;
}

export interface IOrderItem {
  id?: string;
  quantity: number;
  product?: IProduct;
  total?: number;
}

export interface ITroller extends ITrollerCreate {
  id: string;
  fair?: IFair;
  orderNumber?: number;
  sellers?: IUser;
  active: boolean;
  total: number;
  subtotal: number;
}

export interface IGetAll {
  actives: ITroller[];
  inactives: ITroller[];
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

  const checkout = async (id: string, paymentInfo: {}) => {
    try {
      const { data, status } = await api.post(
        `/troller/checkout/${id}`,
        paymentInfo
      );

      return { data, status } as { data: ITroller; status: number };
    } catch (error) {
      console.error(error);
      return { data: defaultTroller, status: 400 };
    }
  };

  const update = async (troller: ITroller) => {
    try {
      const { data, status } = await api.put(
        `/troller/${troller?.id}`,
        troller
      );

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

  const getOne = async (id: string) => {
    try {
      const { data, status } = await api.get(`/troller/${id}`);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return { data: defaultTroller, status: 400 };
    }
  };

  const getAll = async (user: IUser) => {
    try {
      const { data, status } = await api.get(
        `/troller/user/${user.role}/${user.id}`
      );

      return { data, status } as {
        data: IGetAll;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        data: { actives: [defaultTroller], inactives: [defaultTroller] },
        status: 400,
      };
    }
  };

  const getActive = async (userId: string | null) => {
    try {
      const { data, status } = await api.get(`/troller/active?id=${userId}`);

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

  return {
    create,
    update,
    getActive,
    getAll,
    getOne,
    checkout,
  };
};

export { useTroller };
