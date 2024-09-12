import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, Image, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-web-swiper';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Caption, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DATA = [
  {
    title: '동양화',
    data: [
      { id: '1', image: 'https://via.placeholder.com/100' },
      { id: '2', image: 'https://via.placeholder.com/100' },
      { id: '3', image: 'https://via.placeholder.com/100' },
      { id: '4', image: 'https://via.placeholder.com/100' },
      { id: '5', image: 'https://via.placeholder.com/100' },
      { id: '6', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '드로잉',
    data: [
      { id: '7', image: 'https://via.placeholder.com/100' },
      { id: '8', image: 'https://via.placeholder.com/100' },
      { id: '9', image: 'https://via.placeholder.com/100' },
      { id: '10', image: 'https://via.placeholder.com/100' },
      { id: '11', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '디자인',
    data: [
      { id: '12', image: 'https://via.placeholder.com/100' },
      { id: '13', image: 'https://via.placeholder.com/100' },
      { id: '14', image: 'https://via.placeholder.com/100' },
      { id: '15', image: 'https://via.placeholder.com/100' },
      { id: '16', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '회화',
    data: [
      { id: '17', image: 'https://via.placeholder.com/100' },
      { id: '18', image: 'https://via.placeholder.com/100' },
      { id: '19', image: 'https://via.placeholder.com/100' },
      { id: '20', image: 'https://via.placeholder.com/100' },
      { id: '21', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '유화',
    data: [
      { id: '22', image: 'https://via.placeholder.com/100' },
      { id: '23', image: 'https://via.placeholder.com/100' },
      { id: '24', image: 'https://via.placeholder.com/100' },
      { id: '25', image: 'https://via.placeholder.com/100' },
      { id: '26', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '뉴미디어',
    data: [
      { id: '27', image: 'https://via.placeholder.com/100' },
      { id: '28', image: 'https://via.placeholder.com/100' },
      { id: '29', image: 'https://via.placeholder.com/100' },
      { id: '30', image: 'https://via.placeholder.com/100' },
      { id: '31', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    title: '판화',
    data: [
      { id: '32', image: 'https://via.placeholder.com/100' },
      { id: '33', image: 'https://via.placeholder.com/100' },
      { id: '34', image: 'https://via.placeholder.com/100' },
      { id: '35', image: 'https://via.placeholder.com/100' },
      { id: '36', image: 'https://via.placeholder.com/100' },
    ],
  },
];

const CollectingScreen: React.FC = () => {
  const images = [
    require('src/assets/images/CollectingPage/swipe_test1.png'),
    require('src/assets/images/CollectingPage/swipe_test2.png'),
    require('src/assets/images/CollectingPage/swipe_test3.png'),
  ];

  const [selectedCoverType, setSelectedCoverType] = useState<'작품' | '작가'>(
    '작품',
  );
  const [isSticky, setIsSticky] = useState(false);
  const scrollRef = useRef(null);

  const handleCoverTypeChange = (type: '작품' | '작가') => {
    setSelectedCoverType(type);
  };

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 250) {
      // 특정 스크롤 위치에서 sticky 활성화
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  return (
    <Container>
      <FlatList
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item) => item.title}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View>
            <Header>
              <HeaderText>{item.title}</HeaderText>
            </Header>
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ImageWrapper>
                  <StyledImage source={{ uri: item.image }} />
                </ImageWrapper>
              )}
            />
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Swiper 컴포넌트를 FlatList의 헤더로 추가 */}
            <Swiper
              loop
              timeout={2}
              controlsEnabled={false}
              containerStyle={{
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

            {/* 버튼 추가 */}
            <Button onPress={() => Alert.alert('Button Pressed')}>
              <ButtonContent>
                <ButtonText>내가 소장한 작품 등록하러 가기</ButtonText>
                <ButtonIcon name='chevron-forward' size={20} color='#120000' />
              </ButtonContent>
            </Button>

            {/* 제목과 설명 */}
            <TitleSubtitle
              title='아트 컬렉팅하기'
              subtitle='체리시에서 컬렉터님만의 컬렉션을 만들어 보세요:)'
            />

            {/* 커버 타입 선택 버튼 */}
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
          </>
        }
      />
      {isSticky && (
        <StickyContainer>
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
        </StickyContainer>
      )}
    </Container>
  );
};

// Styled Components
const StickyContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  flex-direction: row;
  justify-content: center;
`;

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

const Header = styled.View`
  padding: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ImageWrapper = styled.View`
  margin-right: 10px;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export default CollectingScreen;
