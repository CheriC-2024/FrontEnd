import axios from 'axios';
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
    if (axios.isAxiosError(error)) {
      // AxiosError 상세 정보 출력
      console.error('Axios Error Message:', error.message); // 에러 메시지
      console.error('Axios Error Code:', error.code); // HTTP 상태 코드
      console.error('Request URL:', error.config?.url); // 요청 URL
      console.error('Request Params:', error.config?.params); // 쿼리 매개변수
      console.error('Request Data:', error.config?.data); // 요청 데이터 (POST/PUT)
      console.error('Response Status:', error.response?.status); // 응답 HTTP 상태 코드
      console.error('Response Data:', error.response?.data); // 서버에서 반환된 데이터
    } else {
      // Axios가 아닌 다른 에러 처리
      console.error('Unexpected Error:', error);
    }
    throw error; // 에러 다시 던지기
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

// GET 소장 작품 설명 조회
export const getOwnArtworkDesc = async (artworkId: number) => {
  const response = await axiosInstance.get(`/arts/${artworkId}`);
  return response.data.data;
};
