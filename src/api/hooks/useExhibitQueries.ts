import { useQuery } from '@tanstack/react-query';
import {
  getExhibitionCommentReplies,
  getExhibitionCommentsList,
  getExhibitionDetails,
  getExhibitions,
} from 'src/api/exhibitApi';

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

export const useCommentsList = ({
  exhibitId,
  page,
  size,
}: {
  exhibitId: number;
  page: number;
  size: number;
}) => {
  return useQuery({
    queryKey: ['exhibitionComments', exhibitId, page, size], // 캐싱 키에 page와 size 포함
    queryFn: () => getExhibitionCommentsList({ exhibitId, page, size }),
    keepPreviousData: true, // 페이지 변경 시 이전 데이터 유지
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
    enabled: !!exhibitId, // exhibitId가 있을 때만 요청
  });
};

export const useCommentReplies = ({
  exhibitId,
  commentId,
}: {
  exhibitId: number;
  commentId: number;
}) => {
  return useQuery({
    queryKey: ['exhibitionCommentReplies', exhibitId, commentId],
    queryFn: () => getExhibitionCommentReplies({ exhibitId, commentId }),
    keepPreviousData: true, // 페이지 변경 시 이전 데이터 유지
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
    enabled: !!exhibitId && !!commentId, // exhibitId와 reviewId가 있을 때만 요청
  });
};
