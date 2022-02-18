import axios from "axios";
import Sh from "./shared-helper";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(async (config) => {
  const token = await Sh.storageGet("token");

  token && (config.headers.authorization = `Bearer ${token}`);

  return config;
});

export default http;
