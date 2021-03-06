import Swal from "sweetalert2";
import { defaultProduct } from "../helpers/defaults";
import { baseApi } from "../services/api";
import { IFair } from "./useFair";

export interface IProductCreate {
  name: string;
  description?: string;
  type: string;
  image?: string;
  price: number;
  fair: IFair;
  unitsOfMeasure: string;
  countInStock?: number;
}

export interface IProduct extends IProductCreate {
  id: string;
}

const useProduct = () => {
  const getAllByFair = async (fairId: string) => {
    try {
      const { data, status } = await baseApi.get(`/product/${fairId}`);

      return { data, status } as {
        data: IProduct[];
        status: number;
      };
    } catch (error) {
      console.error(error);
      return {
        status: 400,
        data: [defaultProduct],
      };
    }
  };

  const create = async (product: IProductCreate) => {
    try {
      const { data, status } = await baseApi.post("/product", product);

      return { data, status } as {
        data: IProduct;
        status: number;
      };
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Ops",
        "Ocorreu algum erro ao criar seu produto, por favor tente mais tarde!",
        "error"
      );
      return {
        data: defaultProduct,
        status: 400,
      };
    }
  };

  return { getAll: getAllByFair, create };
};

export { useProduct };
