import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigations/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { extractProperties } from '../../api/cloudVisionApi';
import { getAIThemesTitle } from '../../api/chatgptApi';
import { useGlobalState } from '../../contexts/GlobalStateContext';

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
  const source = route.params?.source || 'default'; // 기본 값 설정
  const {
    selectedArtworks,
    ailabel,
    setAILabel,
    setAIThemes,
    aiThemeReason,
    setAIThemeReason,
    setAITitle,
    setAITitleReason,
  } = useGlobalState();

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      try {
        // 1단계: Artworks에서 properties 추출
        const artIds = selectedArtworks.map((artwork) => artwork.artId);
        const extractedProperties = await extractProperties(artIds, 'LABEL');
        console.log('로딩 화면 Extracted Properties:', extractedProperties);
        setAILabel(extractedProperties);

        // 2-1단계: 추출된 properties로 테마 추출
        const { result: aiThemes, reason: aiThemeReason } =
          await getAIThemesTitle('THEME', extractedProperties);
        setAIThemes(aiThemes);
        setAIThemeReason(aiThemeReason);

        console.log('로딩 화면 Updated AILabel:', ailabel);
        console.log('로딩 화면 AI Themes:', aiThemes);
        console.log('로딩 화면 AI Reason:', aiThemeReason);

        // 2-2단계: 추출된 properties로 전시명 추출
        const { result: aiTitle, reason: aiTitleReason } =
          await getAIThemesTitle('TITLE', extractedProperties);
        setAITitle(aiTitle);
        setAITitleReason(aiTitleReason);

        console.log('로딩 화면 AI Title:', aiTitle);
        console.log('로딩 화면 AI Title Reason:', aiTitleReason);

        // 페이지 이동
        if (source === 'ThemeSetting') {
          navigation.navigate('AIRecommendTheme', { source });
        } else if (source === 'DescriptionSetting') {
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
      <GradientBackground>
        <LoadingImage source={require('src/assets/loading.png')} />
        <LoadingText>{getLoadingText()}</LoadingText>
      </GradientBackground>
    </Container>
  );
};

interface GradientBackgroundProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientBackground = styled(
  LinearGradient,
).attrs<GradientBackgroundProps>((props) => ({
  colors: props.colors || ['rgb(255, 255, 255)', 'rgba(229, 44, 50, 0.1)'],
  start: props.start || { x: 0.5, y: 0.7 },
  end: props.end || { x: 0.5, y: 1 },
}))<GradientBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

const LoadingImage = styled.Image`
  width: 155px;
  height: 155px;
`;

const LoadingText = styled.View`
  margin-top: 28px;
`;

const MainText = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
  text-align: center;
  color: #120000;
`;

const SubText = styled.Text`
  margin-top: 10px;
  font-family: 'Regular';
  font-size: 14px;
  text-align: center;
  color: #413333;
`;

export default AIRecommendLoading;
