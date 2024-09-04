import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

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
      <AIButtonText>+ AI 추천을 받아보고 싶다면?</AIButtonText>
    </AIButton>
  );
};

const AIButton = styled(TouchableOpacity)``;

const AIButtonText = styled(Text)`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

export default AIRecommendBtn;
