import axiosInstance from './axiosInstance';

export const getAIThemesTitle = async (
  chatGptType: 'THEME' | 'TITLE',
  artProperties: any[],
) => {
  try {
    const response = await axiosInstance.post('/exhibition/ai/chat-gpt', {
      chatGptType,
      artProperties,
    });

    // 응답 데이터 검증 및 처리
    const { data: responseData, code, message } = response.data;

    if (code === 201) {
      console.log('ChatGPT API Call Success:', message);

      // 필요한 데이터만 반환
      return {
        reason: responseData.reason,
        result: responseData.result,
      };
    } else {
      throw new Error(`Unexpected response code: ${code}`);
    }
  } catch (error) {
    console.error('Error getting AI themes or titles:', error);
    throw error;
  }
};
