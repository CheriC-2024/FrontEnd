import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addHeart, removeHeart } from '../artworkApi';

// 좋아요 추가 Mutation
export const useAddHeart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artworkId: number) => addHeart(artworkId),
    onSuccess: (newHeartCount, artworkId) => {
      queryClient.setQueryData(['artwork', artworkId], (oldData: any) => ({
        ...oldData,
        heartCount: newHeartCount,
      }));
    },
  });
};

// 좋아요 취소 Mutation
export const useRemoveHeart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artworkId: number) => removeHeart(artworkId),
    onSuccess: (newHeartCount, artworkId) => {
      queryClient.setQueryData(['artwork', artworkId], (oldData: any) => ({
        ...oldData,
        heartCount: newHeartCount,
      }));
    },
  });
};
