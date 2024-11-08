import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { TitleSubtitle, ProgressBar } from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { Body2, Caption, Subtitle2 } from 'src/styles/typography';
import GradientBackground from 'src/styles/GradientBackground';
import {
  setCoverColors,
  setSelectedPalette,
  setColorPalettes,
  setRandomPalettes,
  setCoverType,
  setSelectedCoverImage,
  setSelectedCover,
} from 'src/slices/coverSlice';
import { useCloudVision } from 'src/api/hooks/useAIQueries';
import { Artwork } from 'src/interfaces/collection';

const CoverSetting: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Redux 상태를 가져옴
  const selectedArtworks = useSelector(
    (state: RootState) => state.artwork.selectedArtworks,
  );
  const {
    coverType,
    colorPalettes,
    randomPalettes,
    selectedPalette,
    selectedCoverImage,
    selectedCover,
  } = useSelector((state: RootState) => state.cover);

  const [selectedGradient, setSelectedGradient] = useState<number | null>(null);
  const [prevSelectedArtworks, setPrevSelectedArtworks] = useState<Artwork[]>(
    [],
  );

  const selectedArtworksChanged = () => {
    const isChanged =
      selectedArtworks.length !== prevSelectedArtworks.length ||
      selectedArtworks.some(
        (artwork, index) =>
          artwork.artId !== prevSelectedArtworks[index]?.artId,
      );

    if (isChanged) {
      setPrevSelectedArtworks(selectedArtworks);
    }

    return isChanged;
  };

  // Cloud Vision API 호출
  const artIds = selectedArtworks.map((artwork) => artwork.artId);
  const {
    data: extractedProperties,
    isLoading: isCloudVisionLoading,
    isError,
  } = useCloudVision(artIds, 'COLOR', true);

  useEffect(() => {
    if (selectedArtworks.length > 0 && selectedArtworksChanged()) {
      if (extractedProperties) {
        const newPalettes = extractedProperties.map(
          (item: any) => item.properties,
        );

        // Redux에 저장
        dispatch(setColorPalettes(newPalettes));
        const randomPalettes = newPalettes.map((palette, index) => ({
          palette,
          index,
        }));
        dispatch(setRandomPalettes(randomPalettes));

        if (newPalettes.length > 0) {
          const initialCover = newPalettes[0];
          dispatch(setSelectedPalette(initialCover));
          dispatch(setCoverColors(initialCover));
          dispatch(setSelectedCover(initialCover));
        }
      } else if (isError) {
        console.error('데이터를 불러오는 데 실패했습니다.', isError);
      }
    }
  }, [extractedProperties, isError, dispatch]);

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled = selectedCover.length > 0 || selectedCoverImage;
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        nextScreenName: 'FinishSetting',
        headerRightDisabled: !isNextEnabled,
      }),
    );
  }, [navigation, selectedCover, selectedCoverImage]);

  // 팔레트가 3개 이하일 경우 placeholder로 빈 자리를 채우는 함수
  const fillWithPlaceholders = (
    palettes: { palette: string[]; index: number }[],
  ) => {
    const placeholdersNeeded = 4 - palettes.length;
    const placeholders = Array(placeholdersNeeded).fill({
      palette: ['#ffffff'],
      index: -1,
    });
    return [...palettes, ...placeholders];
  };

  // extractedProperties가 존재할 때 색상 팔레트를 설정하는 로직
  useEffect(() => {
    if (extractedProperties) {
      const newPalettes = extractedProperties.map(
        (item: any) => item.properties,
      );

      // Redux에 저장
      dispatch(setColorPalettes(newPalettes));
      const randomPalettes = newPalettes.map((palette, index) => ({
        palette,
        index,
      }));
      dispatch(setRandomPalettes(randomPalettes));

      if (newPalettes.length > 0) {
        const initialCover = newPalettes[0];
        dispatch(setSelectedPalette(initialCover));
        dispatch(setCoverColors(initialCover));
        dispatch(setSelectedCover(initialCover));
      }
    } else if (isError) {
      console.error('데이터를 불러오는 데 실패했습니다.', isError);
    }
  }, [extractedProperties, isError, dispatch]);

  // colorPalettes와 selectedCover 관련 상태 관리
  useEffect(() => {
    if (colorPalettes?.length > 0) {
      if (randomPalettes?.length === 0) {
        const palettes = getRandomPalettes(colorPalettes);
        dispatch(setRandomPalettes(palettes));
      }

      if (!selectedCover?.length) {
        dispatch(setSelectedCover(colorPalettes[0]));
        dispatch(setSelectedPalette(colorPalettes[0]));
        dispatch(setCoverColors(colorPalettes[0]));
      }
    }
  }, [colorPalettes, randomPalettes, selectedCover, dispatch]);

  // 팔레트 랜덤 추출 함수
  const getRandomPalettes = (palettes: string[][]) => {
    const palettesWithIndexes = palettes.map((palette, index) => ({
      palette,
      index,
    }));
    const shuffled = palettesWithIndexes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(shuffled.length, 4));
  };

  const handleCoverSelect = (randomIndex: number) => {
    const originalIndex = randomPalettes[randomIndex].index;
    const selectedPalette = colorPalettes[originalIndex];

    dispatch(setSelectedPalette(selectedPalette));
    dispatch(setCoverColors(selectedPalette));
    dispatch(setSelectedCover(selectedPalette));
  };

  const handleGradientSelect = (index: number) => {
    setSelectedGradient(selectedGradient === index ? null : index);
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      dispatch(setSelectedCoverImage(imageUri));
      dispatch(setCoverType('image'));
    }
  };

  const handleImageRemove = () => {
    dispatch(setSelectedCoverImage(null));
    dispatch(setCoverType('gradient'));
  };

  const handleCoverTypeChange = (type: 'gradient' | 'solid' | 'image') => {
    dispatch(setCoverType(type));
    if (type === 'solid') {
      dispatch(setCoverColors([selectedCover[0]]));
      setSelectedGradient(null);
    } else if (type === 'gradient') {
      dispatch(setCoverColors(selectedCover));
      setSelectedGradient(null);
    } else if (type === 'image') {
      //handleImageUpload();
    }
  };

  const handleShufflePalettes = () => {
    const shuffledPalettes = getRandomPalettes(colorPalettes);
    dispatch(setRandomPalettes(shuffledPalettes));
  };

  const arePalettesEqual = (palette1: string[], palette2: string[]) => {
    if (palette1.length !== palette2.length) return false;
    return palette1.every((color, index) => color === palette2[index]);
  };

  return (
    <Container>
      <GradientBackground />
      <ProgressBar totalSteps={7} currentStep={6} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TitleSubtitle
          titleLarge='전시 커버 설정하기'
          subtitle='전시와 어울리는 커버를 선택해주세요!'
          imageSource={require('src/assets/images/Character/character_happy.png')}
        />
        <View style={{ marginBottom: 24 }} />
        <CoverTitle>체리시가 제안하는 커버</CoverTitle>
        <CoverTextContainer>
          <CoverSubtitle>
            컬렉터님의 전시 작품 컬러를 바탕으로 만들었어요 :)
          </CoverSubtitle>
          <TouchableOpacity onPress={handleShufflePalettes}>
            <Icon name='sync-outline' size={22} color='#120000' />
          </TouchableOpacity>
        </CoverTextContainer>
        <PaletteContainer>
          {isCloudVisionLoading ? (
            <LoadingText>추출 중...</LoadingText>
          ) : randomPalettes?.length > 0 ? (
            fillWithPlaceholders(randomPalettes.slice(0, 4)).map(
              ({ palette, index }, idx) => (
                <PaletteButton
                  key={idx}
                  onPress={() => index !== -1 && handleCoverSelect(idx)}
                  selected={
                    index !== -1 && arePalettesEqual(selectedPalette, palette)
                  }
                >
                  {palette.map((color, colorIndex) => (
                    <PaletteColor
                      key={colorIndex}
                      color={color}
                      index={colorIndex}
                      total={palette.length}
                    />
                  ))}
                </PaletteButton>
              ),
            )
          ) : (
            <LoadingText>팔레트를 불러올 수 없습니다.</LoadingText>
          )}
        </PaletteContainer>
        <CoverTypeButtonContainer>
          <CoverTypeToggle
            coverType={coverType}
            onCoverTypeChange={handleCoverTypeChange}
            isImageUploaded={!!selectedCoverImage}
          />
        </CoverTypeButtonContainer>
        {coverType === 'gradient' &&
          (isCloudVisionLoading ? (
            <LoadingText>추출 중 ...</LoadingText>
          ) : (
            <CoverGrid>
              {[
                // Vertical Gradient (Normal)
                {
                  colors: selectedCover,
                  start: { x: 0, y: 0 },
                  end: { x: 0, y: 1 },
                },
                // Vertical Gradient (Reversed)
                {
                  colors: [...selectedCover].reverse(),
                  start: { x: 0, y: 0 },
                  end: { x: 0, y: 1 },
                },
                // Diagonal Gradient (Normal)
                {
                  colors: selectedCover,
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                },
                // Diagonal Gradient (Reversed)
                {
                  colors: [...selectedCover].reverse(),
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                },
              ].map((gradientProps, index) => (
                <CoverOption
                  key={index}
                  onPress={() => handleGradientSelect(index)}
                >
                  <LinearGradient
                    {...gradientProps}
                    style={{ width: 180, height: 180, borderRadius: 16 }}
                  />
                  {selectedGradient === index && (
                    <SelectedOverlay>
                      <Icon name='checkmark' size={32} color='#fff' />
                    </SelectedOverlay>
                  )}
                </CoverOption>
              ))}
            </CoverGrid>
          ))}
        {coverType === 'solid' &&
          (isCloudVisionLoading ? (
            <LoadingContainer>
              <LoadingText>추출 중 ...</LoadingText>
            </LoadingContainer>
          ) : (
            <CoverGrid>
              {selectedPalette.map((color, index) => (
                <CoverOption
                  key={index}
                  onPress={() => {
                    setSelectedGradient(index);
                    dispatch(setCoverColors([color]));
                  }}
                >
                  <View
                    style={[
                      styles.gradient,
                      { backgroundColor: color, width: 180, height: 180 },
                    ]}
                  >
                    {selectedGradient === index && (
                      <SelectedOverlay>
                        <Icon name='checkmark' size={32} color='#fff' />
                      </SelectedOverlay>
                    )}
                  </View>
                </CoverOption>
              ))}
            </CoverGrid>
          ))}
        {coverType === 'image' && (
          <UploadSection>
            <UploadTitle>직접 커버 이미지 추가하기</UploadTitle>
            <UploadButton onPress={handleImageUpload}>
              <UploadPlaceholder>
                {selectedCoverImage ? (
                  <>
                    <UploadedImage source={{ uri: selectedCoverImage }} />
                    <DeleteIcon onPress={handleImageRemove}>
                      <Icon name='close' size={24} color='#fff' />
                    </DeleteIcon>
                  </>
                ) : (
                  <Icon name='add' size={40} color='#999' />
                )}
              </UploadPlaceholder>
            </UploadButton>
          </UploadSection>
        )}
      </ScrollView>
    </Container>
  );
};

