import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import {
  setAIThemes,
  setAIThemeReason,
  setAITitle,
  setAITitleReason,
  setCloudVisionLabels,
  setPrevSelectedArt,
} from 'src/slices/aiRecommendSlice';
import { useCloudVision, useChatGpt } from '../../api/hooks/useAIQueries';
import { useImmersiveMode } from 'src/hooks/_index';
import GradientBackground from 'src/styles/GradientBackground';
import styled from 'styled-components/native';
import { areArraysEqual } from 'src/utils/arrayUtils';

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const source = route.params?.source || 'default';
  const dispatch = useDispatch<AppDispatch>();
  useImmersiveMode(true);

  const { selectedArtworks } = useSelector((state: RootState) => state.artwork);
  const {
    cloudVisionLabels = [],
    aiThemes = [],
    aiTitles = '',
    prevSelectedArt = [],
  } = useSelector((state: RootState) => state.aiRecommend);

  const [loading, setLoading] = useState(true);

  // 선택된 작품의 ID 리스트
  const selectedArtIds = useMemo(
    () => selectedArtworks.map((artwork) => artwork.artId),
    [selectedArtworks],
  );

  // Cloud Vision API 호출이 필요한 작품 필터링
  const missingArtIds = useMemo(
    () =>
      selectedArtIds.filter(
        (artId) => !cloudVisionLabels.some((label) => label.artId === artId),
      ),
    [selectedArtIds, cloudVisionLabels],
  );

  // 선택된 작품 변경 확인
  const hasSelectedArtChanged = useMemo(
    () => !areArraysEqual(selectedArtIds, prevSelectedArt),
    [selectedArtIds, prevSelectedArt],
  );

  // Redux 업데이트: 이전 선택된 작품 ID 저장
  useEffect(() => {
    if (hasSelectedArtChanged) {
      dispatch(setPrevSelectedArt(selectedArtIds));
    }
  }, [hasSelectedArtChanged, selectedArtIds, dispatch]);

  // Cloud Vision API 호출
  const { data: cloudVisionData } = useCloudVision(
    missingArtIds,
    'LABEL_DETECTION',
    missingArtIds.length > 0,
  );

  // Cloud Vision API 결과 처리
  useEffect(() => {
    if (cloudVisionData) {
      const newLabels = cloudVisionData.filter(
        (newLabel) =>
          !cloudVisionLabels.some((label) => label.artId === newLabel.artId),
      );
      if (newLabels.length > 0) {
        dispatch(setCloudVisionLabels([...cloudVisionLabels, ...newLabels]));
      }
    }
  }, [cloudVisionData, cloudVisionLabels, dispatch]);

  // ChatGPT API 호출 여부 확인
  const shouldCallChatGptForThemes = useMemo(
    () =>
      cloudVisionLabels.length > 0 &&
      (aiThemes.length === 0 || hasSelectedArtChanged) &&
      source === 'ThemeSetting',
    [cloudVisionLabels, aiThemes.length, hasSelectedArtChanged, source],
  );

  const shouldCallChatGptForTitles = useMemo(
    () =>
      cloudVisionLabels.length > 0 &&
      (aiTitles.length === 0 || hasSelectedArtChanged) &&
      source === 'DescriptionSetting',
    [cloudVisionLabels, aiTitles.length, hasSelectedArtChanged, source],
  );

  // ChatGPT API 호출
  const { data: aiData, isSuccess: isAiSuccess } = useChatGpt(
    source === 'ThemeSetting' ? 'THEME' : 'TITLE',
    cloudVisionLabels,
    source === 'ThemeSetting'
      ? shouldCallChatGptForThemes
      : shouldCallChatGptForTitles,
  );

  // ChatGPT API 결과 처리 및 화면 전환
  useEffect(() => {
    if (!loading && isAiSuccess && aiData) {
      if (source === 'ThemeSetting') {
        dispatch(setAIThemes(aiData.result));
        dispatch(setAIThemeReason(aiData.reason));
        navigation.navigate('AIRecommendTheme', { source });
      } else if (source === 'DescriptionSetting') {
        dispatch(setAITitle(aiData.result));
        dispatch(setAITitleReason(aiData.reason));
        navigation.navigate('AIRecommendDescription', { source });
      }
    }
  }, [loading, isAiSuccess, aiData, source, dispatch, navigation]);

  // 로딩 상태 변경
  useEffect(() => {
    if (isAiSuccess && aiData) {
      setLoading(false);
    }
  }, [isAiSuccess, aiData]);

  const getLoadingText = () => {
    if (source === 'ThemeSetting') {
      return 'AI가 전시 테마를 만들고 있어요...';
    } else if (source === 'DescriptionSetting') {
      return 'AI가 전시 이름을 만들고 있어요...';
    }
    return 'AI가 작업 중이에요...';
  };

  return (
    <Container>
      <GradientBackground />
      <LoadingImage source={require('src/assets/loading.png')} />
      <LoadingText>{getLoadingText()}</LoadingText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingImage = styled.Image`
  width: 190px;
  height: 190px;
`;

const LoadingText = styled.Text`
  margin-top: ${({ theme }) => theme.margin.xl};
`;

export default AIRecommendLoading;
