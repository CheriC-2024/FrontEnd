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

// GET Artwork 정보 ID별 조회
export const fetchArtworkById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/arts/${id}`);
    const data = response.data.data;

    // artTypes 매핑
    data.artTypes = data.artTypes.map(
      (type: string) => artTypeMapping[type] || type,
    );
    // userRes의 artTypes 매핑
    if (data.userRes?.artTypes) {
      data.userRes.artTypes = data.userRes.artTypes.map(
        (type: string) => artTypeMapping[type] || type,
      );
    }

    console.log('Fetched Artwork with Mapped Art Types:', data);
    return data;
  } catch (error) {
    console.error('Error fetching artwork by ID:', error);
    throw error;
  }
};

// POST 작품 좋아요
export const addHeart = async (artworkId: number) => {
  const response = await axiosInstance.post(`/arts/${artworkId}/heart`);
  return response.data.data;
};

// DELETE 작품 좋아요
export const removeHeart = async (artworkId: number) => {
  const response = await axiosInstance.delete(`/arts/${artworkId}/heart`);
  return response.data.data;
};

const artTypeMapping: Record<string, string> = {
  WATER_PAINTING: '수채화',
  OIL_PAINTING: '유화',
  NEW_MEDIA_ART: '뉴미디어',
  ORIENTAL_PAINTING: '동양화',
  DRAWING_ART: '드로잉',
  DESIGN_ART: '디자인',
  PRINTMAKING_PAINTING: '판화',
  PAINTING: '회화',
};
