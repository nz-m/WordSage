import axios from "axios";
import { store } from "../features/store";
import { logoutUser } from "../features/auth/authThunks";

const axiosInstance = axios.create({
  baseURL: "http://192.168.31.72:4000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
