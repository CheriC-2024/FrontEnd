import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AIRecommendLoading: undefined;
  AIRecommend: undefined;
  // 다른 스크린들 추가 가능
};

const AIRecommendBtn: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAIRecommendation = () => {
    navigation.navigate('AIRecommendLoading'); // AI 추천 페이지로 이동
  };

  return (
    <AIButton onPress={handleAIRecommendation}>
      <AIButtonText>AI 추천</AIButtonText>
    </AIButton>
  );
};

const AIButton = styled(TouchableOpacity)`
  padding: 4px 8px;
  background-color: #007aff;
  border-radius: 4px;
`;

const AIButtonText = styled(Text)`
  color: #fff;
  font-size: 14px;
`;

export default AIRecommendBtn;
