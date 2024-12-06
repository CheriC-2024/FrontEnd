import axios from 'axios';
import axiosInstance from 'src/api/axiosInstance';
import { Exhibition } from 'src/interfaces/collection';

// POST 전시 생성
export const postExhibition = async (exhibitionData: Record<string, any>) => {
  try {
    // POST 요청
    const response = await axiosInstance.post('/exhibitions', exhibitionData);
    console.log('POST 성공:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('AxiosError Details:');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Headers:', error.response?.headers);

      throw new Error(
        `Error: ${error.response?.status} - ${
          error.response?.data?.message || 'Internal Server Error'
        }`,
      );
    } else {
      console.error('Non-Axios error occurred:', error);
      throw new Error('An unknown error occurred.');
    }
  }
};

// GET 전시 조회 (리스트용도)
export const getExhibitions = async ({
  artId,
  userId,
  order,
  page,
  size,
}: {
  artId?: number;
  userId?: number;
  order: 'NAME' | 'LATEST' | 'LIKE' | 'HITS';
  page: number;
  size: number;
}): Promise<Exhibition[]> => {
  const response = await axiosInstance.get('/exhibitions', {
    params: {
      ...(artId && { artId }),
      ...(userId && { userId }),
      order,
      page,
      size,
    },
  });
  console.log('[전시 목록 조회] : ', response.data.data);
  return response.data.data; // API 응답 구조에 맞게 데이터 반환
};

// GET 전시 내용 조회
export const getExhibitionDetails = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/exhibitions/${id}`);
    return response.data.data;
  } catch (error) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error('AxiosError Details:');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Headers:', error.response?.headers);

      throw new Error(
        `Error: ${error.response?.status} - ${
          error.response?.data?.message || 'Internal Server Error'
        }`,
      );
    } else {
      console.error('Non-Axios error occurred:', error);
      throw new Error('An unknown error occurred.');
    }
  }
};

// POST 작품 좋아요
export const addExhibitHeart = async (exhibitId: number) => {
  const response = await axiosInstance.post(`/exhibitions/${exhibitId}/heart`);
  return response.data.data;
};

// DELETE 작품 좋아요
export const removeExhibitHeart = async (exhibitId: number) => {
  const response = await axiosInstance.delete(
    `/exhibitions/${exhibitId}/heart`,
  );
  return response.data.data;
};

// POST 조회수 증가
export const incrementExhibitHits = async (exhibitId: number) => {
  const response = await axiosInstance.post(`/exhibitions/${exhibitId}/hits`);
  return response.data;
};
