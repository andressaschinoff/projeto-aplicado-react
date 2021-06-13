import axios from "axios";

const baseURL = "http://localhost:3001/api";

// const useToken = () => {
//   const { token } = useContext(AuthContext);
//   return token;
// };

const baseApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

// const bearerToken = !!useToken ? `Bearer ${useToken}` : "";
// console.log(bearerToken);

// baseApi.defaults.headers.authorization = bearerToken;

const imageApi = axios.create({
  baseURL: `${baseURL}/image`,
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

export { baseApi, imageApi, baseURL };
