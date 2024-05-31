import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const AIRecommendLoading: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'AIRecommend' }],
        }),
      );
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
