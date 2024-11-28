import { useQuery } from '@tanstack/react-query';
import { getExhibitionDetails, getExhibitions } from 'src/api/exhibitApi';

export const useExhibitions = ({
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
}) => {
  return useQuery({
    queryKey: ['exhibitions', artId, userId, order, page, size], // 캐싱 키
    queryFn: () => getExhibitions({ artId, userId, order, page, size }), // API 호출
    keepPreviousData: true, // 페이지네이션 시 이전 데이터 유지
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
  });
};

export const useExhibitionDetails = (id: number) => {
  return useQuery({
    queryKey: ['exhibitionDetails', id],
    queryFn: () => getExhibitionDetails(id),
    enabled: !!id, // id가 있을 때만 요청
  });
};
