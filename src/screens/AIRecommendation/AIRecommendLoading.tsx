import { useEffect, useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Animated, Dimensions, Easing } from 'react-native';
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
import styled from 'styled-components/native';
import { areArraysEqual } from 'src/utils/arrayUtils';
import { Subtitle2 } from 'src/styles/typography';

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const source = route.params?.source || 'default';
  const dispatch = useDispatch<AppDispatch>();
  useImmersiveMode(true);
  const [loading, setLoading] = useState(true);

  // 로딩 화면 문구
  const [currentText, setCurrentText] = useState(loadingTexts[0]);
  const [fadeAnim] = useState(new Animated.Value(1)); // 페이드 아웃용
  const [translateAnim] = useState(new Animated.Value(0)); // 텍스트 애니메이션용
  const [rotateAnim] = useState(new Animated.Value(0)); // 이미지 회전용
  const screenWidth = Dimensions.get('window').width;

  // 캐릭터의 위치 애니메이션 값
  const [characterAnim] = useState(new Animated.Value(-screenWidth)); // 화면 왼쪽 밖에서 시작

  useEffect(() => {
    // 캐릭터 애니메이션: 좌에서 우로 반복 이동
    Animated.loop(
      Animated.timing(characterAnim, {
        toValue: screenWidth, // 화면 오른쪽 밖으로 이동
        duration: 8000, // 천천히 이동 (8초)
        easing: Easing.linear, // 일정한 속도
        useNativeDriver: true,
      }),
    ).start();
  }, [characterAnim, screenWidth]);

  const { selectedArtworks } = useSelector((state: RootState) => state.artwork);
  const {
    cloudVisionLabels = [],
    aiThemes = [],
    aiTitles = '',
    prevSelectedArt = [],
  } = useSelector((state: RootState) => state.aiRecommend);

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
    source === 'ThemeSetting' ? true : true,
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

  // TODO: 시연용: 5초 후 화면 전환
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (source === 'ThemeSetting') {
  //       navigation.navigate('AIRecommendTheme', { source });
  //     } else if (source === 'DescriptionSetting') {
  //       navigation.navigate('AIRecommendDescription', { source });
  //     } else {
  //       navigation.navigate(source); // 기본 화면으로 이동
  //     }
  //   }, 5000);

  //   // 컴포넌트 언마운트 시 타이머 정리
  //   return () => clearTimeout(timer);
  // }, [source, navigation]);

  useEffect(() => {
    // 문구와 애니메이션을 주기적으로 변경
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0, // 페이드 아웃
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: -30, // 위로 이동
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 문구를 변경한 뒤 초기화
        setCurrentText(
          loadingTexts[Math.floor(Math.random() * loadingTexts.length)],
        );
        translateAnim.setValue(30); // 아래로 설정
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1, // 페이드 인
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnim, {
            toValue: 0, // 제자리로 이동
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim, translateAnim]);

  useEffect(() => {
    // 무한 회전 애니메이션
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  // 회전 애니메이션 값 설정
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });
  return (
    <Container>
      {source === 'ThemeSetting' && (
        <AnimatedCircle
          style={{ transform: [{ rotate }] }}
          source={require('src/assets/loading.png')}
        />
      )}
      {source === 'DescriptionSetting' && (
        <Mask>
          <AnimatedCharacter
            source={require('src/assets/loading_line.png')}
            style={{
              transform: [{ translateX: characterAnim }],
            }}
          />
        </Mask>
      )}
      <TipContainer>
        <LightBulbImage source={require('src/assets/images/lightbulb.png')} />
        <TipContent>
          <TipText>전시 Tip이에요!</TipText>
          <AnimatedText
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            }}
          >
            {currentText}
          </AnimatedText>
        </TipContent>
      </TipContainer>
    </Container>
  );
};

// 로딩 화면 랜덤 문구 10가지
const loadingTexts = [
  '전시 이름을 정하기 어렵다면 언제든 AI 추천을 활용해보세요',
  '전시 테마를 설정하기 어렵다면 언제든 AI 추천을 활용해보세요',
  '컬렉션 전시로 나만의 아트 컬렉션을 보여주세요',
  '내가 모은 작품들로 "나"를 표현할 수 있어요',
  '마음에 든 작품이 있다면, 언제든 컬렉팅하고 전시에도 사용할 수 있어요',
  '체리를 사용하면, 유료 작품도 나의 컬렉션 전시로 게시할 수 있어요',
  '전시 테마로 나의 전시를 더 표현해줄 수 있어요',
  '전시 커버 이미지가 고민된다면, CheriC의 추천 커버를 이용해보세요',
  'CheriC는 전시 작품에 기반해서 색상칩을 추출해 커버를 만들어 드려요',
  '마무리 단계에서 전시 음악도 설정해서 더 다채로운 전시로 만들어 보세요',
];

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const AnimatedCircle = styled(Animated.Image)`
  width: 150px;
  height: 150px;
  margin-bottom: 40px;
`;

const Mask = styled.View`
  width: 88%;
  height: 107px;
  overflow: hidden;
  position: absolute;
  top: 270px;
`;

const AnimatedCharacter = styled(Animated.Image)`
  width: 402px;
  height: 107px;
`;

const LightBulbImage = styled.Image`
  width: 29px;
  height: 37px;
  margin-right: 8px;
`;

const TipContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.cherryRed_10};
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 90%;
  height: 100px;
`;

const TipContent = styled.View`
  flex-direction: column;
  flex: 1;
`;

const TipText = styled(Subtitle2)`
  color: #fff;
  margin-bottom: 4px;
`;

const AnimatedText = styled(Animated.Text)`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #ffffffe2;
  flex-wrap: wrap;
`;

export default AIRecommendLoading;
