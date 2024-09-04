import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { extractProperties } from '../../api/cloudVisionApi';
import { getAIThemesTitle } from '../../api/chatgptApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import {
  setAILabel,
  setAIThemes,
  setAIThemeReason,
  setAITitle,
  setAITitleReason,
} from 'src/slices/aiRecommendSlice';
import GradientBackground from 'src/styles/GradientBackground';
import { Caption, H6 } from 'src/styles/typography';

type AIRecommendLoadingRouteProp = RouteProp<
  RootStackParamList,
  'AIRecommendLoading'
>;
type AIRecommendLoadingNavigationProp = NavigationProp<
  RootStackParamList,
  'AIRecommendLoading'
>;

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation<AIRecommendLoadingNavigationProp>();
  const route = useRoute<AIRecommendLoadingRouteProp>();
  const source = route.params?.source || 'default';
  const dispatch = useDispatch<AppDispatch>();

  const { selectedArtworks } = useSelector((state: RootState) => state.artwork);

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      try {
        // 1단계: Artworks에서 properties 추출
        const artIds = selectedArtworks.map((artwork) => artwork.artId);
        const extractedProperties = await extractProperties(artIds, 'LABEL');
        dispatch(setAILabel(extractedProperties));

        // ThemeSetting일 때 THEME API 호출
        if (source === 'ThemeSetting') {
          const { result: aiThemes, reason: aiThemeReason } =
            await getAIThemesTitle('THEME', extractedProperties);
          dispatch(setAIThemes(aiThemes));
          dispatch(setAIThemeReason(aiThemeReason));

          navigation.navigate('AIRecommendTheme', { source });
        }

        // DescriptionSetting일 때 TITLE API 호출
        if (source === 'DescriptionSetting') {
          const { result: aiTitle, reason: aiTitleReason } =
            await getAIThemesTitle('TITLE', extractedProperties);
          dispatch(setAITitle(aiTitle));
          dispatch(setAITitleReason(aiTitleReason));

          navigation.navigate('AIRecommendDescription', { source });
        }
      } catch (error) {
        console.error('Failed to get AI recommendations:', error);
      }
    };

    fetchAIRecommendations();
  }, []);

  const getLoadingText = () => {
    if (source === 'ThemeSetting') {
      return (
        <>
          <MainText>AI가 전시 테마를 만들고 있어요</MainText>
          <SubText>
            컬렉터님이 설정한 작품들로 전시 테마를{`\n`}만들어 올게요!
          </SubText>
        </>
      );
    } else if (source === 'DescriptionSetting') {
      return (
        <>
          <MainText>AI가 전시 이름을 만들고 있어요</MainText>
          <SubText>
            컬렉터님이 설정한 작품들로 전시 이름을{`\n`}만들어 올게요!
          </SubText>
        </>
      );
    }
    return 'AI가 작업 중이에요...';
  };

  const handleBackPress = () => {
    if (source === 'ThemeSetting') {
      navigation.navigate('Exhibit', { step: 2 });
    } else if (source === 'DescriptionSetting') {
      navigation.navigate('Exhibit', { step: 4 });
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="chevron-back" size={24} color="#120000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

const LoadingText = styled.View`
  margin-top: ${({ theme }) => theme.margin.xl};
`;

const MainText = styled(H6)`
  text-align: center;
`;

const SubText = styled(Caption)`
  margin-top: ${({ theme }) => theme.margin.s};
  text-align: center;
  color: ${({ theme }) => theme.colors.grey_8};
`;

export default AIRecommendLoading;
