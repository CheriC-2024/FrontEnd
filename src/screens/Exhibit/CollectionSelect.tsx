import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import FilterInput from '../../components/FilterInput';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { useGlobalState } from '../../contexts/GlobalStateContext';

const CollectionSelect: React.FC<{
  onSelectionChange: (count: number) => void;
}> = ({ onSelectionChange }) => {
  const { collections, selectedCollections, setSelectedCollections } =
    useGlobalState();
  const [filterText, setFilterText] = useState('');
  const { step, setStep } = useProgressBar();

  useEffect(() => {
    setStep(0); // Set progress bar to step 1 (index 0)
  }, [setStep]);

  useEffect(() => {
    onSelectionChange(selectedCollections.length);
  }, [selectedCollections]);

  const handleSelectCollection = (id: number) => {
    setSelectedCollections((prev: number[]) => {
      const newSelections = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      console.log('Selected Collections:', newSelections);
      return newSelections;
    });
  };

  const handleRemoveCollection = (id: number) => {
    setSelectedCollections((prev: number[]) => {
      const newSelections = prev.filter((item) => item !== id);
      console.log('Selected Collections:', newSelections);
      return newSelections;
    });
  };

  const filteredCollections = collections.filter(
    (collection) => collection.name.includes(filterText), // filterText is a string
  );

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />

      {collections.length === 0 ? ( //컬렉션이 아예 없는 경우
        <EmptyStateContainer>
          <EmptyStateImage
            source={require('../../assets/images/empty_collection.png')}
          />
          <EmptyStateText>컬렉션이 텅 비어 있어요!</EmptyStateText>
          <EmptyStateSubText>
            전시를 만들기 위해서는 컬렉터님의{`\n`}컬렉션이 필요해요!
          </EmptyStateSubText>
          <AddCollectionButton>
            <AddCollectionButtonText>
              + 컬렉션 추가하러 가기
            </AddCollectionButtonText>
          </AddCollectionButton>
        </EmptyStateContainer>
      ) : (
        // 컬렉션이 있는 경우
        <>
          <TitleContainer>
            <TitleIcon source={require('../../assets/images/character.png')} />
            <TitleText>
              <Title>어떤 컬렉션을 전시로 올릴까요?</Title>
              <Subtitle>전시로 만들고 싶은 컬렉션을 선택해보세요</Subtitle>
            </TitleText>
          </TitleContainer>
          <FilterInput
            placeholder="컬렉션 검색하기"
            filterText={filterText}
            setFilterText={setFilterText}
          />
          <SelectedCollectionContainer>
            <SelectedCollectionText>선택한 컬렉션</SelectedCollectionText>
            <CollectionTag>
              {selectedCollections.map((id) => {
                const collection = collections.find((c) => c.id === id);
                if (collection) {
                  return (
                    <CollectionTagWrapper key={id}>
                      <CollectionTagText>{collection.name}</CollectionTagText>
                      <RemoveButton onPress={() => handleRemoveCollection(id)}>
                        <CollectionTagText> ✕</CollectionTagText>
                      </RemoveButton>
                    </CollectionTagWrapper>
                  );
                }
                return null;
              })}
            </CollectionTag>
          </SelectedCollectionContainer>
          <CollectionList>
            {filteredCollections.map((collection) => {
              const selected = selectedCollections.includes(collection.id);
              const firstArtworkImage =
                collection.artworks.length > 0
                  ? collection.artworks[0].imageUrl
                  : null;
              return (
                <CollectionItem
                  key={collection.id}
                  selected={selected}
                  onPress={() => handleSelectCollection(collection.id)}
                >
                  <CollectionImage>
                    {firstArtworkImage && (
                      <Image
                        source={firstArtworkImage} // For local require
                        // source={{ uri: firstArtworkImage }} // For URI
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                      />
                    )}
                  </CollectionImage>
                  <CollectionInfo>
                    <CollectionName>{collection.name}</CollectionName>
                    <CollectionDescription numberOfLines={2}>
                      {collection.description}
                    </CollectionDescription>
                  </CollectionInfo>
                </CollectionItem>
              );
            })}
          </CollectionList>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const TitleIcon = styled.Image`
  width: 45px;
  height: 75px;
  margin-right: 10px;
`;

const TitleText = styled.View`
  flex-direction: column;
`;

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 18px;
  color: #120000;
`;

const Subtitle = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const SelectedCollectionContainer = styled.View`
  margin: 18px 0 20px 0;
`;

const SelectedCollectionText = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  margin-bottom: 6px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CollectionTag = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const CollectionTagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #413333;
  padding: 0px 10px;
  border-radius: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const CollectionTagText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.5px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

const CollectionList = styled.ScrollView`
  scroll-padding-bottom: 16px;
`;

interface CollectionItemProps {
  selected: boolean;
}

const CollectionItem = styled(TouchableOpacity)<CollectionItemProps>`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: white;
  border: 1.7px dashed
    ${(props: { selected: boolean }) =>
      props.selected ? '#E52C32' : 'transparent'};
  border-radius: 60px;
  margin-bottom: 16px;
  margin-horizontal: 3px;
  elevation: 5;
  overflow: visible;
`;

const CollectionImage = styled.View`
  width: 100px;
  height: 100px;
  background-color: #d3d3d3;
  border-radius: 50px;
  margin-right: 15px;
  overflow: hidden;
`;

const CollectionInfo = styled.View`
  flex: 1;
  padding-right: 15px;
`;

const CollectionName = styled.Text`
  margin-bottom: 4px;
  font-family: 'Bold';
  font-size: 16px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CollectionDescription = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyStateImage = styled.Image`
  width: 128px;
  height: 178px;
  margin-bottom: 30px;
`;

const EmptyStateText = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
  color: #120000;
  margin-bottom: 4px;
`;

const EmptyStateSubText = styled.Text`
  text-align: center;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  margin-bottom: 20px;
`;

const AddCollectionButton = styled.TouchableOpacity`
  background-color: #120000;
  padding: 10px 20px;
  border-radius: 20px;
`;

const AddCollectionButtonText = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #fff;
  letter-spacing: 0.5px;
`;

export default CollectionSelect;
