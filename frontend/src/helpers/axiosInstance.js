// import axios from 'axios';
// import { navigate } from './navigation';
//
// const axiosInstance = axios.create({
//   baseURL: 'https://api.example.com',
// });
//
// // Add a request interceptor to attach the token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = redux store
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
//

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Unauthorized response, navigate to login page
//       navigate('Login');
//     }
//     return Promise.reject(error);
//   }
// );
//
// export default axiosInstance;
