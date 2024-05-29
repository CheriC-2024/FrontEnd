import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';

const ArtworkSelect: React.FC = () => {
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
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

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <Title>전시할 작품을 선택해주세요!</Title>
      <SubTitle>클릭하신 작품이 전시에 올라갑니다</SubTitle>
      <SelectedCount>
        <SelectedCountText>{selectedArtworks.length} / 30</SelectedCountText>
      </SelectedCount>
      <ArtworkList>
        {artworks.map((collection, collectionIndex) => (
          <ArtworkCollection key={collectionIndex}>
            <CollectionTitle>
              <CollectionName>{collection.collectionName}</CollectionName>
              {/* 여기에 필터링이나 정렬 기능을 추가할 수 있습니다. */}
            </CollectionTitle>
            <ArtworkGrid>
              {collection.items.map((artwork, index) => {
                const selected = selectedArtworks.includes(artwork.name);
                const selectedIndex = selectedArtworks.indexOf(artwork.name);
                return (
                  <ArtworkItem
                    key={index}
                    selected={selected}
                    onPress={() => handleSelectArtwork(artwork.name)}
                  >
                    <ArtworkImage />
                    <ArtworkInfo>
                      <ArtworkName>
                        {artwork.name}
                        {selected && ` (${selectedIndex + 1})`}
                      </ArtworkName>
                      <ArtworkPrice>{artwork.price}</ArtworkPrice>
                    </ArtworkInfo>
                  </ArtworkItem>
                );
              })}
            </ArtworkGrid>
          </ArtworkCollection>
        ))}
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
`;

const ArtworkPrice = styled.Text`
  font-size: 12px;
  color: #777;
`;

const SelectedCount = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const SelectedCountText = styled.Text`
  font-size: 16px;
`;

export default ArtworkSelect;
