import { useQuery } from '@tanstack/react-query';
import {
  fetchArtTypes,
  fetchArtTypesFilter,
  fetchArtworkById,
} from '../artworkApi';

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

export const useFetchArtTypes = (
  order: string = 'LATEST',
  page: number = 0,
  size: number = 15,
) => {
  return useQuery({
    queryKey: ['art-types', order, page, size],
    queryFn: () => fetchArtTypes(order, page, size),
    keepPreviousData: true, // Useful for pagination
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useFetchArtTypesFilter = ({
  artType,
  order = 'LATEST',
  page = 0,
  size = 10,
  userId,
  isCollectorsArt,
}: {
  artType?: string;
  order?: string;
  page?: number;
  size?: number;
  userId?: number;
  isCollectorsArt?: string;
}) => {
  return useQuery({
    queryKey: [
      'artTypesFilter',
      artType,
      order,
      page,
      size,
      userId,
      isCollectorsArt,
    ],
    queryFn: () =>
      fetchArtTypesFilter({
        artType,
        order,
        page,
        size,
        userId,
        isCollectorsArt,
      }),

    keepPreviousData: true, // Keeps previous data while fetching new data
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
};
