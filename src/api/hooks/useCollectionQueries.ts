import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addArtworkToCollection,
  collectionApi,
  createCollection,
} from 'src/api/collectionApi';

// 유저 컬렉션을 가져오는 훅
export const useUserCollection = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionApi.userCollections(),
  });
};

// 특정 컬렉션에 속한 작품 목록을 가져오는 훅
export const useArtworkList = (
  sort: 'LATEST' | 'NAME',
  collectionIds: number[],
) => {
  return useQuery({
    queryKey: ['artworks', sort, collectionIds],
    queryFn: () => collectionApi.getArtworks(sort, collectionIds),
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

// 기존 컬렉션에 작품 추가 훅
export const useAddArtworkToCollection = () => {
  return useMutation({
    mutationFn: ({
      collectionId,
      artIds,
    }: {
      collectionId: number;
      artIds: number[];
    }) => addArtworkToCollection(collectionId, artIds),
    onSuccess: () => {
      console.log('Artwork successfully added to collection!');
    },
    onError: (error) => {
      console.error('Failed to add artwork to collection:', error);
    },
  });
};
