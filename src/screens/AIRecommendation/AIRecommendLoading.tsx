import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  CommonActions,
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import styled from 'styled-components/native';

// Navigation 타입 지정
type AIRecommendLoadingNavigationProp = NavigationProp<ParamListBase>;

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation<AIRecommendLoadingNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AIRecommend'); // 타입 명시 필요
    }, 3000);

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
