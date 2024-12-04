import axiosInstance from './axiosInstance';

// 팔로우 API 호출
export const followUser = async (followedId: number) => {
  const response = await axiosInstance.post(`/follows/${followedId}`);
  return response.data;
};

// 언팔로우 API 호출
export const unfollowUser = async (followedId: number) => {
  const response = await axiosInstance.delete(`/follows/${followedId}`);
  return response.data;
};

// 팔로우 리스트 조회
export const getFollowList = async (
  userId: number,
  sort: 'FOLLOWING' | 'FOLLOWER',
  order: 'LATEST' | 'NAME' | 'FOLLOWER',
  page: number,
  size: number,
) => {
  try {
    const response = await axiosInstance.get(`/follows/${userId}`, {
      params: { sort, order, page, size },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch follow list:', error);
    throw error;
  }
};
