import { useQuery } from '@tanstack/react-query';
import { collectionApi } from 'src/api/collectionApi';

// 유저 컬렉션을 가져오는 훅
export const useUserCollection = (userId: number) => {
  return useQuery({
    queryKey: ['collections', userId],
    queryFn: () => collectionApi.userCollections(userId),
  });
};

// 특정 컬렉션에 속한 작품 목록을 가져오는 훅
export const useArtworkList = (collectionIds: number[]) => {
  return useQuery({
    queryKey: ['artworks', collectionIds],
    queryFn: () => collectionApi.getArtworks(collectionIds),
    enabled: collectionIds.length > 0, // collectionIds가 있을 때만 쿼리 실행
  });
};
