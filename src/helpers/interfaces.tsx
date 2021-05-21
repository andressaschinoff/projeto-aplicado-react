import { IFullAddress } from "../hooks/useFullAddress";

export interface IUserRegisterState {
  name: string;
  cpf: string;
  email: string;
  password: string;
  reapeatPassword: string;
  telephone: string;
  role: string;
  zipcode?: string;
  address?: string;
  fullAddress?: IFullAddress;
  showPassword: boolean;
  showReapeatPassword: boolean;
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

export interface IFairError {
  name: boolean;
  zipcode: boolean;
  address: boolean;
  addressNumber: boolean;
  opening: boolean;
  closing: boolean;
  weekDay: boolean;
  deliveryPrice: boolean;
  types: boolean;
}

export interface IFairHelperText {
  name: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  opening: string;
  closing: string;
  weekDay: string;
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
