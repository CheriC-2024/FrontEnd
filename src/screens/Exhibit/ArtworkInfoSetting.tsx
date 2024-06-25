import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBarComponent from '../../components/ProgressBar';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { imageAssets } from '../../assets/DB/imageAssets';

interface ArtworkInfoSettingProps {
  onArtworkDescriptionChange: (filled: boolean) => void;
}

const ArtworkInfoSetting: React.FC<ArtworkInfoSettingProps> = ({
  onArtworkDescriptionChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const contentScrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { selectedArtworks, artworkInfoInput, setArtworkInfoInput } =
    useGlobalState();

  useEffect(() => {
    const allDescriptionsFilled = artworkInfoInput.every(
      (input) => input.artworkDescription.trim().length > 0,
    );
    console.log('Descriptions filled status:', allDescriptionsFilled);
    onArtworkDescriptionChange(allDescriptionsFilled);
  }, [artworkInfoInput, onArtworkDescriptionChange]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % artworkInfoInput.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current?.scrollTo({ x: nextIndex * 55, animated: true });
    contentScrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleCirclePress = (index: number) => {
    setCurrentIndex(index);
  };

  const handleInputChange = (field: string, text: string) => {
    setArtworkInfoInput((prevInputs) =>
      prevInputs.map((input, index) =>
        index === currentIndex ? { ...input, [field]: text } : input,
      ),
    );
  };

  const handleDetailPress = () => {
    const artwork = selectedArtworks[currentIndex];
    if (artwork) {
      navigation.navigate('ArtworkDetail', {
        isCollectorOnly: artwork.cherryNum === null,
        imageUrl: artwork.fileName,
        title: artwork.name,
      });
    }
  };

  const currentArtworkInfo = artworkInfoInput[currentIndex] || {
    artworkDescription: '',
    artworkValue: '',
    artworkAppreciation: '',
  };

  const isDescriptionFilled = (index: number) => {
    return artworkInfoInput[index]?.artworkDescription?.length > 0;
  };

  return (
    <Container>
      <TopContainer>
        <ProgressBarComponent totalSteps={7} />
        <TitleContainer>
          <TitleIcon
            source={require('src/assets/images/Character/character_smile.png')}
          />
          <TitleText>
            <Title>작품의 정보를 작성해주세요</Title>
            <Subtitle>
              모든 작품의 정보를 작성해야 다음으로 넘어갈 수 있어요
            </Subtitle>
          </TitleText>
        </TitleContainer>
      </TopContainer>
      <CircleScrollContainer>
        <CircleScrollView ref={scrollViewRef}>
          {selectedArtworks.map((artwork, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCirclePress(index)}
            >
              <Circle isActive={currentIndex === index}>
                {artwork.fileName && (
                  <CircleImage source={imageAssets[artwork.fileName]} />
                )}
                {isDescriptionFilled(index) && <Overlay />}
                {isDescriptionFilled(index) && (
                  <OverlayImage
                    source={require('../../assets/images/complete_face.png')}
                  />
                )}
              </Circle>
            </TouchableOpacity>
          ))}
        </CircleScrollView>
      </CircleScrollContainer>
      <ContentContainer ref={contentScrollViewRef}>
        <ImageContainer>
          {currentIndex < selectedArtworks.length ? (
            <ImagePreview
              source={imageAssets[selectedArtworks[currentIndex]?.fileName]}
            />
          ) : (
            <ImagePreviewPlaceholder />
          )}
        </ImageContainer>
        <ArtworkTitleContainer>
          <ArtworkTitleWrapper>
            <ArtworkTitle>{selectedArtworks[currentIndex]?.name}</ArtworkTitle>
            {selectedArtworks[currentIndex]?.cherryNum === null && (
              <CollectorsOnlyIcon
                source={require('../../assets/images/ExhibitPage/collectors_only.png')}
              />
            )}
          </ArtworkTitleWrapper>
          <ArtworkDetailButton onPress={handleDetailPress}>
            <ArtworkDetailButtonText>
              작품 정보 상세 보기
            </ArtworkDetailButtonText>
            <Icon name="chevron-forward-outline" size={14} color="#120000" />
          </ArtworkDetailButton>
        </ArtworkTitleContainer>
        <Label>
          나만의 작품 소개글 <CherryRed>*</CherryRed>
        </Label>
        <InputContainer>
          <Input
            placeholder="컬렉터만의 작품을 소개해주세요"
            value={currentArtworkInfo.artworkDescription}
            onChangeText={(text: string) =>
              handleInputChange('artworkDescription', text)
            }
            multiline
            maxLength={500}
          />
          <CharacterCount>
            <BrownBlack>
              {currentArtworkInfo.artworkDescription.length}
            </BrownBlack>{' '}
            / 500
          </CharacterCount>
        </InputContainer>
        <Label>나만의 작품 수집 계기</Label>
        <InputContainer>
          <Input
            placeholder="작품을 수집하게 된 계기를 알려주세요"
            value={currentArtworkInfo.artworkValue}
            onChangeText={(text: string) =>
              handleInputChange('artworkValue', text)
            }
            multiline
            maxLength={500}
          />
          <CharacterCount>
            <BrownBlack>{currentArtworkInfo.artworkValue.length}</BrownBlack> /
            500
          </CharacterCount>
        </InputContainer>
        <Label>나만의 작품 감상법</Label>
        <InputContainer>
          <Input
            placeholder="컬렉터만의 작품 감상법을 알려주세요"
            value={currentArtworkInfo.artworkAppreciation}
            onChangeText={(text: string) =>
              handleInputChange('artworkAppreciation', text)
            }
            multiline
            maxLength={500}
          />
          <CharacterCount>
            <BrownBlack>
              {currentArtworkInfo.artworkAppreciation.length}
            </BrownBlack>{' '}
            / 500
          </CharacterCount>
        </InputContainer>
        <NextButton onPress={handleNext}>
          <NextButtonText>다음 작품 작성하기</NextButtonText>
        </NextButton>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const TopContainer = styled(View)`
  padding: 16px 16px 0 16px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

const TitleIcon = styled(Image)`
  width: 45px;
  height: 80px;
  margin-right: 10px;
`;

const TitleText = styled(View)`
  flex-direction: column;
`;

const Title = styled(Text)`
  font-family: 'Bold';
  font-size: 18px;
  color: #120000;
`;

const Subtitle = styled(Text)`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding: 0 16px;
`;

const ImageContainer = styled(View)`
  align-items: center;
  margin-bottom: 7px;
`;

const ImagePreview = styled(Image)`
  width: 100%;
  height: 190px;
  border-radius: 10px;
`;

const ImagePreviewPlaceholder = styled(View)`
  width: 100%;
  height: 190px;
  border-radius: 10px;
  background-color: #e0e0e0;
`;

const Label = styled(Text)`
  margin-bottom: 10px;
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CherryRed = styled(Text)`
  color: #e52c32;
`;

const InputContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px 16px;
  border-radius: 20px;
  background-color: #f7f5f5;
  position: relative;
`;

const Input = styled(RNTextInput)`
  text-align-vertical: top;
  height: 147px;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CharacterCount = styled(Text)`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
  text-align: right;
`;

const BrownBlack = styled(Text)`
  color: #413333;
`;

const NextButton = styled(TouchableOpacity)`
  background-color: #120000;
  border-radius: 30px;
  align-items: center;
  margin: 25px 0 60px 0;
`;

const NextButtonText = styled(Text)`
  padding: 16px;
  font-family: 'Bold';
  font-size: 14px;
  color: #ffffff;
`;

const ArtworkTitleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const ArtworkTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ArtworkTitle = styled(Text)`
  font-family: 'Bold';
  font-size: 18px;
  color: #120000;
`;

const ArtworkDetailButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 2px;
`;
const ArtworkDetailButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CollectorsOnlyIcon = styled(Image)`
  width: 65px;
  height: 24px;
  margin-left: 5px;
`;

const CircleScrollContainer = styled(View)`
  margin: 25px 0 12px 8px;
`;

const Circle = styled(View)<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 60px;
  margin: 0 5px;
  background-color: transparent;
  padding: ${(props) => (props.isActive ? '1.5px' : '0px')};
  border: 1.7px dashed
    ${(props) => (props.isActive ? '#E52C32' : 'transparent')};
  position: relative;
`;

const CircleImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 60px;
`;

const Overlay = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 60px;
`;

const OverlayImage = styled(Image)`
  position: absolute;
  width: 22px;
  height: 27px;
  border-radius: 60px;
`;

const StyledScrollView = styled(ScrollView)`
  flex-direction: row;
`;

const CircleScrollView = React.forwardRef<
  ScrollView,
  { children: React.ReactNode }
>((props, ref) => (
  <StyledScrollView horizontal showsHorizontalScrollIndicator={false} ref={ref}>
    {props.children}
  </StyledScrollView>
));

export default ArtworkInfoSetting;
