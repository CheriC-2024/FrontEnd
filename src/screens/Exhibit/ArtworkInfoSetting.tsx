import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBarComponent from '../../components/ProgressBar';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { imageAssets } from '../../assets/DB/imageAssets';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Container } from 'src/styles/layout';
import { Caption, H6 } from 'src/styles/typography';
import InfoBlock from 'src/components/InfoBlock';
import { theme } from 'src/styles/theme';
import { Btn, BtnText } from 'src/components/Button';

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

  const { artworkInfoInput, setArtworkInfoInput } = useGlobalState();
  const { selectedArtworks } = useSelector((state: RootState) => state.artwork);

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
      <ProgressBarComponent totalSteps={7} />
      <TitleSubtitle
        title="작품의 정보를 작성해주세요"
        subtitle="모든 작품의 정보를 작성해야 다음으로 넘어갈 수 있어요"
        imageSource={require('src/assets/images/Character/character_smile.png')}
      />
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
      <ScrollView
        ref={contentScrollViewRef}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {currentIndex < selectedArtworks.length ? (
          <ImagePreview
            source={imageAssets[selectedArtworks[currentIndex]?.fileName]}
          />
        ) : (
          <ImagePreviewPlaceholder />
        )}
        <ArtworkTitleContainer>
          <ArtworkTitleWrapper>
            <H6>{selectedArtworks[currentIndex]?.name}</H6>
            {selectedArtworks[currentIndex]?.cherryNum === null && ( // 컬렉터 소장 작품인 경우
              <CollectorsOnlyIcon
                source={require('../../assets/images/ExhibitPage/collectors_only.png')}
              />
            )}
          </ArtworkTitleWrapper>
          <ArtworkDetailButton onPress={handleDetailPress}>
            <Caption>작품 정보 상세 보기</Caption>
            <Icon name="chevron-forward-outline" size={14} color="#120000" />
          </ArtworkDetailButton>
        </ArtworkTitleContainer>
        <InfoBlock
          label="나만의 작품 소개글"
          placeholder="컬렉터님만의 작품을 소개해주세요"
          maxLength={500}
          required
          value={currentArtworkInfo.artworkDescription}
          onChangeText={(text: string) =>
            handleInputChange('artworkDescription', text)
          }
          style={{ paddingBottom: parseInt(theme.padding.l) }}
        />
        <InfoBlock
          label="나만의 작품 수집 계기"
          placeholder="작품을 수집하게 된 계기를 알려주세요"
          maxLength={500}
          value={currentArtworkInfo.artworkValue}
          onChangeText={(text: string) =>
            handleInputChange('artworkValue', text)
          }
          style={{ paddingBottom: parseInt(theme.padding.l) }}
        />
        <InfoBlock
          label="나만의 작품 감상법"
          placeholder="컬렉터님만의 작품 감상법을 알려주세요"
          maxLength={500}
          value={currentArtworkInfo.artworkAppreciation}
          onChangeText={(text: string) =>
            handleInputChange('artworkAppreciation', text)
          }
          style={{ paddingBottom: parseInt(theme.padding.l) }}
        />
        <Btn onPress={handleNext}>
          <BtnText>다음 작품 작성하기</BtnText>
        </Btn>
      </ScrollView>
    </Container>
  );
};

const CircleScrollContainer = styled(View)`
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const Circle = styled(View)<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 60px;
  margin-right: 10px;
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

const ImagePreview = styled(Image)`
  width: 100%;
  height: 190px;
  margin-bottom: ${({ theme }) => theme.margin.s};
  border-radius: ${({ theme }) => theme.radius.s};
`;

const ImagePreviewPlaceholder = styled(View)`
  width: 100%;
  height: 190px;
  margin-bottom: ${({ theme }) => theme.margin.s};
  border-radius: ${({ theme }) => theme.radius.s};
  background-color: #e0e0e0;
`;

const ArtworkTitleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.padding.l};
`;

const ArtworkTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CollectorsOnlyIcon = styled(Image)`
  width: 65px;
  height: 24px;
  margin-left: ${({ theme }) => theme.margin.xs};
`;

const ArtworkDetailButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 2px 0;
`;

export default ArtworkInfoSetting;
