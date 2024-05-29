import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FilterInput from '../../components/FilterInput';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';

const CollectionSelect: React.FC = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');
  const { step, setStep } = useProgressBar();

  useEffect(() => {
    setStep(0); // Set progress bar to step 1 (index 0)
  }, [setStep]);

  const handleSelectCollection = (name: string) => {
    setSelectedCollections((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const handleRemoveCollection = (name: string) => {
    setSelectedCollections((prev) => prev.filter((item) => item !== name));
  };

  const collections = Array.from({ length: 10 }, (_, index) => ({
    name: `컬렉션 이름 ${index + 1}`,
    description: '컬렉션에 대한 간략한 설명을 여기에 입력합니다.',
  }));

  const filteredCollections = collections.filter((collection) =>
    collection.name.includes(filterText),
  );

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <Title>컬렉션 선택 페이지</Title>
      <SubTitle>어떤 컬렉션을 전시로 올릴까요?</SubTitle>
      <FilterInput filterText={filterText} setFilterText={setFilterText} />
      <SelectedCollectionContainer>
        <SelectedCollectionText>현재 선택한 컬렉션</SelectedCollectionText>
        <CollectionTag>
          {selectedCollections.map((name, index) => (
            <CollectionTagWrapper key={index}>
              <CollectionTagText>{name}</CollectionTagText>
              <RemoveButton onPress={() => handleRemoveCollection(name)}>
                <Text>✕</Text>
              </RemoveButton>
            </CollectionTagWrapper>
          ))}
        </CollectionTag>
      </SelectedCollectionContainer>
      <CollectionList>
        {filteredCollections.map((collection, index) => {
          const selected = selectedCollections.includes(collection.name);
          return (
            <CollectionItem
              key={index}
              selected={selected}
              onPress={() => handleSelectCollection(collection.name)}
            >
              <CollectionImage />
              <CollectionInfo>
                <CollectionName>{collection.name}</CollectionName>
                <CollectionDescription>
                  {collection.description}
                </CollectionDescription>
              </CollectionInfo>
            </CollectionItem>
          );
        })}
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

const CollectionTagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 4px;
`;

const CollectionTagText = styled.Text`
  font-size: 14px;
  margin-right: 8px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

const FilterInputContainer = styled.View`
  margin-bottom: 16px;
`;

const FilterTextInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
`;

const CollectionList = styled.ScrollView`
  margin-top: 16px;
`;

interface CollectionItemProps {
  selected: boolean;
}

const CollectionItem = styled(TouchableOpacity)<CollectionItemProps>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => (props.selected ? '#d3d3d3' : '#f8f8f8')};
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
