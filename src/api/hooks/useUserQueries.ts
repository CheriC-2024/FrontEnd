import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchUserInfo, fetchUsersBriefList } from '../userApi';
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
