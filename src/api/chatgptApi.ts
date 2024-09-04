import axiosInstance from './axiosInstance';

export const getAIThemesTitle = async (requestType: string, ailabel: any[]) => {
  try {
    const response = await axiosInstance.post(
      `/chatgpt?requestType=${requestType}`,
      ailabel, // data 객체가 아니라 직접 ailabel 배열을 전송
    );
    return response.data;
  } catch (error) {
    console.error('Error getting AI themes:', error);
    throw error;
  }
};
