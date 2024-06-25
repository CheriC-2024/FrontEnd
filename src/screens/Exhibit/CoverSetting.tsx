import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { LinearGradient } from 'expo-linear-gradient';
import RadialGradientComponent from '../../components/Gradients/RadialGradientComponent';
import AngularGradientComponent from '../../components/Gradients/AngularGradientComponent';
import DiamondGradientComponent from '../../components/Gradients/DiamondGradientComponent';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { extractProperties } from '../../api/cloudVisionApi';

const CoverSetting: React.FC = () => {
  const { colorPalettes, setColorPalettes, selectedArtworks, setCoverColors } =
    useGlobalState();
  const { step, setStep } = useProgressBar();
  const [selectedCover, setSelectedCover] = useState(colorPalettes[0]);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedGradient, setSelectedGradient] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [coverType, setCoverType] = useState<'gradient' | 'solid'>('gradient');
  const [isLoading, setIsLoading] = useState(true);
  const [randomPalettes, setRandomPalettes] = useState(
    colorPalettes.slice(0, 4),
  );

  useEffect(() => {
    setStep(5); // Set progress bar to step 6 (index 5)
  }, [step]);

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      try {
        const artIds = selectedArtworks.map((artwork) => artwork.artId);
        const extractedProperties = await extractProperties(artIds, 'COLOR');
        console.log('Extracted Properties:', extractedProperties);

        const newPalettes = extractedProperties.map(
          (item: any) => item.properties,
        );
        setColorPalettes(newPalettes);
        setRandomPalettes(getRandomPalettes(newPalettes));
        setSelectedCover(newPalettes[0]);
      } catch (error) {
        console.error('Failed to extract properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIRecommendations();
  }, []);

  const getRandomPalettes = (palettes: string[][]) => {
    const shuffled = palettes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const handleCoverSelect = (index: number) => {
    setSelectedPalette(index);
    setSelectedCover(colorPalettes[index]);
    setCoverColors(colorPalettes[index]);
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
      aspect: [1, 1], // Set aspect ratio to 1:1
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
    setCoverType(type);
    setSelectedGradient(null); // Reset selected gradient
  };

  const handleShufflePalettes = () => {
    setRandomPalettes(getRandomPalettes(colorPalettes));
  };

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TitleContainer>
          <TitleIcon
            source={require('src/assets/images/Character/character_happy.png')}
          />
          <TitleText>
            <Title>전시 커버 설정하기</Title>
            <Subtitle>전시와 어울리는 커버를 선택해주세요!</Subtitle>
          </TitleText>
        </TitleContainer>

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
            randomPalettes.map((palette, index) => (
              <PaletteButton
                key={index}
                onPress={() => handleCoverSelect(index)}
                selected={selectedPalette === index}
              >
                {palette.map((color, colorIndex) => (
                  <PaletteColor key={colorIndex} color={color} />
                ))}
              </PaletteButton>
            ))
          )}
        </PaletteContainer>

        <CoverTypeButtonContainer>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <CoverTypeButton
              selected={coverType === 'gradient'}
              onPress={() => handleCoverTypeChange('gradient')}
            >
              <CoverTypeButtonText selected={coverType === 'gradient'}>
                그라디언트 커버
              </CoverTypeButtonText>
            </CoverTypeButton>
            <CoverTypeButton
              selected={coverType === 'solid'}
              onPress={() => handleCoverTypeChange('solid')}
            >
              <CoverTypeButtonText selected={coverType === 'solid'}>
                단색 커버
              </CoverTypeButtonText>
            </CoverTypeButton>
          </View>
          {coverType === 'gradient' && (
            <TouchableOpacity onPress={handleReverseGradient}>
              <Icon name="swap-horizontal-outline" size={22} color="#120000" />
            </TouchableOpacity>
          )}
        </CoverTypeButtonContainer>

        {coverType === 'gradient' ? (
          <CoverSection>
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
          </CoverSection>
        ) : (
          <CoverSection>
            <CoverGrid>
              {colorPalettes[selectedPalette].map((color, index) => (
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
          </CoverSection>
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

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 27px;
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

const Subtitle = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const CoverTitle = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
  line-height: 21px;
  letter-spacing: 0.5px;
`;

const CoverTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CoverSubtitle = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
  letter-spacing: 0.5px;
`;

const PaletteContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const PaletteButton = styled.TouchableOpacity<{ selected?: boolean }>`
  flex-direction: row;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
  border-width: 2px;
  border-color: ${(props) => (props.selected ? '#000' : 'transparent')};
  border-style: ${(props) => (props.selected ? 'dashed' : 'solid')};
`;

const PaletteColor = styled.View<{ color: string }>`
  flex: 1;
  background-color: ${(props) => props.color};
`;

const LoadingText = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  color: #413333;
  text-align: center;
  width: 100%;
`;

const CoverSection = styled.View`
  margin-bottom: 16px;
`;

const CoverTypeButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CoverTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 4px 10px;
  border-radius: 20px;
  margin-right: 8px;
  border: 1px ${(props) => (props.selected ? 'transparent' : '#F7F5F5')};
  background-color: ${(props) => (props.selected ? '#120000' : '#ffffff')};
`;

const CoverTypeButtonText = styled.Text<{ selected?: boolean }>`
  font-family: 'Regular';
  font-size: 12px;
  color: ${(props) => (props.selected ? '#fff' : '#120000')};
`;

const CoverOption = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 20px;
`;

const CoverGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

const SelectedOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const UploadSection = styled.View`
  padding-left: 20px;
  align-items: left;
  margin-bottom: 30px;
`;

const UploadTitle = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
  margin-bottom: 10px;
`;

const UploadButton = styled.TouchableOpacity`
  width: 155px;
  height: 155px;
  background-color: #f7f5f5;
  border-radius: 10px;
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
    borderRadius: 10,
  },
};

export default CoverSetting;
