import axiosInstance from './axiosInstance';

export const getAIThemesTitle = async (requestType: string, aiLabel: any[]) => {
  try {
    const response = await axiosInstance.post(
      `/chatgpt?requestType=${requestType}`,
      aiLabel,
    );
    console.log('ChatGPT API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting AI themes:', error);
    throw error;
  }
};
