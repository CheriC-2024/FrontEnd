import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import styled from 'styled-components/native';

type RootStackParamList = {
  AIRecommendLoading: { source?: string };
  AIRecommend: { source?: string };
  AIRecommendDescription: { source?: string };
};

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (source === 'ThemeSetting') {
        navigation.navigate('AIRecommend', { source });
      } else if (source === 'DescriptionSetting') {
        navigation.navigate('AIRecommendDescription', { source });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, source]);

  const getLoadingText = () => {
    if (source === 'ThemeSetting') {
      return 'AI가 테마를 만들고 있어요...';
    } else if (source === 'DescriptionSetting') {
      return 'AI가 전시명을 작성하고 있어요...';
    }
    return 'AI가 작업 중이에요...';
  };

  return (
    <Container>
      <ActivityIndicator size="large" color="#E52C32" />
      <LoadingText>{getLoadingText()}</LoadingText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const LoadingText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: #000;
`;

export default AIRecommendLoading;
