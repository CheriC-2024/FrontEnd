import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchUserById, fetchUserInfo, fetchUsersBriefList } from '../userApi';
import { setUserData } from 'src/slices/getUserSlice';
import store, { AppDispatch } from 'src/store';

export const useFetchUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(),
    onSuccess: (data) => {
      // 성공적으로 데이터를 가져오면 Redux에 저장
      dispatch(setUserData(data));
      console.log('Redux State after setUserData:', store.getState());
    },
    staleTime: 1000 * 60 * 5, // 데이터 5분간 유효
  });
};

type UseUsersBriefParams = {
  isFollowing: boolean;
  artTypes: string;
  order: 'FOLLOWER' | 'NAME' | 'LATEST';
  page: number;
  size: number;
};

export const useUsersBriefList = (params: UseUsersBriefParams) => {
  return useQuery({
    queryKey: ['usersBrief', params], // 쿼리 키
    queryFn: () => fetchUsersBriefList(params), // fetch 함수
    staleTime: 1000 * 60 * 5, // 5분 동안 신선함 유지
  });
};

export const useUserInfoById = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 데이터 캐싱
    refetchOnWindowFocus: false, // 화면에 다시 포커스될 때 재요청 비활성화
  });
};
