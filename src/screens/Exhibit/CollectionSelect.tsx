import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const CollectionSelect: React.FC = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const handleSelectCollection = (name: string) => {
    setSelectedCollections((prev) => [...prev, name]);
  };

  return (
    <Container>
      <Title>컬렉션 선택 페이지</Title>
      <SubTitle>어떤 컬렉션을 전시로 올릴까요?</SubTitle>
      <SelectedCollectionContainer>
        <SelectedCollectionText>현재 선택한 컬렉션</SelectedCollectionText>
        <CollectionTag>
          {selectedCollections.map((name, index) => (
            <CollectionTagText key={index}>{name}</CollectionTagText>
          ))}
        </CollectionTag>
      </SelectedCollectionContainer>
      <CollectionList>
        {Array.from({ length: 4 }, (_, index) => (
          <CollectionItem
            key={index}
            onPress={() => handleSelectCollection(`컬렉션 이름 ${index + 1}`)}
          >
            <CollectionImage />
            <CollectionInfo>
              <CollectionName>컬렉션 이름 {index + 1}</CollectionName>
              <CollectionDescription>
                컬렉션에 대한 간략한 설명을 여기에 입력합니다.
              </CollectionDescription>
            </CollectionInfo>
          </CollectionItem>
        ))}
      </CollectionList>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
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
  margin-bottom: 8px;
`;

const SelectedCollectionContainer = styled.View`
  margin-bottom: 16px;
`;

const SelectedCollectionText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CollectionTag = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const CollectionTagText = styled.Text`
  font-size: 14px;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 4px;
`;

const CollectionList = styled.ScrollView`
  margin-top: 16px;
`;

const CollectionItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const CollectionImage = styled.View`
  width: 60px;
  height: 60px;
  background-color: #d3d3d3;
  border-radius: 8px;
  margin-right: 16px;
`;

const CollectionInfo = styled.View`
  flex: 1;
`;

const CollectionName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CollectionDescription = styled.Text`
  font-size: 14px;
  color: #777;
`;

export default CollectionSelect;
