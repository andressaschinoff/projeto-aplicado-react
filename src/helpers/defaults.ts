const defaultFullAddress = {
  zipcode: "",
  address: "",
  complement: "",
  county: "",
  city: "",
  uf: "",
  number: "",
};

const defaultUserRegister = {
  cpf: "",
  email: "",
  name: "",
  password: "",
  reapeatPassword: "",
  role: "",
  telephone: "",
  fullAddress: defaultFullAddress,
  showPassword: false,
  showReapeatPassword: false,
};

const defaultUserHelper = {
  cpf: "",
  email: "",
  name: "",
  password: "",
  reapeatPassword: "",
  role: "",
  telephone: "",
};

const defaultUserErrors = {
  cpf: false,
  email: false,
  name: false,
  password: false,
  reapeatPassword: false,
  role: false,
  telephone: false,
};

export {
  defaultFullAddress,
  defaultUserRegister,
  defaultUserHelper,
  defaultUserErrors,
};
