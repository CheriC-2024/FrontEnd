import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Body2, Caption, Subtitle2 } from 'src/styles/typography';
import { theme } from 'src/styles/theme';
import GradientBackground from 'src/styles/GradientBackground';
import {
  setCoverColors,
  setSelectedPalette,
  setColorPalettes,
  setRandomPalettes,
  setCoverType,
  setSelectedCoverImage,
} from 'src/slices/exhibitSlice';
import { extractProperties } from 'src/api/cloudVisionApi';
import AngularGradientComponent from 'src/components/Gradients/AngularGradientComponent';
import RadialGradientComponent from 'src/components/Gradients/RadialGradientComponent';
import DiamondGradientComponent from 'src/components/Gradients/DiamondGradientComponent';

const CoverSetting: React.FC = () => {
  const dispatch = useDispatch();
  const selectedArtworks = useSelector(
    (state: RootState) => state.artwork.selectedArtworks,
  );
  const {
    coverType,
    colorPalettes,
    randomPalettes,
    selectedPalette,
    selectedCoverImage,
  } = useSelector((state: RootState) => state.exhibit);
  const { setStep } = useProgressBar();
  const [selectedCover, setSelectedCover] = useState(
    selectedPalette.length > 0
      ? selectedPalette
      : colorPalettes[0] || ['#e5e5e5', '#e5e5e5'],
  );
  const [isReversed, setIsReversed] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setStep(5);
  }, [setStep]);

  useEffect(() => {
    if (colorPalettes.length > 0) {
      if (randomPalettes.length === 0) {
        const palettes = getRandomPalettes(colorPalettes);
        dispatch(setRandomPalettes(palettes));
      }

      if (selectedCover.length === 0) {
        setSelectedCover(colorPalettes[0]);
        dispatch(setSelectedPalette(colorPalettes[0]));
        dispatch(setCoverColors(colorPalettes[0]));
      }
    }

    // Redux 상태의 selectedCoverImage를 로컬 상태로 설정
    if (selectedCoverImage) {
      setUploadedImage(selectedCoverImage);
    }
  }, [
    colorPalettes,
    randomPalettes,
    selectedCover,
    selectedCoverImage,
    dispatch,
  ]);

  useEffect(() => {
    const fetchColorPalettes = async () => {
      try {
        const artIds = selectedArtworks.map((artwork) => artwork.artId);
        const extractedProperties = await extractProperties(artIds, 'COLOR');

        const newPalettes = extractedProperties.map((item: any) => [
          ...item.properties,
        ]);
        dispatch(setColorPalettes(newPalettes));

        if (newPalettes.length > 0) {
          const initialCover = newPalettes[0];
          dispatch(setSelectedPalette(initialCover));
          dispatch(setCoverColors(initialCover));
          setSelectedCover(initialCover);
        }

        dispatch(setRandomPalettes(getRandomPalettes(newPalettes)));
      } catch (error) {
        console.error('Failed to extract properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (colorPalettes.length === 0) {
      fetchColorPalettes();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, selectedArtworks, colorPalettes]);

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
    setSelectedCover(selectedPalette);
  };

  const handleReverseGradient = () => {
    setIsReversed(!isReversed);
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
      setUploadedImage(imageUri); // 로컬 상태 업데이트
      dispatch(setSelectedCoverImage(imageUri)); // Redux 상태 업데이트
      dispatch(setCoverType('image')); // coverType을 'image'로 설정
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    dispatch(setSelectedCoverImage(null)); // 이미지 삭제 후에도 null로 업데이트
    dispatch(setCoverType('gradient')); // 기본으로 되돌림
  };

  const handleCoverTypeChange = (type: 'gradient' | 'solid') => {
    if (uploadedImage) return; // 이미지를 업로드한 경우 타입 변경을 막음

    dispatch(setCoverType(type));
    if (type === 'solid') {
      dispatch(setCoverColors([selectedCover[0]])); // 단색으로 첫 번째 색상 설정
    } else if (type === 'gradient') {
      dispatch(setCoverColors(selectedCover)); // 기존 팔레트 색상으로 설정
    }
    setSelectedGradient(null);
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
      <ProgressBarComponent totalSteps={7} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TitleSubtitle
          title="전시 커버 설정하기"
          subtitle="전시와 어울리는 커버를 선택해주세요!"
          imageSource={require('src/assets/images/Character/character_happy.png')}
        />
        <CoverTitle>체리시가 제안하는 커버</CoverTitle>
        <CoverTextContainer>
          <CoverSubtitle>
            컬렉터님의 전시 작품 컬러를 바탕으로 만들었어요 :)
          </CoverSubtitle>
          <TouchableOpacity onPress={handleShufflePalettes}>
            <Icon name="sync-outline" size={22} color="#120000" />
          </TouchableOpacity>
        </CoverTextContainer>
        <PaletteContainer>
          {isLoading ? (
            <LoadingText>추출 중 ...</LoadingText>
          ) : (
            randomPalettes.slice(0, 4).map(({ palette }, index) => (
              <PaletteButton
                key={index}
                onPress={() => handleCoverSelect(index)}
                selected={arePalettesEqual(selectedPalette, palette)}
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
            ))
          )}
        </PaletteContainer>
        <CoverTypeButtonContainer>
          <CoverTypeToggle
            coverType={coverType}
            onCoverTypeChange={handleCoverTypeChange}
            onReverseGradient={handleReverseGradient}
            showReverseButton={coverType === 'gradient'}
            isImageUploaded={!!uploadedImage}
          />
        </CoverTypeButtonContainer>
        {coverType === 'gradient' ? (
          isLoading ? (
            <LoadingText>추출 중 ...</LoadingText>
          ) : (
            <CoverGrid>
              {[
                LinearGradient,
                RadialGradientComponent,
                AngularGradientComponent,
                DiamondGradientComponent,
              ].map((GradientComponent, index) => (
                <CoverOption
                  key={index}
                  onPress={() => handleGradientSelect(index)}
                >
                  <GradientComponent
                    colors={
                      isReversed ? [...selectedCover].reverse() : selectedCover
                    }
                    style={[
                      styles.gradient,
                      selectedGradient === index && styles.selectedGradient,
                    ]}
                  />
                  {selectedGradient === index && (
                    <SelectedOverlay>
                      <Icon name="checkmark" size={32} color="#fff" />
                    </SelectedOverlay>
                  )}
                </CoverOption>
              ))}
            </CoverGrid>
          )
        ) : coverType === 'solid' ? (
          isLoading ? (
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
                  <View style={[styles.gradient, { backgroundColor: color }]}>
                    {selectedGradient === index && (
                      <SelectedOverlay>
                        <Icon name="checkmark" size={32} color="#fff" />
                      </SelectedOverlay>
                    )}
                  </View>
                </CoverOption>
              ))}
            </CoverGrid>
          )
        ) : (
          // 이미지를 업로드했을 때도 CoverGrid를 유지합니다.
          <CoverGrid>
            {selectedPalette.map((color, index) => (
              <CoverOption
                key={index}
                onPress={() => {
                  setSelectedGradient(index);
                  dispatch(setCoverColors([color]));
                }}
              >
                <View style={[styles.gradient, { backgroundColor: color }]}>
                  {selectedGradient === index && (
                    <SelectedOverlay>
                      <Icon name="checkmark" size={32} color="#fff" />
                    </SelectedOverlay>
                  )}
                </View>
              </CoverOption>
            ))}
          </CoverGrid>
        )}
        <UploadSection>
          <UploadTitle>직접 커버 이미지 추가하기</UploadTitle>
          <UploadButton onPress={handleImageUpload}>
            <UploadPlaceholder>
              {uploadedImage ? (
                <>
                  <UploadedImage source={{ uri: uploadedImage }} />
                  <DeleteIcon onPress={handleImageRemove}>
                    <Icon name="close" size={24} color="#fff" />
                  </DeleteIcon>
                </>
              ) : (
                <Icon name="add" size={40} color="#999" />
              )}
            </UploadPlaceholder>
          </UploadButton>
        </UploadSection>
      </ScrollView>
    </Container>
  );
};

