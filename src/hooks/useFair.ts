import { api } from "../services/api";

export interface IFairCreate {
  name: string;
  zipcode: string;
  address: string;
  opening: string;
  closing: string;
  weekDay: string;
  deliveryPrice: number;
  types: string[];
}

export interface IFair extends IFairCreate {
  id: string;
  score?: number;
  moneySign?: number;
}

const useFair = () => {
  const getAll = async () => {
    const { data, status } = await api.get("/fair");

    return { data, status } as {
      data: IFair[];
      status: number;
    };
  };

  return { getAll };
};

export { useFair };
