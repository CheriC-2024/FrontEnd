import React, { useEffect, useState } from 'react';
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
import {
  useCloudVision,
  useChatGptAIThemes,
  useChatGptAITitles,
} from '../../api/hooks/useAIQueries';
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

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 선택된 작품의 artId 리스트
  const selectedArtIds = selectedArtworks.map((artwork) => artwork.artId);

  // 아직 데이터가 없는 artId 필터링
  const missingArtIds = selectedArtIds.filter(
    (artId) => !cloudVisionLabels.some((label) => label.artId === artId),
  );

  // 선택된 작품이 변경되었거나 새로운 작품이 추가되었는지 확인
  const hasSelectedArtChanged = !areArraysEqual(
    selectedArtIds,
    prevSelectedArt,
  );

  // 선택된 작품이 변경될 때 Redux로 previousSelectedArtIds 업데이트
  useEffect(() => {
    if (hasSelectedArtChanged) {
      console.log('selectedArtIds 변경 감지:', selectedArtIds);
      dispatch(setPrevSelectedArt(selectedArtIds));
    }
  }, [selectedArtIds, hasSelectedArtChanged, dispatch]);

  // 2초 로딩 유지
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cloud Vision API 호출
  const { data: cloudVisionData } = useCloudVision(
    missingArtIds,
    'LABEL',
    missingArtIds.length > 0,
  );

  // Cloud Vision API 데이터를 Redux 상태에 저장 및 확인
  useEffect(() => {
    if (cloudVisionData && missingArtIds.length > 0) {
      console.log('Cloud Vision API 호출 성공:', cloudVisionData);
      dispatch(
        setCloudVisionLabels([...cloudVisionLabels, ...cloudVisionData]),
      );
    }
  }, [cloudVisionData, cloudVisionLabels, dispatch, missingArtIds]);

  // ChatGPT API 호출 여부 제어 및 상태 확인
  const shouldCallChatGptForThemes =
    cloudVisionLabels.length > 0 &&
    (aiThemes.length === 0 || hasSelectedArtChanged) &&
    source === 'ThemeSetting';

  const shouldCallChatGptForTitles =
    cloudVisionLabels.length > 0 &&
    (aiTitles.length === 0 || hasSelectedArtChanged) &&
    source === 'DescriptionSetting';

  console.log('shouldCallChatGptForThemes:', shouldCallChatGptForThemes);
  console.log('shouldCallChatGptForTitles:', shouldCallChatGptForTitles);

  // ChatGPT API 호출 훅 (THEME)
  const {
    data: aiThemesData,
    isSuccess: isThemeSuccess,
    refetch: refetchThemes,
  } = useChatGptAIThemes(cloudVisionLabels, shouldCallChatGptForThemes);

  // ChatGPT API 호출 훅 (TITLE)
  const {
    data: aiTitlesData,
    isSuccess: isTitleSuccess,
    refetch: refetchTitles,
  } = useChatGptAITitles(cloudVisionLabels, shouldCallChatGptForTitles);

  // 선택된 작품이 변경될 때 ChatGPT API 다시 호출
  useEffect(() => {
    if (hasSelectedArtChanged) {
      if (source === 'ThemeSetting' && shouldCallChatGptForThemes) {
        console.log('ChatGPT API 테마 호출 재시작');
        refetchThemes();
      } else if (
        source === 'DescriptionSetting' &&
        shouldCallChatGptForTitles
      ) {
        console.log('ChatGPT API 제목 호출 재시작');
        refetchTitles();
      }
      dispatch(setPrevSelectedArt(selectedArtIds)); // 상태 업데이트
    }
  }, [
    hasSelectedArtChanged,
    source,
    refetchThemes,
    refetchTitles,
    shouldCallChatGptForThemes,
    shouldCallChatGptForTitles,
    dispatch,
  ]);

  // 테마 상태 업데이트 및 화면 전환
  useEffect(() => {
    if (
      !loading &&
      isThemeSuccess &&
      aiThemesData &&
      source === 'ThemeSetting'
    ) {
      console.log('ChatGPT API Response:', aiThemesData);
      dispatch(setAIThemes(aiThemesData.result));
      dispatch(setAIThemeReason(aiThemesData.reason));
      navigation.navigate('AIRecommendTheme', { source });
    }
  }, [loading, aiThemesData, isThemeSuccess, dispatch, navigation, source]);

  // 제목 상태 업데이트 및 화면 전환
  useEffect(() => {
    if (
      !loading &&
      isTitleSuccess &&
      aiTitlesData &&
      source === 'DescriptionSetting'
    ) {
      console.log('ChatGPT API Response:', aiTitlesData);
      dispatch(setAITitle(aiTitlesData.result));
      dispatch(setAITitleReason(aiTitlesData.reason));
      navigation.navigate('AIRecommendDescription', { source });
    }
  }, [loading, aiTitlesData, isTitleSuccess, dispatch, navigation, source]);

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

// 스타일링 추가
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
