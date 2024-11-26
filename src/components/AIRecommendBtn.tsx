import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigation/types';
import { Body2, Caption } from 'src/styles/typography';
import { SparkleIcon } from 'src/assets/icons/_index';

interface AIRecommendBtnProps {
  source: string;
}

const AIRecommendBtn: React.FC<AIRecommendBtnProps> = ({ source }) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const handleAIRecommendation = () => {
    navigation.navigate('Stack', {
      screen: 'AIRecommendLoading',
      params: { source },
    });
  };

  return (
    <AIButton onPress={handleAIRecommendation}>
      <SparkleIcon />
      <AIButtonText>AI 추천 받아보기</AIButtonText>
    </AIButton>
  );
};

const AIButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.cherryRed_10};
  gap: 4px;
`;

const AIButtonText = styled(Body2)`
  color: #fff;
`;

export default AIRecommendBtn;
