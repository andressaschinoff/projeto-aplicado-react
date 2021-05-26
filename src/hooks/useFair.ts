import { defaultFair } from "../helpers/defaults";
import { api } from "../services/api";

export interface IFairCreate {
  name: string;
  zipcode: string;
  address: string;
  opening: string;
  closing: string;
  weekdays: string[];
  deliveryPrice: number;
  types: string[];
}

export interface IFair extends IFairCreate {
  id: string;
  score: number;
  moneySign: number;
}

const useFair = () => {
  const getAll = async () => {
    try {
      const { data, status } = await api.get("/fair");

      return { data, status } as {
        data: IFair[];
        status: number;
      };
    } catch (error) {
      console.log(error);
      return {
        data: [defaultFair],
        status: 400,
      };
    }
  };

  const create = async (fair: IFairCreate) => {
    try {
      const { data, status } = await api.post("/fair", fair);

      return { data, status } as {
        data: IFair;
        status: number;
      };
    } catch (error) {
      console.log(error);
      return {
        data: defaultFair,
        status: 400,
      };
    }
  };

  return { getAll, create };
};

export { useFair };
