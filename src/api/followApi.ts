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