const CoverTypeToggle: React.FC<{
  coverType: 'gradient' | 'solid' | 'image';
  onCoverTypeChange: (type: 'gradient' | 'solid') => void;
  onReverseGradient: () => void;
  showReverseButton: boolean;
  isImageUploaded: boolean; // 추가: 이미지 업로드 상태
}> = ({
  coverType,
  onCoverTypeChange,
  onReverseGradient,
  showReverseButton,
  isImageUploaded, // 추가: 이미지 업로드 상태
}) => (
  <>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <CoverTypeButton
        selected={coverType === 'gradient'}
        onPress={() => onCoverTypeChange('gradient')}
        disabled={isImageUploaded} // 이미지가 업로드된 경우 비활성화
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
        disabled={isImageUploaded} // 이미지가 업로드된 경우 비활성화
      >
        <CoverTypeButtonText
          selected={coverType === 'solid'}
          disabled={isImageUploaded}
        >
          단색 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
    </View>
    {showReverseButton && (
      <TouchableOpacity onPress={onReverseGradient} disabled={isImageUploaded}>
        <Icon
          name="swap-horizontal-outline"
          size={22}
          color={isImageUploaded ? '#ccc' : '#120000'}
        />
      </TouchableOpacity>
    )}
  </>
);

const CoverTitle = styled(Subtitle2)`
  letter-spacing: 0.5px;
`;

const CoverTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.margin.s};
`;

const CoverSubtitle = styled(Caption)`
  color: ${theme.colors.grey_8};
  letter-spacing: 0.5px;
`;

const PaletteContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.s5};
  flex-wrap: wrap;
`;

const PaletteButton = styled.TouchableOpacity<{ selected?: boolean }>`
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
  color: ${theme.colors.grey_8};
  text-align: center;
  width: 100%;
`;

const CoverTypeButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.s3};
`;

const CoverTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 4px 10px;
  border-radius: 20px;
  margin-right: 8px;
  border: 1px ${(props) => (props.selected ? 'transparent' : '#F7F5F5')};
  background-color: ${(props) => (props.selected ? '#120000' : '#ffffff')};
`;

const CoverTypeButtonText = styled(Caption)<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? '#fff' : '#120000')};
`;

const CoverOption = styled.TouchableOpacity`
  position: relative;
  margin-bottom: ${theme.spacing.s5};
`;

const CoverGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: ${theme.spacing.s5};
`;

const SelectedOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${theme.radius.s};
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
  margin-bottom: ${theme.margin.s};
`;

const UploadButton = styled.TouchableOpacity`
  width: 155px;
  height: 155px;
  background-color: ${theme.colors.grey_4};
  border-radius: ${theme.radius.s};
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
