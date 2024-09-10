import axios from 'axios';
import { API_BASE_URL } from '@env';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 0, // 타임아웃 비활성화,
  proxy: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //console.log('Starting Request', JSON.stringify(config, null, 2));
    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    //console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.error('Response Error:', error.message);
    if (error.response) {
      console.error(
        'Error Response Data:',
        JSON.stringify(error.response.data, null, 2),
      );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
