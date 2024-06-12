import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { LinearGradient } from 'expo-linear-gradient';

const CoverSetting: React.FC = () => {
  const { step, setStep } = useProgressBar();
  const [selectedCover, setSelectedCover] = useState([
    '#FFDAB9',
    '#FF6347',
    '#FFA07A',
    '#FF4500',
  ]);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(0);

  const colorPalettes = [
    ['#FFE4E1', '#FFB6C1', '#FF69B4', '#FF1493'], // Pink palette
    ['#98FB98', '#00FA9A', '#00FF7F', '#3CB371'], // Green palette
    ['#87CEFA', '#00BFFF', '#1E90FF', '#0000CD'], // Blue palette
    ['#FFFFE0', '#FFD700', '#FFA500', '#FF8C00'], // Yellow-Orange palette
  ];

  useEffect(() => {
    setStep(5); // Set progress bar to step 6 (index 5)
  }, [step]);

  const handleCoverSelect = (index) => {
    setSelectedPalette(index);
    setSelectedCover(colorPalettes[index]);
  };

  const handleReverseGradient = () => {
    setIsReversed(!isReversed);
  };

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <TitleContainer>
        <TitleIcon source={require('../../assets/images/character.png')} />
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
        <TouchableOpacity onPress={handleReverseGradient}>
          <Icon name="sync-outline" size={22} color="#120000" />
        </TouchableOpacity>
      </CoverTextContainer>

      <PaletteContainer>
        {colorPalettes.map((palette, index) => (
          <PaletteButton
            key={index}
            onPress={() => handleCoverSelect(index)}
            selected={selectedPalette === index}
          >
            {palette.map((color, colorIndex) => (
              <PaletteColor key={colorIndex} color={color} />
            ))}
          </PaletteButton>
        ))}
      </PaletteContainer>

      <CoverSection>
        <CoverTypeButtonContainer>
          <CoverTypeButton selected>그라디언트 커버</CoverTypeButton>
          <CoverTypeButton>단색 커버</CoverTypeButton>
        </CoverTypeButtonContainer>
        <CoverGrid>
          <CoverOption>
            <LinearGradient
              colors={isReversed ? [...selectedCover].reverse() : selectedCover}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
            <SelectedIndicator />
          </CoverOption>
          <CoverOption>
            <LinearGradient
              colors={isReversed ? [...selectedCover].reverse() : selectedCover}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient2}
            />
            <SelectedIndicator />
          </CoverOption>
          <CoverOption>
            <LinearGradient
              colors={isReversed ? [...selectedCover].reverse() : selectedCover}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient3}
            />
            <SelectedIndicator />
          </CoverOption>
          <CoverOption>
            <LinearGradient
              colors={isReversed ? [...selectedCover].reverse() : selectedCover}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient4}
            />
            <SelectedIndicator />
          </CoverOption>
        </CoverGrid>
      </CoverSection>

      <UploadSection>
        <UploadButton onPress={() => console.log('Add cover image')}>
          <UploadButtonText>직접 커버 이미지 추가하기</UploadButtonText>
        </UploadButton>
      </UploadSection>
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
  height: 75px;
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

const CoverSection = styled.View`
  margin-bottom: 16px;
`;

const CoverTypeButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const CoverTypeButton = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  color: ${(props) => (props.selected ? '#120000' : '#999')};
  margin-right: 16px;
  border-bottom-width: ${(props) => (props.selected ? '2px' : '0px')};
  border-bottom-color: #120000;
`;

const CoverOption = styled.View`
  margin-right: 10px;
  position: relative;
`;

const CoverGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SelectedIndicator = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: #120000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const UploadSection = styled.View`
  margin-top: 16px;
  align-items: center;
`;

const UploadButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #120000;
  border-radius: 5px;
`;

const UploadButtonText = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #fff;
`;

const PaletteContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PaletteButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
  border-width: ${(props) => (props.selected ? '2px' : '0px')};
  border-color: ${(props) => (props.selected ? '#000' : 'transparent')};
`;

const PaletteColor = styled.View`
  flex: 1;
  background-color: ${(props) => props.color};
`;

const styles = {
  gradient: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  gradient2: {
    width: 150,
    height: 150,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  gradient3: {
    width: 150,
    height: 150,
    borderRadius: 10,
    transform: [{ rotate: '90deg' }],
  },
  gradient4: {
    width: 150,
    height: 150,
    borderRadius: 10,
    transform: [{ rotate: '135deg' }],
  },
};

export default CoverSetting;