const CoverTypeToggle: React.FC<{
  coverType: 'gradient' | 'solid' | 'image';
  onCoverTypeChange: (type: 'gradient' | 'solid' | 'image') => void;
  isImageUploaded: boolean;
}> = ({ coverType, onCoverTypeChange, isImageUploaded }) => (
  <>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <CoverTypeButton
        selected={coverType === 'gradient'}
        onPress={() => onCoverTypeChange('gradient')}
        disabled={isImageUploaded}
      >
        <CoverTypeButtonText
          selected={coverType === 'gradient'}
          disabled={isImageUploaded}
        >
          그라디언트 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
      <CoverTypeButton
        selected={coverType === 'solid'}
        onPress={() => onCoverTypeChange('solid')}
        disabled={isImageUploaded}
      >
        <CoverTypeButtonText
          selected={coverType === 'solid'}
          disabled={isImageUploaded}
        >
          단색 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
      <CoverTypeButton
        selected={coverType === 'image'}
        onPress={() => onCoverTypeChange('image')}
      >
        <CoverTypeButtonText selected={coverType === 'image'}>
          이미지 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
    </View>
  </>
);

const CoverTitle = styled(Subtitle2)`
  letter-spacing: 0.5px;
`;

const CoverTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const CoverSubtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  letter-spacing: 0.5px;
`;

const PaletteContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
  flex-wrap: wrap;
`;

