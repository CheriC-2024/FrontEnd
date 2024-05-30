import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import FilterInput from '../../components/FilterInput';
import { useProgressBar } from '../../components/ProgressBarContext';

const ArtworkSelect: React.FC = () => {
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [expandedCollections, setExpandedCollections] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');
  const { step, setStep } = useProgressBar();

  useEffect(() => {
    setStep(1); // Set progress bar to step 2 (index 1)
  }, [setStep]);

  const handleSelectArtwork = (name: string) => {
    setSelectedArtworks((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const toggleCollection = (collectionName: string) => {
    setExpandedCollections((prev) =>
      prev.includes(collectionName)
        ? prev.filter((item) => item !== collectionName)
        : [...prev, collectionName],
    );
  };

  const collapseAllCollections = () => {
    setExpandedCollections([]);
  };

  const expandAllCollections = () => {
    setExpandedCollections(
      artworks.map((collection) => collection.collectionName),
    );
  };

  const artworks = [
    {
      collectionName: '컬렉션 이름 1',
      items: Array.from({ length: 5 }, (_, index) => ({
        name: `작품 ${index + 1}`,
        price: index % 2 === 0 ? '무료' : `${index * 3}체리`,
      })),
    },
    {
      collectionName: '컬렉션 이름 3',
      items: Array.from({ length: 5 }, (_, index) => ({
        name: `작품 ${index + 6}`,
        price: `${(index + 1) * 1}체리`,
      })),
    },
  ];

  const allCollapsed = expandedCollections.length === 0;
  const allExpanded = expandedCollections.length === artworks.length;

  const filteredArtworks = artworks.map((collection) => ({
    ...collection,
    items: collection.items.filter((artwork) =>
      artwork.name.includes(filterText),
    ),
  }));

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <Title>전시할 작품을 선택해주세요!</Title>
      <SubTitle>클릭하신 작품이 전시에 올라갑니다</SubTitle>
      <FilterInput filterText={filterText} setFilterText={setFilterText} />
      <Header>
        <SelectedCount>
          <SelectedCountText>{selectedArtworks.length} / 30</SelectedCountText>
        </SelectedCount>
        <ButtonGroup>
          {allCollapsed ? (
            <ExpandButton onPress={expandAllCollections}>
              <ExpandButtonText>모두 펴기</ExpandButtonText>
            </ExpandButton>
          ) : (
            <CollapseButton onPress={collapseAllCollections}>
              <CollapseButtonText>모두 접기</CollapseButtonText>
            </CollapseButton>
          )}
        </ButtonGroup>
      </Header>
      <ArtworkList>
        {filteredArtworks.map((collection, collectionIndex) => {
          const isExpanded = expandedCollections.includes(
            collection.collectionName,
          );
          return (
            <ArtworkCollection key={collectionIndex}>
              <CollectionTitle>
                <CollectionName>{collection.collectionName}</CollectionName>
                <DropDownButton
                  onPress={() => toggleCollection(collection.collectionName)}
                >
                  <DropDownButtonText>
                    {isExpanded ? '숨기기' : '보이기'}
                  </DropDownButtonText>
                </DropDownButton>
              </CollectionTitle>
              {isExpanded && (
                <ArtworkGrid>
                  {collection.items.map((artwork, index) => {
                    const selected = selectedArtworks.includes(artwork.name);
                    const selectedIndex = selectedArtworks.indexOf(
                      artwork.name,
                    );
                    return (
                      <ArtworkItem
                        key={index}
                        selected={selected}
                        onPress={() => handleSelectArtwork(artwork.name)}
                      >
                        <ArtworkImage />
                        <ArtworkInfo>
                          <ArtworkName>
                            <Name>{artwork.name}</Name>
                            {selected && ` (${selectedIndex + 1})`}
                          </ArtworkName>
                          <ArtworkPrice>{artwork.price}</ArtworkPrice>
                        </ArtworkInfo>
                      </ArtworkItem>
                    );
                  })}
                </ArtworkGrid>
              )}
            </ArtworkCollection>
          );
        })}
      </ArtworkList>
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

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SelectedCount = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SelectedCountText = styled.Text`
  font-size: 16px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
`;

const CollapseButton = styled(TouchableOpacity)`
  padding: 8px;
  margin-right: 8px;
`;

const CollapseButtonText = styled.Text`
  font-size: 14px;
  color: #007aff;
`;

const ExpandButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const ExpandButtonText = styled.Text`
  font-size: 14px;
  color: #007aff;
`;

const ArtworkList = styled.ScrollView`
  margin-top: 16px;
`;

const ArtworkCollection = styled.View`
  margin-bottom: 16px;
`;

const CollectionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const CollectionName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const DropDownButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const DropDownButtonText = styled.Text`
  font-size: 14px;
  color: #007aff;
`;

const ArtworkGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface ArtworkItemProps {
  selected: boolean;
}

const ArtworkItem = styled(TouchableOpacity)<ArtworkItemProps>`
  width: 48%;
  margin-bottom: 8px;
  padding: 16px;
  background-color: ${(props) => (props.selected ? '#d3d3d3' : '#f8f8f8')};
  border-radius: 8px;
`;

const ArtworkImage = styled.View`
  width: 100%;
  height: 100px;
  background-color: #ccc;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const ArtworkInfo = styled.View`
  flex: 1;
`;

const ArtworkName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #e52c32;
`;

const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

const ArtworkPrice = styled.Text`
  font-size: 12px;
  color: #777;
`;

export default ArtworkSelect;
