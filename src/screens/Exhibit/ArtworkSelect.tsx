import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CherryIcon from '../../assets/icons/cherry';
import ProgressBarComponent from '../../components/ProgressBar';
import SearchBar from '../../components/SearchBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCollections,
  toggleArtworkSelection,
  toggleCollectionExpansion,
  setFilterText,
  collapseAllCollections,
  expandAllCollections,
  Artwork,
} from '../../slices/artworkSlice';
import { fetchArtworksByCollectionIds } from '../../api/collectionApi';
import { RootState, AppDispatch } from '../../store';
import { imageAssets } from '../../assets/DB/imageAssets';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Caption, Subtitle2 } from 'src/styles/typography';
import { theme } from 'src/styles/theme';

interface ArtworkSelectProps {
  onSelectionChange: (
    selectedArtworks: Artwork[],
    totalCherries: number,
  ) => void;
}

const ArtworkSelect: React.FC<ArtworkSelectProps> = ({ onSelectionChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { collections, selectedArtworks, expandedCollections, filterText } =
    useSelector((state: RootState) => state.artwork);
  const { userCherries, selectedCollections } = useSelector(
    (state: RootState) => state.collection,
  );

  const { setStep } = useProgressBar();

  useEffect(() => {
    setStep(1);
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
  }, [selectedCollections, dispatch]);

  useEffect(() => {
    const totalCherries = selectedArtworks.reduce(
      (sum, artwork) => sum + (artwork.cherryNum || 0),
      0,
    );
    onSelectionChange(selectedArtworks, totalCherries);
  }, [selectedArtworks, onSelectionChange]);

  const handleToggleAllCollections = useCallback(() => {
    const allCollapsed = Object.values(expandedCollections).every(
      (value) => !value,
    );
    dispatch(allCollapsed ? expandAllCollections() : collapseAllCollections());
  }, [dispatch, expandedCollections]);

  const filteredCollections = collections.map((collection) => ({
    ...collection,
    artList: collection.artList.filter((artwork) =>
      artwork.name.toLowerCase().includes(filterText.toLowerCase()),
    ),
  }));

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <TitleSubtitle
        title="전시할 작품을 선택해주세요!"
        subtitle={
          <>
            보유 중인 체리 {` `}
            <CherryIcon fill="#E52C32" />
            <CherryNum>{userCherries}</CherryNum>
          </>
        }
        imageSource={require('src/assets/images/Character/character_surprised.png')}
      />
      <SearchBar
        placeholder="작품 검색하기"
        filterText={filterText}
        setFilterText={(text) => dispatch(setFilterText(text))}
      />
      <ControlBar>
        <SelectedCount
          selectedCount={selectedArtworks.length}
          totalCount={30}
        />
        <ToggleButton onPress={handleToggleAllCollections} />
      </ControlBar>
      <ArtworkList>
        {filteredCollections.map((collection, index) => (
          <ArtworkCollection key={index}>
            <CollectionTitle
              collectionName={collection.collectionName}
              isExpanded={expandedCollections[collection.collectionName]}
              onToggle={() =>
                dispatch(toggleCollectionExpansion(collection.collectionName))
              }
            />
            {expandedCollections[collection.collectionName] && (
              <ArtworkGrid>
                {collection.artList.map((artwork) => {
                  const selected = selectedArtworks.some(
                    (item) => item.artId === artwork.artId,
                  );
                  const selectedIndex = selectedArtworks.findIndex(
                    (item) => item.artId === artwork.artId,
                  );
                  return (
                    <ArtworkItem
                      key={artwork.artId}
                      artwork={artwork}
                      selected={selected}
                      selectedIndex={selectedIndex}
                      onSelect={() => dispatch(toggleArtworkSelection(artwork))}
                    />
                  );
                })}
              </ArtworkGrid>
            )}
          </ArtworkCollection>
        ))}
      </ArtworkList>
    </Container>
  );
};

interface CollectionTitleProps {
  collectionName: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const CollectionTitle: React.FC<CollectionTitleProps> = ({
  collectionName,
  isExpanded,
  onToggle,
}) => (
  <CollectionTitleWrapper>
    <Subtitle2>{collectionName}</Subtitle2>
    <DropDownButton onPress={onToggle}>
      <Icon
        name={isExpanded ? 'chevron-down-outline' : 'chevron-up-outline'}
        size={20}
        color="#120000"
      />
    </DropDownButton>
  </CollectionTitleWrapper>
);

interface ArtworkItemProps {
  artwork: Artwork;
  selected: boolean;
  selectedIndex: number;
  onSelect: () => void;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({
  artwork,
  selected,
  selectedIndex,
  onSelect,
}) => {
  const artworkImage = imageAssets[artwork.fileName];
  return (
    <ArtworkItemWrapper selected={selected} onPress={onSelect}>
      <ArtworkImageWrapper selected={selected}>
        <ArtworkImage source={artworkImage} selected={selected} />
        {selected && (
          <SelectedIndexWrapper>
            <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
          </SelectedIndexWrapper>
        )}
      </ArtworkImageWrapper>
      <ArtworkInfo>
        <Subtitle2>{artwork.name}</Subtitle2>
        {artwork.register === 'COLLECTOR' && artwork.cherryNum === null ? (
          <CollectorOnlyImage
            source={require('../../assets/images/collectorOnlyText.png')}
          />
        ) : (
          <ArtworkCherry>
            {artwork.cherryNum === 0 ? (
              '무료'
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CherryIcon fill="#B0ABAB" />
                <Text style={{ color: '#B0ABAB' }}>
                  {` `}
                  {artwork.cherryNum}
                </Text>
              </View>
            )}
          </ArtworkCherry>
        )}
      </ArtworkInfo>
    </ArtworkItemWrapper>
  );
};

interface SelectedCountProps {
  selectedCount: number;
  totalCount: number;
}

const SelectedCount: React.FC<SelectedCountProps> = ({
  selectedCount,
  totalCount,
}) => (
  <Caption style={{ color: theme.colors.grey_6 }}>
    <Caption style={{ color: theme.colors.grey_8 }}>{selectedCount}</Caption> /{' '}
    {totalCount}
  </Caption>
);

interface ToggleButtonProps {
  onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={{ paddingLeft: 8 }} onPress={onPress}>
    <Caption style={{ color: theme.colors.grey_6 }}>
      {Object.values(expandAllCollections).every((value) => !value)
        ? '컬렉션 모두 펼치기'
        : '컬렉션 모두 접기'}
    </Caption>
  </TouchableOpacity>
);

const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: #fff;
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

const ControlBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

const ArtworkList = styled.ScrollView`
  margin-top: 10px;
`;

const ArtworkCollection = styled.View`
  margin-bottom: 16px;
`;

const CollectionTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
  margin-bottom: ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.s};
  border: 1.5px solid #f8f8f8;
`;

const DropDownButton = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.padding.xs};
`;

const ArtworkGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ArtworkItemWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  width: 33.33%;
  padding: 4px;
`;

interface ArtworkImageWrapperProps {
  selected: boolean;
}

const ArtworkImageWrapper = styled.View<ArtworkImageWrapperProps>`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.xs};
  overflow: hidden;
  background-color: ${({ selected }) =>
    selected ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};
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
  border-radius: 30px;
  padding: 3px 9px;
`;

const SelectedIndex = styled(Caption)`
  color: #fff;
`;

const ArtworkInfo = styled.View`
  padding: 7px 0 0 4px;
`;

const CollectorOnlyImage = styled.Image`
  width: 80px;
  height: 15px;
`;

const ArtworkCherry = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6};
`;

export default ArtworkSelect;
