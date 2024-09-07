import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigation/types';
import { Caption } from 'src/styles/typography';

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
      <AIButtonText>+ AI 추천을 받아보고 싶다면?</AIButtonText>
    </AIButton>
  );
};

const AIButton = styled(TouchableOpacity)``;

const AIButtonText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

export default AIRecommendBtn;
