import axios from 'axios';

const axiosLocal = axios.create({
  baseURL: ':8080/api/v1',
  timeout: 0,
  proxy: false,
});

export default axiosLocal;
