import { setUserData } from 'src/slices/getUserSlice';
import axiosInstance from './axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

// 사용자 정보 가져오기
const fetchUserInfo = async () => {
  const response = await axiosInstance.get('/users');
  console.log('유저정보 조회', response.data.data);
  return response.data.data;
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
