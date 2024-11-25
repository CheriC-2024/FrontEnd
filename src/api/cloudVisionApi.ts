import axiosInstance from './axiosInstance';

export const extractProperties = async (
  artIds: number[],
  cloudVisionType: 'LABEL_DETECTION' | 'IMAGE_PROPERTIES',
) => {
  try {
    const response = await axiosInstance.post('/exhibition/ai/cloud', {
      cloudVisionType,
      artIds,
    });

    // 응답 데이터 검증 및 처리
    const { data: responseData, code, message } = response.data;

    if (code === 201) {
      console.log('API Call Success:', message);

      // 필요한 데이터만 반환
      return responseData.map((item: { artId: number; properties: any[] }) => ({
        id: item.artId,
        properties: item.properties,
      }));
    } else {
      throw new Error(`Unexpected response code: ${code}`);
    }
  } catch (error) {
    console.error('cloudVisionApi.ts - Error extracting properties:', error);
    throw error;
  }
};
