import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionApi, createCollection } from 'src/api/collectionApi';

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

// 컬렉션 생성 훅
export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']); // 컬렉션 관련 데이터를 갱신
    },
    onError: (error) => {
      console.error('Error during collection creation:', error);
    },
  });
};