const PaletteButton = styled.TouchableOpacity<{
  selected?: boolean;
  isPlaceholder?: boolean;
}>`
  flex-direction: row;
  width: 80px;
  height: 40px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 10px;
  border-width: 1.5px;
  border-color: ${(props) => (props.selected ? '#000' : 'transparent')};
  border-style: ${(props) => (props.selected ? 'dashed' : 'solid')};
  padding: ${(props) => (props.selected ? '1px' : 0)};
  background-color: ${(props) =>
    props.isPlaceholder ? '#ffffff' : 'transparent'};
`;

const PaletteColor = styled.View<{
  color: string;
  index: number;
  total: number;
}>`
  flex: 1;
  background-color: ${(props) => props.color};
  border-top-left-radius: ${(props) => (props.index === 0 ? '14px' : '0')};
  border-bottom-left-radius: ${(props) => (props.index === 0 ? '14px' : '0')};
  border-top-right-radius: ${(props) =>
    props.index === props.total - 1 ? '14px' : '0'};
  border-bottom-right-radius: ${(props) =>
    props.index === props.total - 1 ? '14px' : '0'};
`;

const LoadingContainer = styled.View`
  flex-basis: 155px;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
`;

const LoadingText = styled(Body2)`
  color: ${({ theme }) => theme.colors.grey_8};
  text-align: center;
  width: 100%;
`;

const CoverTypeButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const CoverTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 4px 10px;
  border-radius: 32px;
  margin-right: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.redBlack : theme.colors.grey_4};
`;

const CoverTypeButtonText = styled(Caption)<{ selected?: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.grey_6};
`;

const CoverOption = styled.TouchableOpacity`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;

const CoverGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;

const SelectedOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${({ theme }) => theme.radius.s};
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const UploadSection = styled.View`
  padding-left: 10px;
  align-items: left;
  margin-bottom: 30px;
`;

const UploadTitle = styled(Subtitle2)`
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const UploadButton = styled.TouchableOpacity`
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.s};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const UploadPlaceholder = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DeleteIcon = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  padding: 5px;
`;

const styles = {
  gradient: {
    width: 155,
    height: 155,
    borderRadius: 16,
  },
};

export default CoverSetting;
