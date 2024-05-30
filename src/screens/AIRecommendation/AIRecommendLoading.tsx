import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components/native';

type RootStackParamList = {
  AIRecommendLoading: undefined;
  AIRecommend: undefined;
};

type AIRecommendLoadingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AIRecommendLoading'
>;

type AIRecommendLoadingProps = {
  navigation: AIRecommendLoadingNavigationProp;
};

const AIRecommendLoading: React.FC<AIRecommendLoadingProps> = ({
  navigation,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AIRecommend');
    }, 3000);

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <ActivityIndicator size="large" color="#0000ff" />
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
