import axiosInstance from './axiosInstance';

// POST 소장 작품 등록
export const postPrivateArtwork = async (data: any) => {
  try {
    const response = await axiosInstance.post('/arts/own', data);
    return response.data;
  } catch (error) {
    console.error('Private Artwork registration failed:', error);
    throw error;
  }
};
