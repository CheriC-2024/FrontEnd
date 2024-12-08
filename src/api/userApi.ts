import { setUserData } from 'src/slices/getUserSlice';
import axiosInstance from './axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

// 사용자 정보 가져오기
export const fetchUserInfo = async () => {
  const response = await axiosInstance.get('/users');
  console.log('유저정보 조회', response.data.data);
  return response.data.data;
};

// 사용자 id별로 정보 가져오기
export const fetchUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get('/users', {
      params: { id },
    });

    const userData = response.data.data;

    // artTypes 매핑 처리
    const mappedArtTypes = userData.artTypes.map(
      (type: string) => artTypeMapping[type] || type, // 매핑되지 않은 경우 원래 값 유지
    );

    return { ...userData, artTypes: mappedArtTypes }; // 변환된 데이터 반환
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Redux Thunk로 데이터 가져오기
export const fetchAndSetUserData = createAsyncThunk(
  'getUser/fetchAndSetUserData',
  async (_, { dispatch }) => {
    const userData = await fetchUserInfo(); // API 호출
    dispatch(setUserData(userData)); // Redux 상태 업데이트
    return userData;
  },
);

type FetchUsersParams = {
  isFollowing: boolean;
  artTypes: string; // "PAINTING", "DIGITAL_ART" 등
  order: 'FOLLOWER' | 'NAME' | 'LATEST';
  page: number;
  size: number;
};

export const fetchUsersBriefList = async ({
  isFollowing,
  artTypes,
  order,
  page,
  size,
}: FetchUsersParams) => {
  const response = await axiosInstance.get('/users/all-brief', {
    params: { isFollowing, artTypes, order, page, size },
  });
  return response.data.data; // API 응답 데이터 반환
};

const artTypeMapping: { [key: string]: string } = {
  NEW_MEDIA_ART: '뉴미디어',
  ORIENTAL_PAINTING: '동양화',
  PAINTING: '회화',
  OIL_PAINTING: '유화',
  WATER_PAINTING: '수채화',
  DRAWING_ART: '드로잉',
  DESIGN_ART: '디자인',
  PRINTMAKING_PAINTING: '판화',
};
