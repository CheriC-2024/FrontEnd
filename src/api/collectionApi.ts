import axiosInstance from './axiosInstance';

export const collectionApi = {
  // 사용자별 컬렉션 가져오기
  userCollections: async (userId: number) => {
    try {
      const response = await axiosInstance.get('/collection', {
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
      const response = await axiosInstance.post('/collection/all', {
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
