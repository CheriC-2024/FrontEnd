import { useQuery } from '@tanstack/react-query';
import { extractProperties } from '../cloudVisionApi';
import { getAIThemesTitle } from '../chatgptApi';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

// Cloud Vision API 호출 훅
export const useCloudVision = (
  artIds: number[],
  cloudVisionType: 'LABEL_DETECTION' | 'IMAGE_PROPERTIES',
  enabled: boolean,
) => {
  // ID 소팅 => 순서 바뀌어도 쿼리가 호출되지 않도록 방지
  const sortedArtIds = [...artIds].sort((a, b) => a - b);

  return useQuery({
    queryKey: ['cloudVision', cloudVisionType, sortedArtIds],
    queryFn: () => extractProperties(sortedArtIds, cloudVisionType),
    enabled: enabled && sortedArtIds.length > 0,
  });
};

// ChatGPT API 호출 훅
export const useChatGpt = (
  chatGptType: 'THEME' | 'TITLE',
  artProperties: any[],
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['chatGptAI', chatGptType, artProperties],
    queryFn: () => getAIThemesTitle(chatGptType, artProperties),
    enabled: enabled && artProperties.length > 0,
  });
};
