import axios from "axios";

const token = localStorage.token;
// const { token } = ;
// const { token } = useContext(AuthContext);

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

// api.defaults.headers.authorization = !!token ? `Bearer ${token}` : "";

export { api };

export default api;
