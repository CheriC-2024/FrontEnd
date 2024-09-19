import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MasonryList from 'react-native-masonry-list';
import { Container } from 'src/styles/layout';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  ArtCollectingSheet,
  ArtistImage,
} from 'src/components/_index';
import { images } from './data';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption, Subtitle1 } from 'src/styles/typography';

const ArtCollecting: React.FC = () => {
  const navigation = useNavigation();
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    'image' | 'artist' | 'both'
  >('image'); // 선택된 상태를 부모에서 관리

  const handleSelect = (mode: 'image' | 'artist' | 'both') => {
    setSelectedOption(mode); // 선택된 값을 업데이트
    setIsSheetVisible(false); // 바텀시트 닫기
  };

  // useRoute로 categoryTitle과 categoryType 받아오기
  const route = useRoute();
  const { categoryTitle } = route.params;

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: '아트 컬렉팅',
      }),
    );
  }, [navigation]);

  const openBottomSheet = () => {
    setIsSheetVisible(true);
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

  return (
    <Container>
      <ArtCategoryHeader categoryTitle={categoryTitle} categoryType='artwork' />
      <View style={{ flexDirection: 'row', marginTop: 32 }}>
        <TouchableOpacity onPress={openBottomSheet}>
          <ToggleText>
            {selectedOption === 'image'
              ? '이미지'
              : selectedOption === 'artist'
                ? '작가'
                : '작가 + 작품'}
          </ToggleText>
        </TouchableOpacity>
      </View>

      <MasonryListWrapper>
        <MasonryList
          images={images.map((item) => {
            const adjusted = getAdjustedDimensions(item.width, item.height);
            return {
              id: item.id.toString(),
              uri: item.uri,
              dimensions: {
                width: adjusted.width,
                height: adjusted.height,
              },
              customData: { name: item.name, artist: item.artist }, // customData에 name, artist 추가
            };
          })}
          spacing={4}
          columns={2}
          imageContainerStyle={{
            marginTop: 12,
            borderRadius: 16,
          }}
          showsVerticalScrollIndicator={false}
          renderIndividualFooter={({ customData }) => {
            if (selectedOption === 'image') {
              return null;
            }

            return (
              <ImageInfoWrapper>
                {selectedOption === 'both' && (
                  <>
                    <ArtworkText>{customData.name}</ArtworkText>
                    <View style={{ flexDirection: 'row' }}>
                      <ArtistImage
                        image={'https://via.placeholder.com/150x150'}
                        size={18}
                      />
                      <ArtistText>{customData.artist}</ArtistText>
                    </View>
                  </>
                )}
                {selectedOption === 'artist' && (
                  <View style={{ flexDirection: 'row' }}>
                    <ArtistImage
                      image={'https://via.placeholder.com/150x150'}
                      size={18}
                    />
                    <ArtistText>{customData.artist}</ArtistText>
                  </View>
                )}
              </ImageInfoWrapper>
            );
          }}
        />
      </MasonryListWrapper>

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

// Styled components
const MasonryListWrapper = styled.View`
  flex: 1;
  margin-horizontal: -16px;
`;

const ImageInfoWrapper = styled.View`
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.s3};
`;

const ArtworkText = styled(Subtitle1)`
  margin-top: -${({ theme }) => theme.margin.s};
`;

const ArtistText = styled(Caption)`
  margin-left: ${({ theme }) => theme.margin.xs};
`;

const ToggleText = styled(Caption)`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.l};
  font-family: ${({ theme }) => theme.fonts.bold};
  background-color: ${({ theme }) => theme.colors.redBlack};
  color: #fff;
`;

export default ArtCollecting;
