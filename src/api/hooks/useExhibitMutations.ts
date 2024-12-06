import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExhibitHeart, removeExhibitHeart } from '../exhibitApi';

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
