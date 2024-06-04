import React, { useState, useRef, forwardRef } from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ProgressBarComponent from '../../components/ProgressBar';

const colors = [
  '#e0e0e0',
  '#c0c0c0',
  '#a0a0a0',
  '#808080',
  '#606060',
  '#404040',
  '#202020',
  '#ff2530',
  '#e25330',
  '#c25330',
];

const initialInputs = Array.from({ length: 10 }, () => ({
  description: '',
  value: '',
  appreciation: '',
}));

const ArtworkInfoSetting: React.FC = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const contentScrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % inputs.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current?.scrollTo({
      x: nextIndex * 60, // 50 (width) + 10 (margin) = 60
      animated: true,
    });
    contentScrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleCirclePress = (index: number) => {
    setCurrentIndex(index);
  };

  const handleInputChange = (field: string, text: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, index) =>
        index === currentIndex ? { ...input, [field]: text } : input,
      ),
    );
  };

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <TitleContainer>
        <Title>작품의 정보를 작성해주세요</Title>
        <SubTitle>
          모든 작품의 정보를 작성해야 다음으로 넘어갈 수 있어요
        </SubTitle>
      </TitleContainer>
      <CircleScrollContainer>
        <CircleScrollView ref={scrollViewRef}>
          {inputs.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCirclePress(index)}
            >
              <Circle
                isActive={currentIndex === index}
                bgColor={colors[index % colors.length]}
              />
            </TouchableOpacity>
          ))}
        </CircleScrollView>
      </CircleScrollContainer>
      <ContentContainer ref={contentScrollViewRef}>
        <ImageContainer>
          <ImagePreview
            style={{ backgroundColor: colors[currentIndex % colors.length] }}
          />
        </ImageContainer>
        <ArtworkTitleWrapper>
          <ArtworkTitle>작품 이름</ArtworkTitle>
          <CollectorsOnlyIcon
            source={require('../../assets/images/ExhibitPage/collectors_only.png')}
          />
        </ArtworkTitleWrapper>
        <Label>나만의 작품 소개글</Label>
        <InputContainer>
          <Input
            placeholder="컬렉터만의 작품을 소개해주세요"
            value={inputs[currentIndex].description}
            onChangeText={(text: string) =>
              handleInputChange('description', text)
            }
            multiline
          />
          <CharacterCount>
            {inputs[currentIndex].description.length} / 500
          </CharacterCount>
        </InputContainer>
        <Label>나만의 작품 수집 계기</Label>
        <InputContainer>
          <Input
            placeholder="작품을 수집하게 된 계기를 알려주세요"
            value={inputs[currentIndex].value}
            onChangeText={(text: string) => handleInputChange('value', text)}
            multiline
          />
          <CharacterCount>
            {inputs[currentIndex].value.length} / 500
          </CharacterCount>
        </InputContainer>
        <Label>나만의 작품 감상법</Label>
        <InputContainer>
          <Input
            placeholder="컬렉터만의 작품 감상법을 알려주세요"
            value={inputs[currentIndex].appreciation}
            onChangeText={(text: string) =>
              handleInputChange('appreciation', text)
            }
            multiline
          />
          <CharacterCount>
            {inputs[currentIndex].appreciation.length} / 500
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

const TitleContainer = styled(View)`
  padding: 0 14px;
`;

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding: 14px;
`;

const ImageContainer = styled(View)`
  align-items: center;
  margin-bottom: 7px;
`;

const ImagePreview = styled(View)`
  width: 100%;
  height: 190px;
  border-radius: 10px;
  background-color: #e0e0e0;
`;

const Label = styled(Text)`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333333;
`;

const InputContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 20px;
  background-color: #f7f5f5;
  position: relative;
`;

const Input = styled(RNTextInput)`
  height: 140px;
  font-size: 12px;
  text-align-vertical: top;
`;

const CharacterCount = styled(Text)`
  font-size: 12px;
  color: #888888;
  text-align: right;
  margin-bottom: 10px;
`;

const NextButton = styled(TouchableOpacity)`
  background-color: #120000;
  border-radius: 30px;
  align-items: center;
  margin: 25px 0 60px 0;
`;

const NextButtonText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled(Text)`
  font-size: 12px;
  margin-bottom: 8px;
`;

const ArtworkTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const ArtworkTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CollectorsOnlyIcon = styled.Image`
  width: 70px;
  height: 24px;
  margin-left: 5px;
`;

const CircleScrollContainer = styled(View)`
  margin: 25px 0 12px 8px;
`;

const Circle = styled(View)<{ isActive: boolean; bgColor: string }>`
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 60px;
  margin: 0 5px;
  background-color: ${(props: { bgColor: any }) => props.bgColor};
  border-width: ${(props: { isActive: any }) =>
    props.isActive ? '2px' : '0px'};
  border-color: ${(props: { isActive: any }) =>
    props.isActive ? '#ff2530' : 'transparent'};
  padding: ${(props: { isActive: any }) => (props.isActive ? '2px' : '0px')};
`;

const StyledScrollView = styled(ScrollView)`
  flex-direction: row;
`;

const CircleScrollView = forwardRef<ScrollView, { children: React.ReactNode }>(
  (props, ref) => (
    <StyledScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={ref}
    >
      {props.children}
    </StyledScrollView>
  ),
);

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  uri: '', // Placeholder for images
}));

export default ArtworkInfoSetting;
