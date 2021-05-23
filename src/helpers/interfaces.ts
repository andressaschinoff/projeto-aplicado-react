import { IFair, IFairCreate } from "../hooks/useFair";
import { IFullAddress } from "../hooks/useFullAddress";
import { IUserCreate } from "../hooks/useUser";

export interface IUserRegisterState extends IUserCreate {
  password: string;
  reapeatPassword: string;
  fullAddress?: IFullAddress;
  showPassword: boolean;
  showReapeatPassword: boolean;
  fair?: IFair;
  fairName?: string;
}

export interface IUserError {
  name: boolean;
  cpf: boolean;
  email: boolean;
  password: boolean;
  reapeatPassword: boolean;
  telephone: boolean;
  role: boolean;
}

export interface IUserHelperText {
  name: string;
  cpf: string;
  email: string;
  password: string;
  reapeatPassword: string;
  telephone: string;
  role: string;
}

export interface IFairState extends IFairCreate {
  addressNumber: string;
}

export interface IFairError {
  name: boolean;
  zipcode: boolean;
  address: boolean;
  addressNumber: boolean;
  opening: boolean;
  closing: boolean;
  weekdays: boolean;
  deliveryPrice: boolean;
  types: boolean;
}

export interface IFairHelpers {
  name: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  opening: string;
  closing: string;
  weekdays: string;
  deliveryPrice: string;
  types: string;
}

export interface IFullAddressHelper {
  zipcode: string;
  number: string;
}

export interface IFullAddressError {
  zipcode: boolean;
  number: boolean;
}

export interface IConvertAddress {
  zipcode: string;
  address: string;
}

export interface ILoginState {
  email: string;
  password: string;
  helper: string;
  showpass: boolean;
  isReady: boolean;
  error: boolean;
}

export interface IAddressFunctions {
  checkAddressErrors: () => boolean;
  getAddressInfo: () => IConvertAddress;
  clearAddressInfo: () => void;
}

export interface ICpfFunctions {
  clearCpf: () => void;
}

export interface ICelphoneFunctions {
  clearCelphone: () => void;
}

export interface IZipcodeFunctions {
  clearZipcode: () => void;
}
