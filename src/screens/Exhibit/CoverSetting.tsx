import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { LinearGradient } from 'expo-linear-gradient';
import RadialGradientComponent from '../../components/Gradients/RadialGradientComponent';
import AngularGradientComponent from '../../components/Gradients/AngularGradientComponent';
import DiamondGradientComponent from '../../components/Gradients/DiamondGradientComponent';
import * as ImagePicker from 'expo-image-picker';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Body2, Caption, Subtitle2 } from 'src/styles/typography';
import { theme } from 'src/styles/theme';
import GradientBackground from 'src/styles/GradientBackground';
import { extractProperties } from '../../api/cloudVisionApi';
import {
  setCoverColors,
  setSelectedPalette,
  setColorPalettes,
  setRandomPalettes,
  setCoverType,
} from 'src/slices/exhibitSlice';

const CoverSetting: React.FC = () => {
  const dispatch = useDispatch();
  const selectedArtworks = useSelector(
    (state: RootState) => state.artwork.selectedArtworks,
  );
  const { coverType, colorPalettes, randomPalettes, selectedPalette } =
    useSelector((state: RootState) => state.exhibit);
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
  const [shufflePressed, setShufflePressed] = useState(false); // New state to track shuffle button press

  useEffect(() => {
    setStep(5);
  }, [setStep]);

  useEffect(() => {
    if (colorPalettes.length > 0) {
      // randomPalettes가 비어있다면 새로 설정
      if (randomPalettes.length === 0) {
        const palettes = getRandomPalettes(colorPalettes);
        dispatch(setRandomPalettes(palettes));
      }

      // selectedCover가 비어있다면 첫 번째 팔레트로 초기화
      if (selectedCover.length === 0) {
        setSelectedCover(colorPalettes[0]);
        dispatch(setSelectedPalette(colorPalettes[0]));
        dispatch(setCoverColors(colorPalettes[0]));
      }
    }
  }, [colorPalettes, randomPalettes, selectedCover, dispatch]);

  useEffect(() => {
    const fetchColorPalettes = async () => {
      try {
        const artIds = selectedArtworks.map((artwork) => artwork.artId);
        const extractedProperties = await extractProperties(artIds, 'COLOR');

        const newPalettes = extractedProperties.map((item: any) => [
          ...item.properties,
        ]);
        dispatch(setColorPalettes(newPalettes));

        // 첫 번째 팔레트를 선택하고 저장
        if (newPalettes.length > 0) {
          const initialCover = newPalettes[0]; // 첫 번째 팔레트
          dispatch(setSelectedPalette(initialCover)); // selectedPalette에 첫 번째 팔레트 설정
          dispatch(setCoverColors(initialCover)); // coverColors에 첫 번째 팔레트 설정
          setSelectedCover(initialCover); // selectedCover에 첫 번째 팔레트 설정
        }

        // Shuffle palettes initially
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
    return shuffled.slice(0, Math.min(shuffled.length, 4)); // 최대 4개의 팔레트만 반환
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
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleCoverTypeChange = (type: 'gradient' | 'solid') => {
    dispatch(setCoverType(type)); // Redux에 상태 저장
    setSelectedGradient(null);
  };

  const handleShufflePalettes = () => {
    const shuffledPalettes = getRandomPalettes(colorPalettes);
    dispatch(setRandomPalettes(shuffledPalettes)); // Redux 상태 업데이트
    setShufflePressed(true); // Shuffle 버튼이 눌린 상태를 업데이트
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
        ) : isLoading ? (
          <LoadingContainer>
            <LoadingText>추출 중 ...</LoadingText>
          </LoadingContainer>
        ) : (
          <CoverGrid>
            {selectedPalette.map((color, index) => (
              <CoverOption
                key={index}
                onPress={() => handleGradientSelect(index)}
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
  coverType: 'gradient' | 'solid';
  onCoverTypeChange: (type: 'gradient' | 'solid') => void;
  onReverseGradient: () => void;
  showReverseButton: boolean;
}> = ({
  coverType,
  onCoverTypeChange,
  onReverseGradient,
  showReverseButton,
}) => (
  <>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <CoverTypeButton
        selected={coverType === 'gradient'}
        onPress={() => onCoverTypeChange('gradient')}
      >
        <CoverTypeButtonText selected={coverType === 'gradient'}>
          그라디언트 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
      <CoverTypeButton
        selected={coverType === 'solid'}
        onPress={() => onCoverTypeChange('solid')}
      >
        <CoverTypeButtonText selected={coverType === 'solid'}>
          단색 커버
        </CoverTypeButtonText>
      </CoverTypeButton>
    </View>
    {showReverseButton && (
      <TouchableOpacity onPress={onReverseGradient}>
        <Icon name="swap-horizontal-outline" size={22} color="#120000" />
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
