import axios from 'axios';
import { BASE_URL } from './index';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    const schoolId = sessionStorage.getItem('SchoolId');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['SchoolID'] = schoolId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
