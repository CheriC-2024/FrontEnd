import axiosInstance from './api';

export const extractProperties = async (
  artIds: number[],
  cloudRequestType: string,
) => {
  try {
    const response = await axiosInstance.post('/cloud', {
      cloudRequestType,
      artIds,
    });
    console.log('Cloud Vision API Response:', response.data.value);
    return response.data.value;
  } catch (error) {
    console.error('Error extracting properties:', error);
    throw error;
  }
};
