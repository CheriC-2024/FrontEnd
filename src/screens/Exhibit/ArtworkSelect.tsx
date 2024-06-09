import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBarComponent from '../../components/ProgressBar';
import FilterInput from '../../components/FilterInput';
import { useProgressBar } from '../../components/ProgressBarContext';
import { useGlobalState } from '../../contexts/GlobalStateContext';

interface ExpandedCollections {
  [key: string]: boolean;
}

interface ArtworkSelectProps {
  onSelectionChange: (selectedArtworks: number[]) => void;
}

const ArtworkSelect: React.FC<ArtworkSelectProps> = ({ onSelectionChange }) => {
  const [expandedCollections, setExpandedCollections] =
    useState<ExpandedCollections>({});
  const [filterText, setFilterText] = useState('');
  const { step, setStep } = useProgressBar();
  const {
    collections,
    selectedCollections,
    userCherries,
    selectedArtworks,
    setSelectedArtworks,
  } = useGlobalState();

  useEffect(() => {
    setStep(1); // Set progress bar to step 2 (index 1)

    // Initialize expandedCollections state with selected collections set to true
    const initialExpandedState: ExpandedCollections = {};
    collections
      .filter((collection) => selectedCollections.includes(collection.id))
      .forEach((collection) => {
        initialExpandedState[collection.name] = true;
      });
    setExpandedCollections(initialExpandedState);
  }, [setStep, collections, selectedCollections]);

  useEffect(() => {
    onSelectionChange(selectedArtworks); // 선택된 작품이 변경될 때마다 상위 컴포넌트에 전달
  }, [selectedArtworks, onSelectionChange]);

  const handleSelectArtwork = (id: number) => {
    setSelectedArtworks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleCollection = (collectionName: string) => {
    setExpandedCollections((prev) => ({
      ...prev,
      [collectionName]: !prev[collectionName],
    }));
  };

  const collapseAllCollections = () => {
    const collapsed: ExpandedCollections = {};
    collections
      .filter((collection) => selectedCollections.includes(collection.id))
      .forEach((collection) => {
        collapsed[collection.name] = false;
      });
    setExpandedCollections(collapsed);
  };

  const expandAllCollections = () => {
    const expanded: ExpandedCollections = {};
    collections
      .filter((collection) => selectedCollections.includes(collection.id))
      .forEach((collection) => {
        expanded[collection.name] = true;
      });
    setExpandedCollections(expanded);
  };

  const allCollapsed = Object.values(expandedCollections).every(
    (value) => !value,
  );
  const allExpanded = Object.values(expandedCollections).every(
    (value) => value,
  );

  const filteredCollections = collections
    .filter((collection) => selectedCollections.includes(collection.id))
    .map((collection) => ({
      ...collection,
      artworks: collection.artworks.filter((artwork) =>
        artwork.title.includes(filterText),
      ),
    }));

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <TitleContainer>
        <TitleIcon source={require('../../assets/images/character.png')} />
        <TitleText>
          <Title>어떤 컬렉션을 전시로 올릴까요?</Title>
          <CherryCount>
            보유 중인 체리: <CherryNum>{userCherries}</CherryNum>
          </CherryCount>
        </TitleText>
      </TitleContainer>
      <FilterInput
        placeholder="작품 검색하기"
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <Row>
        <SelectedCount>
          <BrownBlack>{selectedArtworks.length}</BrownBlack> / 30
        </SelectedCount>
        {allCollapsed ? (
          <ExpandButton onPress={expandAllCollections}>
            <ExpandButtonText>컬렉션 모두 펼치기</ExpandButtonText>
          </ExpandButton>
        ) : (
          <CollapseButton onPress={collapseAllCollections}>
            <CollapseButtonText>컬렉션 모두 접기</CollapseButtonText>
          </CollapseButton>
        )}
      </Row>
      <ArtworkList>
        {filteredCollections.map((collection, collectionIndex) => {
          const isExpanded = expandedCollections[collection.name];
          return (
            <ArtworkCollection key={collectionIndex}>
              <CollectionTitle>
                <CollectionName>{collection.name}</CollectionName>
                <DropDownButton
                  onPress={() => toggleCollection(collection.name)}
                >
                  <DropDownButtonText>
                    {isExpanded ? (
                      <Icon
                        name="chevron-down-outline"
                        size={20}
                        color="#120000"
                      />
                    ) : (
                      <Icon
                        name="chevron-up-outline"
                        size={20}
                        color="#120000"
                      />
                    )}
                  </DropDownButtonText>
                </DropDownButton>
              </CollectionTitle>
              {isExpanded && (
                <ArtworkGrid>
                  {collection.artworks.map((artwork, index) => {
                    const selected = selectedArtworks.includes(artwork.id);
                    const selectedIndex = selectedArtworks.indexOf(artwork.id);
                    return (
                      <ArtworkItem
                        key={index}
                        selected={selected}
                        onPress={() => handleSelectArtwork(artwork.id)}
                      >
                        <ArtworkImageWrapper selected={selected}>
                          <ArtworkImage
                            source={artwork.imageUrl}
                            selected={selected}
                          />
                          {selected && (
                            <SelectedIndexWrapper>
                              <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
                            </SelectedIndexWrapper>
                          )}
                        </ArtworkImageWrapper>
                        <ArtworkInfo>
                          <ArtworkName>{artwork.title}</ArtworkName>
                          {artwork.isCollectorOnly ? (
                            <CollectorOnlyImage
                              source={require('../../assets/images/collectorOnlyText.png')}
                            />
                          ) : (
                            <ArtworkCherry>
                              {artwork.cherry === 0
                                ? '무료'
                                : `${artwork.cherry} 체리`}
                            </ArtworkCherry>
                          )}
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

const CherryCount = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const CherryNum = styled(CherryCount)`
  font-family: 'Bold';
  color: #e52c32;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

const SelectedCount = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
`;

const BrownBlack = styled.Text`
  color: #413333;
`;

const CollapseButton = styled(TouchableOpacity)`
  padding-left: 8px;
`;

const CollapseButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
`;

const ExpandButton = styled(TouchableOpacity)`
  padding-left: 8px;
`;

const ExpandButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
`;

const ArtworkList = styled.ScrollView`
  margin-top: 10px;
`;

const ArtworkCollection = styled.View`
  margin-bottom: 16px;
`;

const CollectionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
  margin-bottom: 15px;
  border-radius: 15px;
  border: 1.5px solid #f8f8f8;
`;

const CollectionName = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  letter-spacing: 0.5px;
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
`;

interface ArtworkItemProps {
  selected: boolean;
}

const ArtworkItem = styled(TouchableOpacity)<ArtworkItemProps>`
  flex: 1;
  margin: 0 5px 15px 5px;
  max-width: 32%;
`;

interface ArtworkImageWrapperProps {
  selected: boolean;
}

const ArtworkImageWrapper = styled.View<ArtworkImageWrapperProps>`
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? 'rgba(0, 0, 0, 0.8)' : 'transparent'};
`;

interface ArtworkImageProps {
  selected: boolean;
}

const ArtworkImage = styled.Image<ArtworkImageProps>`
  width: 100%;
  height: 100%;
  opacity: ${(props: { selected: boolean }) => (props.selected ? 0.5 : 1)};
`;

const SelectedIndexWrapper = styled.View`
  position: absolute;
  top: 4px;
  right: 5px;
  background-color: #100012;
  border-radius: 20px;
  padding: 3px 9px;
`;

const SelectedIndex = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.5px;
`;

const ArtworkInfo = styled.View`
  padding: 7px 0 0 4px;
`;

const ArtworkName = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
`;

const CollectorOnlyImage = styled.Image`
  width: 80px;
  height: 15px;
`;

const ArtworkCherry = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

export default ArtworkSelect;
