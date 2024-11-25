import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../userApi';

export const useArtistData = (id: number) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['user', id], // 캐싱 키로 id를 포함
    queryFn: () => fetchUserById(id), // API 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유효
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐싱
    enabled: !!id, // id가 있을 때만 요청
  });

  return { user: data, isLoading, error, isError };
};
