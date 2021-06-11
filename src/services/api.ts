import axios from "axios";

const token = localStorage.token;
// const { token } = ;
// const { token } = useContext(AuthContext);

export const baseURL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

export const imageApi = axios.create({
  baseURL: "http://localhost:3001/api/image",
});

// api.defaults.headers.authorization = !!token ? `Bearer ${token}` : "";

export { api };

export default api;
