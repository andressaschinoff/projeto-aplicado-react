import axios from "axios";

const baseURL = "http://localhost:3001/api";

const baseApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

const imageApi = axios.create({
  baseURL: `${baseURL}/image`,
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

export { baseApi, imageApi, baseURL };
