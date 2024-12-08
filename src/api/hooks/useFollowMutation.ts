import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { followUser, getFollowList, unfollowUser } from '../followApi';

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

type UseFollowListParams = {
  userId: number;
  sort: 'FOLLOWING' | 'FOLLOWER';
  order: 'LATEST' | 'NAME' | 'FOLLOWER';
  page: number;
  size: number;
};

export const useFollowList = ({
  userId,
  sort,
  order,
  page,
  size,
}: UseFollowListParams) => {
  return useQuery({
    queryKey: ['followList', userId, sort, order, page, size],
    queryFn: () => getFollowList(userId, sort, order, page, size),
    staleTime: 1000 * 60 * 5,
  });
};
