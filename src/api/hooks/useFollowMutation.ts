import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '../followApi';

// 팔로우 Mutation
export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
    mutationFn: (followedId: number) => followUser(followedId),
    onSuccess: (_, followedId) => {
      // 특정 유저 데이터만 리패칭
      queryClient.invalidateQueries(['user', followedId]);
    },
  });
};

// 언팔로우 Mutation
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
    mutationFn: (followedId: number) => unfollowUser(followedId),
    onSuccess: (_, followedId) => {
      queryClient.invalidateQueries(['user', followedId]);
    },
  });
};
