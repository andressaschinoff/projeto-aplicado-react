import axios from "axios";
import { defaultFullAddress } from "../helpers/defaults";

export interface IFullAddress {
  zipcode: string;
  address: string;
  complement: string;
  number: string;
  county: string;
  city: string;
  uf: string;
}

const useFullAddress = () => {
  const getAddressByZipcode = async (zipcode: string) => {
    try {
      const { data, status } = await axios.get(
        `https://viacep.com.br/ws/${zipcode}/json/`
      );

      if (!!data?.erro) {
        const fullAddress = defaultFullAddress;

        return { fullAddress, status } as {
          fullAddress: IFullAddress;
          status: number;
        };
      }

      const fullAddress = {
        zipcode: data?.cep,
        address: data?.logradouro,
        complement: data?.complemento,
        county: data?.bairro,
        city: data?.localidade,
        uf: data?.uf,
        number: "",
      };
      return { fullAddress, status } as {
        fullAddress: IFullAddress;
        status: number;
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        fullAddress: defaultFullAddress,
      };
    }
  };

  return { getAddressByZipcode };
};

export { useFullAddress };
