import { IFair } from "../hooks/useFair";
import { IFullAddress } from "../hooks/useFullAddress";
import { IProduct } from "../hooks/useProduct";
import { ITroller } from "../hooks/useTroller";
import { IUser } from "../hooks/useUser";
import {
  IFairError,
  IFairHelpers,
  IFairState,
  ILoginState,
  IUserError,
  IUserHelperText,
  IUserRegisterState,
} from "./interfaces";

const defaultUser: IUser = {
  id: "",
  name: "",
  cpf: "",
  email: "",
  role: "",
  telephone: "",
};

const defaultFullAddress: IFullAddress = {
  zipcode: "",
  address: "",
  complement: "",
  county: "",
  city: "",
  uf: "",
  number: "",
};
const defaultFair: IFair = {
  id: "",
  name: "",
  zipcode: "",
  address: "",
  opening: "",
  closing: "",
  weekdays: [],
  deliveryPrice: 0,
  types: [],
  score: 0,
  moneySign: 0,
};

const defaultUserState: IUserRegisterState = {
  cpf: "",
  email: "",
  name: "",
  password: "",
  reapeatPassword: "",
  role: "",
  telephone: "",
  showPassword: false,
  showReapeatPassword: false,
  fair: defaultFair,
  fairName: "",
};

const defaultUserHelper: IUserHelperText = {
  cpf: "",
  email: "",
  name: "",
  password: "",
  reapeatPassword: "",
  role: "",
  telephone: "",
};

const defaultUserErrors: IUserError = {
  cpf: false,
  email: false,
  name: false,
  password: false,
  reapeatPassword: false,
  role: false,
  telephone: false,
};

const defaultLogin: ILoginState = {
  email: "",
  password: "",
  helper: "",
  showpass: false,
  isReady: false,
  error: false,
};

const defaultFairStates: IFairState = {
  closing: "",
  deliveryPrice: 0,
  name: "",
  opening: "",
  types: [],
  weekdays: [],
};

const defaultFairErros: IFairError = {
  address: false,
  closing: false,
  deliveryPrice: false,
  name: false,
  opening: false,
  types: false,
  weekdays: false,
  zipcode: false,
  addressNumber: false,
};

const defaultFairHelpers: IFairHelpers = {
  address: "",
  closing: "",
  deliveryPrice: "",
  name: "",
  opening: "",
  types: "",
  weekdays: "",
  zipcode: "",
  addressNumber: "",
};

const defaultTroller: ITroller = {
  id: "",
  active: false,
};

const defaultProduct: IProduct = {
  id: "",
  name: "",
  type: "",
  price: 0,
  fair: "",
};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export {
  defaultUser,
  defaultFullAddress,
  defaultFair,
  defaultFairErros,
  defaultFairHelpers,
  defaultFairStates,
  defaultUserState as defaultUserRegister,
  defaultUserHelper,
  defaultUserErrors,
  defaultLogin,
  defaultTroller,
  defaultProduct,
  weekdays,
};
