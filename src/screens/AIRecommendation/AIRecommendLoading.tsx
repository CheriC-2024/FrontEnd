import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

const AIRecommendLoading: React.FC = () => {
  return (
    <Container>
      <LoadingImage />
      <Title>AI가 테마를 만들고 있어요</Title>
      <SubTitle>
        컬렉터님이 선정한 작품들로 전시 테마를 만들어 올게요!{`\n`}잠시만
        기다려주세요!
      </SubTitle>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

const LoadingImage = styled.View`
  width: 200px;
  height: 200px;
  background-color: #ccc;
  margin-bottom: 16px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #777;
`;

export default AIRecommendLoading;
