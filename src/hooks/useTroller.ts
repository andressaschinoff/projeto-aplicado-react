import { baseApi } from "../services/api";
import { IUser } from "./useUser";
import { IProduct } from "./useProduct";
import { defaultTroller } from "../helpers/defaults";
import { IFair } from "./useFair";

export interface ITrollerCreate {
  orderItems?: IOrderItem[];
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
      const { data, status } = await baseApi.post("/troller", troller);

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
      const { data, status } = await baseApi.post(
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
      const { data, status } = await baseApi.put(
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
      const { data, status } = await baseApi.get(`/troller/${id}`);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.error(error);
      return { data: defaultTroller, status: 400 };
    }
  };

  const getAllbyUser = async (user: IUser) => {
    try {
      const { data, status } = await baseApi.get(`/troller/all/${user.id}`);

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
      const url = "/troller/active" + (!!userId ? `?id=${userId}` : "");
      const { data, status } = await baseApi.get(url);

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
    getAllbyUser,
    getOne,
    checkout,
  };
};

export { useTroller };
