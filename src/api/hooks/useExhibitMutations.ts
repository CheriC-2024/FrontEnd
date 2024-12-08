import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addExhibitHeart,
  incrementExhibitHits,
  postExhibitionComment,
  postExhibitionCommentReply,
  removeExhibitHeart,
} from '../exhibitApi';

// 좋아요 추가 Mutation
export const useAddExhibitHeart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhibitId: number) => addExhibitHeart(exhibitId),
    onSuccess: (newHeartCount, variables) => {
      queryClient.setQueryData(['exhibition', variables], (oldData: any) => ({
        ...oldData,
        heartCount: newHeartCount,
      }));
    },
  });
};

// 좋아요 취소 Mutation
export const useRemoveExhibitHeart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhibitId: number) => removeExhibitHeart(exhibitId),
    onSuccess: (newHeartCount, variables) => {
      queryClient.setQueryData(['exhibition', variables], (oldData: any) => ({
        ...oldData,
        heartCount: newHeartCount,
      }));
    },
  });
};

// 조회수 증가
export const useIncrementHits = () => {
  return useMutation({
    mutationFn: (exhibitId: number) => incrementExhibitHits(exhibitId),
  });
};

// 댓글 추가
export const usePostComment = (exhibitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      postExhibitionComment({ exhibitId, message }),

    onSuccess: () => {
      // 방명록 데이터 업데이트
      queryClient.invalidateQueries(['exhibitionComments', exhibitId]);
    },
  });
};

// 대댓글 추가
export const usePostCommentReply = (exhibitId: number, commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      postExhibitionCommentReply({ exhibitId, commentId, message }),

    onSuccess: (data) => {
      console.log('Reply posted successfully:', data);
      queryClient.invalidateQueries([
        'exhibitionCommentReplies',
        exhibitId,
        commentId,
      ]);
    },
    onError: (error) => {
      console.error('Failed to post reply:', error);
    },
  });
};
