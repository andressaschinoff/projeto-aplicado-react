import axios from 'axios';

//const {token} = loginContext();

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-type': 'application/json',
  },
});

//api.defaults.headers.authorization = !!token ? `Bearer ${token}` : "";

export { api };

export default api;
