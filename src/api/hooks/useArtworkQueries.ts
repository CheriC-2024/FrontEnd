import { useQuery } from '@tanstack/react-query';
import { fetchArtworkById } from '../artworkApi';

export const useArtworkData = (artworkId: number) => {
  return useQuery({
    queryKey: ['artwork', artworkId], // Query Key
    queryFn: () => fetchArtworkById(artworkId), // API 호출 함수
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하다고 간주
    retry: 2, // 실패 시 재시도 횟수
    onError: (error) => {
      console.error('Error fetching artwork data:', error);
    },
  });
};
