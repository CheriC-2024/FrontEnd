import React, { useState } from 'react';
import { View, Text, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-web-swiper';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Caption, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CollectingScreen: React.FC = () => {
  const images = [
    require('src/assets/images/CollectingPage/swipe_test1.png'),
    require('src/assets/images/CollectingPage/swipe_test2.png'),
    require('src/assets/images/CollectingPage/swipe_test3.png'),
  ];

  // 상태 관리: "작품 기준" 또는 "작가 기준" 선택 여부
  const [selectedCoverType, setSelectedCoverType] = useState<'작품' | '작가'>(
    '작품',
  );

  const handleCoverTypeChange = (type: '작품' | '작가') => {
    setSelectedCoverType(type);
  };

  return (
    <Container>
      <Swiper
        loop
        timeout={2}
        controlsEnabled={false}
        containerStyle={{
          flex: 0.4,
          marginTop: 8,
          marginBottom: 16,
          width: '100%',
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {images.map((image, index) => (
          <View key={index}>
            <Image
              source={image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
        ))}
      </Swiper>
      <Button onPress={() => Alert.alert('Button Pressed')}>
        <ButtonContent>
          <ButtonText>내가 소장한 작품 등록하러 가기</ButtonText>
          <ButtonIcon name='chevron-forward' size={20} color='#120000' />
        </ButtonContent>
      </Button>
      <TitleSubtitle
        title='아트 컬렉팅하기'
        subtitle='체리시에서 컬렉터님만의 컬렉션을 만들어 보세요:)'
      />
      <View style={{ flexDirection: 'row' }}>
        <CoverTypeButton
          selected={selectedCoverType === '작품'}
          onPress={() => handleCoverTypeChange('작품')}
        >
          <CoverTypeButtonText selected={selectedCoverType === '작품'}>
            작품 기준
          </CoverTypeButtonText>
        </CoverTypeButton>
        <CoverTypeButton
          selected={selectedCoverType === '작가'}
          onPress={() => handleCoverTypeChange('작가')}
        >
          <CoverTypeButtonText selected={selectedCoverType === '작가'}>
            작가 기준
          </CoverTypeButtonText>
        </CoverTypeButton>
      </View>
    </Container>
  );
};

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  margin: 10px 0 20px 0;
  border-radius: 32px;
  border: 1px solid #f7f5f5;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'white')};
  justify-content: center;
  z-index: 1;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled(Subtitle2)`
  padding: 14px 20px;
  letter-spacing: 0.5px;
`;

const ButtonIcon = styled(Icon)`
  margin-right: 15px;
`;

const CoverTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 4px 10px;
  border-radius: 20px;
  margin-right: 8px;
  border: 1px ${(props) => (props.selected ? 'transparent' : '#F7F5F5')};
  background-color: ${(props) => (props.selected ? '#120000' : '#ffffff')};
`;

const CoverTypeButtonText = styled(Caption)<{ selected?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${(props) => (props.selected ? '#fff' : '#B0ABAB')};
`;

export default CollectingScreen;
