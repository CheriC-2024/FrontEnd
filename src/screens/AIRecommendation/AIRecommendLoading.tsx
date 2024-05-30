import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

type RootStackParamList = {
  AIRecommendLoading: undefined;
  AIRecommend: undefined;
  ThemeSetting: { selectedThemes: string[] };
};

type AIRecommendLoadingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AIRecommendLoading'
>;

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation<AIRecommendLoadingNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AIRecommend'); // 일정 시간 후 AIRecommend 페이지로 이동합니다.
    }, 3000);

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <ActivityIndicator size="large" color="#E52C32" />
      <LoadingText>AI가 테마를 만들고 있어요...</LoadingText>
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
