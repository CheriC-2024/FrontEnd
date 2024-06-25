import axiosInstance from './api';

//GET
export const fetchCollectionsByUser = async (userId: number) => {
  try {
    console.log(`Fetching collections for user ID from api: ${userId}`);
    const response = await axiosInstance.get(`/collection`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching collections!', error);
    console.log('Axios Error:', error);
    throw error;
  }
};

//POST
export const fetchArtworksByCollectionIds = async (collectionIds: number) => {
  try {
    const response = await axiosInstance.post('/collection/all', {
      collectionIds,
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching artworks!', error);
    throw error;
  }
};
