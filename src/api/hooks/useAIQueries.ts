import { useQuery } from '@tanstack/react-query';
import { extractProperties } from '../cloudVisionApi';
import { getAIThemesTitle } from '../chatgptApi';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

// Cloud Vision API 호출 훅
export const useCloudVision = (
  artIds: number[],
  cloudRequestType: string,
  enabled: boolean, // 직접 enabled를 전달 받음
) => {
  return useQuery({
    queryKey: ['cloudVision', artIds],
    queryFn: () => extractProperties(artIds, cloudRequestType),
    enabled: enabled && artIds.length > 0, // artIds가 있을 때만 호출하고 enabled 조건 추가
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
