import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';

type RootStackParamList = {
  AIRecommendLoading: { source: string };
  AIRecommend: { source: string };
  AIRecommendDescription: { source: string };
  // 다른 스크린들 추가 가능
};

interface AIRecommendBtnProps {
  source: string;
}

const AIRecommendBtn: React.FC<AIRecommendBtnProps> = ({ source }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAIRecommendation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AIRecommendLoading', params: { source } }],
      }),
    );
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
