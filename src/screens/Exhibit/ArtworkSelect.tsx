import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CherryIcon from '../../assets/icons/cherry.svg';
import ProgressBarComponent from '../../components/ProgressBar';
import FilterInput from '../../components/SearchBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCollections,
  toggleArtworkSelection,
  toggleCollectionExpansion,
  setFilterText,
  collapseAllCollections,
  expandAllCollections,
} from '../../slices/artworkSlice';
import { fetchArtworksByCollectionIds } from '../../api/collectionApi';
import { RootState } from '../../store';
import { imageAssets } from '../../assets/DB/imageAssets';

interface ArtworkSelectProps {
  onSelectionChange: (
    selectedArtworks: number[],
    totalCherries: number,
  ) => void;
}

const ArtworkSelect: React.FC<ArtworkSelectProps> = ({ onSelectionChange }) => {
  const dispatch = useDispatch();
  const { collections, selectedArtworks, expandedCollections, filterText } =
    useSelector((state: RootState) => state.artwork);
  const { userCherries, selectedCollections } = useSelector(
    (state: RootState) => state.collection,
  );

  const { setStep } = useProgressBar();

  useEffect(() => {
    setStep(1); // Set progress bar to step 2 (index 1)
    // Fetch artworks for selected collections
    const fetchArtworks = async () => {
      try {
        const data = await fetchArtworksByCollectionIds(selectedCollections);
        dispatch(setCollections(data.collections));
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    if (selectedCollections.length > 0) {
      fetchArtworks();
    }
  }, [selectedCollections, dispatch, setStep]);

  useEffect(() => {
    const totalCherries = selectedArtworks.reduce(
      (sum, artwork) => sum + (artwork.cherryNum || 0),
      0,
    );
    onSelectionChange(selectedArtworks, totalCherries); // Notify parent component when selected artworks change
  }, [selectedArtworks, onSelectionChange]);

  const filteredCollections = collections.map((collection) => ({
    ...collection,
    artList: collection.artList.filter((artwork) =>
      artwork.name.includes(filterText),
    ),
  }));

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <TitleContainer>
        <TitleIcon
          source={require('src/assets/images/Character/character_surprised.png')}
        />
        <TitleText>
          <Title>전시할 작품을 선택해주세요!</Title>
          <CherryContainer>
            <CherryCountText>보유 중인 체리{` `}</CherryCountText>
            <CherryIcon fill="#E52C32" />
            <CherryNum>{userCherries}</CherryNum>
          </CherryContainer>
        </TitleText>
      </TitleContainer>
      <FilterInput
        placeholder="작품 검색하기"
        filterText={filterText}
        setFilterText={(text) => dispatch(setFilterText(text))}
      />
      <Row>
        <SelectedCount>
          <BrownBlack>{selectedArtworks.length}</BrownBlack> / 30
        </SelectedCount>
        {Object.values(expandedCollections).every((value) => !value) ? (
          <ExpandButton onPress={() => dispatch(expandAllCollections())}>
            <ExpandButtonText>컬렉션 모두 펼치기</ExpandButtonText>
          </ExpandButton>
        ) : (
          <CollapseButton onPress={() => dispatch(collapseAllCollections())}>
            <CollapseButtonText>컬렉션 모두 접기</CollapseButtonText>
          </CollapseButton>
        )}
      </Row>
      <ArtworkList>
        {filteredCollections.map((collection, collectionIndex) => {
          const isExpanded = expandedCollections[collection.collectionName];
          return (
            <ArtworkCollection key={collectionIndex}>
              <CollectionTitle>
                <CollectionName>{collection.collectionName}</CollectionName>
                <DropDownButton
                  onPress={() =>
                    dispatch(
                      toggleCollectionExpansion(collection.collectionName),
                    )
                  }
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
                  {collection.artList.map((artwork) => {
                    const selected = selectedArtworks.some(
                      (item) => item.artId === artwork.artId,
                    );
                    const selectedIndex = selectedArtworks.findIndex(
                      (item) => item.artId === artwork.artId,
                    );
                    const artworkImage = imageAssets[artwork.fileName];
                    return (
                      <ArtworkItem
                        key={artwork.artId}
                        selected={selected}
                        onPress={() =>
                          dispatch(toggleArtworkSelection(artwork))
                        }
                      >
                        <ArtworkImageWrapper selected={selected}>
                          <ArtworkImage
                            source={artworkImage}
                            selected={selected}
                          />
                          {selected && (
                            <SelectedIndexWrapper>
                              <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
                            </SelectedIndexWrapper>
                          )}
                        </ArtworkImageWrapper>
                        <ArtworkInfo>
                          <ArtworkName>{artwork.name}</ArtworkName>
                          {artwork.register === 'COLLECTOR' &&
                          artwork.cherryNum === null ? (
                            <CollectorOnlyImage
                              source={require('../../assets/images/collectorOnlyText.png')}
                            />
                          ) : (
                            <ArtworkCherry>
                              {artwork.cherryNum === 0 ? (
                                '무료'
                              ) : (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <CherryIcon fill="#B0ABAB" />
                                  <Text style={{ color: '#B0ABAB' }}>
                                    {artwork.cherryNum}
                                  </Text>
                                </View>
                              )}
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
  height: 80px;
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
const CherryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CherryCountText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const CherryNum = styled(CherryCountText)`
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
  width: 33.33%;
  padding: 5px;
`;

interface ArtworkImageWrapperProps {
  selected: boolean;
}

const ArtworkImageWrapper = styled.View<ArtworkImageWrapperProps>`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 0.8)' : 'transparent'};
`;

interface ArtworkImageProps {
  selected: boolean;
}

const ArtworkImage = styled.Image<ArtworkImageProps>`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.selected ? 0.5 : 1)};
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
  color: #b0abab;
`;

export default ArtworkSelect;
