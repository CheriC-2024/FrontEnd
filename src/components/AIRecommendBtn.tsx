import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AIRecommendBtn: React.FC = () => {
  const navigation = useNavigation();

  const handleAIRecommendation = () => {
    //navigation.navigate('AIRecommendation'); // AI 추천 페이지로 이동
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
