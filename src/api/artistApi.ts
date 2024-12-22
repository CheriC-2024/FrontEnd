import axiosInstance from './axiosInstance';

export const fetchArtistResume = async (artistUserId: number) => {
  try {
    const response = await axiosInstance.get('/artists', {
      params: { artistUserId },
    });
    console.log('Fetched Artist Resume:', response.data.data);
    return response.data.data; // 서버에서 반환된 데이터 구조에 맞게 반환
  } catch (error) {
    console.error('Error fetching artist resume:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
