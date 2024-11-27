import axios from 'axios';
import axiosInstance from './axiosInstance';

type SortType = 'LATEST' | 'NAME';

export const collectionApi = {
  // GET 사용자별 컬렉션 리스트 조회
  userCollections: async () => {
    try {
      const response = await axiosInstance.get('/collections');

      console.dir('[현재 사용자 컬렉션 리스트 조회] : ', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user collections:', error);
      throw error;
    }
  },

  // 컬렉션 ID로 작품 목록 가져오기
  getArtworks: async (sort: SortType, collectionIds: number[]) => {
    try {
      const response = await axiosInstance.post(
        `/collections/arts?sortType=${sort}`,
        {
          collectionIds,
        },
      );
      console.dir('[선택된 컬렉션별 작품 조회] : ', response.data.data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Request URL:', error.config.url);
        console.error('Request Data:', error.config.data);
        console.error('Response Status:', error.response?.status);
        console.error('Response Data:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
      }
      throw error;
    }
  },
};

// POST 새로운 컬렉션 생성
export const createCollection = async (data: {
  name: string;
  description: string;
  artId: number;
}) => {
  try {
    const response = await axiosInstance.post('/collections', data);
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

// POST 기존 컬렉션에 작품 추가
export const addArtworkToCollection = async (
  collectionId: number,
  artIds: number[],
) => {
  try {
    const response = await axiosInstance.post(
      `/collections/${collectionId}/art`,
      { artIds },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding artwork to collection:', error);
    throw error;
  }
};
