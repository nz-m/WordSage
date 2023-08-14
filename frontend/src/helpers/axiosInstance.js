import axios from "axios";
import { getAuthToken } from "./tokenStorage";

const axiosInstance = axios.create({
  baseURL: "http://192.168.31.72:4000",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
