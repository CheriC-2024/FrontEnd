import axiosInstance from './axiosInstance';
import axiosLocal from './axiosLocal';

export const collectionApi = {
  // 사용자별 컬렉션 가져오기
  userCollections: async (userId: number) => {
    try {
      const response = await axiosLocal.get('/collection', {
        params: { userId },
      });
      // response.data에 collections 배열이 있는지 확인
      if (response.data && response.data.collections) {
        return response.data.collections; // 이 부분이 중요: collections 배열만 반환
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching user collections:', error);
      throw error;
    }
  },
  // 컬렉션 ID로 작품 목록 가져오기
  getArtworks: async (collectionIds: number[]) => {
    try {
      const response = await axiosLocal.post('/collection/all', {
        collectionIds,
      });
      if (response.data && response.data.collections) {
        return response.data.collections;
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
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
