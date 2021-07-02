import { ImageType } from "react-images-uploading";
import { IFair } from "../hooks/useFair";
import { IProductCreate } from "../hooks/useProduct";
import { IOrderItem } from "../hooks/useTroller";
import { IUser, IUserCreate } from "../hooks/useUser";

export interface IUserRegisterState extends IUserCreate {
  password: string;
  reapeatPassword: string;
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

export interface IFairState {
  name: string;
  opening: string;
  closing: string;
  weekdays: string[];
  deliveryPrice: number;
  types: string[];
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

export interface IProductError {
  name: boolean;
  type: boolean;
  price: boolean;
  fair: boolean;
  unit: boolean;
  unitQuantity: boolean;
}

export interface IProductHelpers {
  name: string;
  type: string;
  price: string;
  fair: string;
  unit: string;
  unitQuantity: string;
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

export interface ITrollerState {
  id: string;
  active: boolean;
  orderItems: IOrderItem[];
  user?: IUser;
  total: number;
}

export interface IProductState extends IProductCreate {
  unit: string;
  unitQuantity: number;
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

export interface IImageUploadFunctions {
  getImage: () => ImageType;
  clearImage: () => void;
}
