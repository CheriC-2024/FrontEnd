import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  ArtCollectingSheet,
  ArtistImage,
} from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption, Subtitle1 } from 'src/styles/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingIcon } from 'src/assets/icons/_index';
import { Container } from 'src/styles/layout';
import { useFetchArtTypesFilter } from 'src/api/hooks/useArtworkQueries';
import { mapArtTypesReverse } from 'src/utils/artTypeMapper';
import StaggeredList from '@mindinventory/react-native-stagger-view';

const ArtCollecting: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;

  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    'image' | 'artist' | 'both'
  >('image');

  const artTypesString = mapArtTypesReverse([categoryTitle]).join(', ');
  const {
    data: artworks,
    isLoading,
    isError,
  } = useFetchArtTypesFilter({ artType: artTypesString });

  // Update navigation options
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: '아트 컬렉팅',
      }),
    );
  }, [navigation]);

  const openBottomSheet = () => setIsSheetVisible(true);

  const handleSelect = (mode: 'image' | 'artist' | 'both') =>
    setSelectedOption(mode);

  const handleNavigation = (destination: string, params?: object) => {
    navigation.navigate(destination, params);
  };

  if (isLoading) return <Caption></Caption>;
  if (isError || !artworks) return <Caption></Caption>;

  return (
    <Container>
      {/* Sticky Header */}
      <ArtCategoryHeader
        categoryTitle={categoryTitle}
        categoryType='artwork'
        style={{ paddingHorizontal: 6, marginTop: 8, marginBottom: 12 }}
      />
      <StickyHeader>
        <TouchableOpacity onPress={openBottomSheet}>
          <ToggleText>
            <SettingIcon />
            {selectedOption === 'image'
              ? ' 이미지'
              : selectedOption === 'artist'
                ? ' 작가'
                : ' 작가+작품'}
          </ToggleText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Caption>최신순</Caption>
          <Icon name='chevron-down' color='#120000' size={14} />
        </TouchableOpacity>
      </StickyHeader>

      {/* StaggeredList for Masonry Layout */}
      <StaggeredList
        data={artworks}
        renderItem={({ item, index }) => (
          <ImageWrapper
            isFirstColumn={index % 2 === 0} // Determine if the item is in the first column
          >
            <TouchableOpacity
              onPress={() =>
                handleNavigation('CollectingStack', {
                  screen: 'ArtworkInfo',
                  params: { artworkId: item.artId },
                })
              }
            >
              <StyledImage
                source={{ uri: item.imgUrl }}
                style={{ aspectRatio: 1 / 1 }}
              />
            </TouchableOpacity>
            {selectedOption !== 'image' && (
              <ImageInfoWrapper selectedOption={selectedOption}>
                {selectedOption === 'both' && (
                  <>
                    <ArtworkText>{item.name}</ArtworkText>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <ArtistImage
                        image={
                          item.userRes?.profileImgUrl ||
                          'https://via.placeholder.com/150'
                        }
                        size={18}
                        style={{ elevation: 0 }}
                      />
                      <ArtistText selectedOption={selectedOption}>
                        {item.userRes?.name || 'Unknown Artist'}
                      </ArtistText>
                    </View>
                  </>
                )}
              </ImageInfoWrapper>
            )}
          </ImageWrapper>
        )}
        numColumns={2} // Two columns for the staggered grid
        contentContainerStyle={{}} // Overall padding for the grid
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Sheet */}
      {isSheetVisible && (
        <ArtCollectingSheet
          onSelect={handleSelect}
          onClose={() => setIsSheetVisible(false)}
          selectedOption={selectedOption}
        />
      )}
    </Container>
  );
};

const StickyHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fcfcfc;
  padding: 8px 0;
  width: 100%;
  z-index: 10;
`;

const StyledImage = styled.Image`
  width: 100%;
  border-radius: 16px;
`;

const ImageWrapper = styled.View<{ isFirstColumn: boolean }>`
  flex: 1;
  margin-bottom: 16px; /* Space between rows */
  padding-right: ${({ isFirstColumn }) => (isFirstColumn ? '0px' : '4px')};
  padding-left: ${({ isFirstColumn }) => (!isFirstColumn ? '4px' : '0px')};
`;

const ImageInfoWrapper = styled.View<{
  selectedOption: 'both' | 'artist' | 'image';
}>`
  flex-direction: column;
  margin-top: ${({ selectedOption }) =>
    selectedOption === 'both'
      ? '8px'
      : selectedOption === 'artist'
        ? '4px'
        : '0px'};
`;

const ArtworkText = styled(Subtitle1)`
  margin-top: -${({ theme }) => theme.margin.s};
`;

const ArtistText = styled(Caption)<{
  selectedOption: 'both' | 'artist' | 'image';
}>`
  margin-left: ${({ theme }) => theme.margin.xs};
  font-family: ${({ theme, selectedOption }) =>
    selectedOption === 'both' ? theme.fonts.regular : theme.fonts.bold};
`;

const ToggleText = styled(Caption)`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ theme }) => theme.colors.redBlack};
  color: #fff;
`;

export default ArtCollecting;
