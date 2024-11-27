import axiosInstance from 'src/api/axiosInstance';

// POST 전시 생성
export const postExhibition = async (exhibitionData: Record<string, any>) => {
  try {
    // POST 요청
    const response = await axiosInstance.post('/exhibitions', exhibitionData);
    console.log('POST 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('POST 실패:', error);
    throw error; // 에러를 상위로 전달
  }
};
