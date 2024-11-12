import axios from 'axios';
import { API_BASE_URL } from '@env';
import store from 'src/store';
import { clearTokens, setTokens } from 'src/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 0,
  proxy: false,
});

// 리프레시 토큰을 사용하여 새 엑세스 토큰 발급
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  console.log('Access Token in Request:', accessToken);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = store.getState().auth;

      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          store.dispatch(
            setTokens({ accessToken: newAccessToken, refreshToken }),
          );
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          store.dispatch(clearTokens()); // 로그아웃 처리
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
