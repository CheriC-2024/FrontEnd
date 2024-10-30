import { useQuery } from '@tanstack/react-query';
import { extractProperties } from '../cloudVisionApi';
import { getAIThemesTitle } from '../chatgptApi';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

// Cloud Vision API 호출 훅
export const useCloudVision = (
  artIds: number[],
  cloudRequestType: string,
  enabled: boolean,
) => {
  // ID 소팅 => 순서 바뀌어도 쿼리가 호출되지 않도록 방지
  const sortedArtIds = [...artIds].sort((a, b) => a - b);

  return useQuery({
    queryKey: ['cloudVision', sortedArtIds],
    queryFn: () => extractProperties(sortedArtIds, cloudRequestType),
    enabled: enabled && sortedArtIds.length > 0,
  });
};

// ChatGPT API 호출 훅 (THEME)
export const useChatGptAIThemes = (
  cloudVisionLabels: CloudVisionLabel[],
  enabled: boolean, // 직접 enabled를 전달 받음
) => {
  console.log('useChatGptAIThemes enabled:', enabled); // enabled 상태 확인
  return useQuery({
    queryKey: ['aiThemes', cloudVisionLabels],
    queryFn: () => getAIThemesTitle('THEME', cloudVisionLabels),
    enabled: enabled && cloudVisionLabels.length > 0, // 데이터가 있을 때만 호출
  });
};

// ChatGPT API 호출 훅 (TITLE)
export const useChatGptAITitles = (
  cloudVisionLabels: CloudVisionLabel[],
  enabled: boolean, // 직접 enabled를 전달 받음
) => {
  console.log('useChatGptAITitles enabled:', enabled); // enabled 상태 확인
  return useQuery({
    queryKey: ['aiTitles', cloudVisionLabels],
    queryFn: () => getAIThemesTitle('TITLE', cloudVisionLabels),
    enabled: enabled && cloudVisionLabels.length > 0, // 데이터가 있을 때만 호출
  });
};
