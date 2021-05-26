import api from "../services/api";
import { IUser } from "./useUser";
import { IProduct } from "./useProduct";
import { defaultTroller } from "../helpers/defaults";

export interface ITrollerCreate {
  products?: IProducts[];
  user?: IUser;
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
  const create = async (user: IUser) => {
    try {
      const troller: ITrollerCreate = { user: user };
      const { data, status } = await api.post("/troller", troller);

      return { data, status } as {
        data: ITroller;
        status: number;
      };
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return {
        data: defaultTroller,
        status: 400,
      };
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);

      try {
        const { data, status } = await create(user);

        return { data, status } as {
          data: ITroller;
          status: number;
        };
      } catch (e) {
        console.log(error);
        return { data: defaultTroller, status: 400 };
      }
    }
  };

  return { create, update, getEmpty, inactive, getActive };
};

export { useTroller };
