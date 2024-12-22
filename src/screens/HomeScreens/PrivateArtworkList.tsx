import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import StaggeredList from '@mindinventory/react-native-stagger-view';
import {
  ArtCategoryHeader,
  ArtCollectingSheet,
  ArtistImage,
  PrivateArtworkListSheet,
} from 'src/components/_index';
import { images } from '../CollectingScreens/data';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption, Subtitle1 } from 'src/styles/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingIcon } from 'src/assets/icons/_index';
import { Container } from 'src/styles/layout';
import { useFetchArtTypesFilter } from 'src/api/hooks/useArtworkQueries';

const PrivateArtworkList: React.FC = () => {
  const navigation = useNavigation();
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    'image' | 'collector' | 'both'
  >('image');

  const handleSelect = (mode: 'image' | 'collector' | 'both') => {
    setSelectedOption(mode);
  };

  const {
    data: ownArtData = [],
    isLoading: ownArtLoading,
    error: ownArtError,
  } = useFetchArtTypesFilter({ userId: undefined, isCollectorsArt: 'true' });

  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
      }),
    );
  }, [navigation]);

  const openBottomSheet = () => {
    setIsSheetVisible(true);
  };

  const handleNavigation = (destination: string, params?: object) => {
    navigation.navigate(destination, params);
  };

  const getAdjustedDimensions = (width: number, height: number) => {
    if (width > height) {
      return { width: width, height: height + 100 };
    } else if (Math.abs(width - height) < 150) {
      return { width: 300, height: 300 };
    } else {
      return { width, height };
    }
  };

  const adjustedImages = images.map((item) => {
    return {
      id: item.id.toString(),
      uri: item.uri,
      width: 150,
      height: 150,
      customData: { name: item.name, artist: item.artist },
    };
  });

  const flatListData = [
    { key: 'stickyView' },
    { key: 'staggeredList', data: ownArtData },
  ];

  return (
    <Container>
      <ListWrapper>
        <FlatList
          data={flatListData}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            if (item.key === 'stickyView') {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FCFCFC',
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                  }}
                >
                  <TouchableOpacity onPress={openBottomSheet}>
                    <ToggleText>
                      <SettingIcon />
                      {selectedOption === 'image'
                        ? ' 이미지'
                        : selectedOption === 'collector'
                          ? ' 컬렉터'
                          : ' 컬렉터+작품'}
                    </ToggleText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Caption>최신순</Caption>
                    <Icon name='chevron-down' color='#120000' size={14} />
                  </TouchableOpacity>
                </View>
              );
            } else if (item.key === 'staggeredList') {
              return (
                <StaggeredList
                  data={ownArtData}
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
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <ArtistImage
                                  image={item.userRes.profileImgUrl}
                                  size={18}
                                  style={{ elevation: 0 }}
                                />
                                <ArtistText selectedOption={selectedOption}>
                                  {item.createdAt}
                                </ArtistText>
                              </View>
                            </>
                          )}
                          {selectedOption === 'collector' && (
                            <>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <ArtistImage
                                  image={item.userRes.profileImgUrl}
                                  size={18}
                                  style={{ elevation: 0 }}
                                />
                                <ArtistText selectedOption={selectedOption}>
                                  {item.createdAt}
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
              );
            } else {
              return null;
            }
          }}
          ListHeaderComponent={
            <ArtCategoryHeader
              categoryType='privateArtwork'
              style={{ paddingHorizontal: 6, marginTop: 8, marginBottom: 12 }}
            />
          }
          stickyHeaderIndices={[1]} // 두 번째 아이템인 스티키 헤더를 고정
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />

        {isSheetVisible && (
          <PrivateArtworkListSheet
            onSelect={handleSelect}
            onClose={() => setIsSheetVisible(false)}
            selectedOption={selectedOption}
          />
        )}
      </ListWrapper>
    </Container>
  );
};

const ListWrapper = styled.View`
  flex: 1;
  margin-horizontal: -6px;
`;

const ImageInfoWrapper = styled.View<{
  selectedOption: 'both' | 'collector' | 'image';
}>`
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.s2};
  margin-top: ${({ selectedOption }) =>
    selectedOption === 'both'
      ? '8px'
      : selectedOption === 'collector'
        ? '4px'
        : '0px'};
`;

const ArtworkText = styled(Subtitle1)`
  margin-top: -${({ theme }) => theme.margin.s};
`;

const ArtistText = styled(Caption)<{
  selectedOption: 'both' | 'collector' | 'image';
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

export default PrivateArtworkList;
