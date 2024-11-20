import React, { useRef, useState } from 'react';
import {
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  CircleSlider,
  DragGuideHorizontal,
  DragGuideVertical,
  ExhibitEndCard,
} from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import {
  Body1,
  ButtonText,
  Caption,
  H5,
  H6,
  Subtitle1,
  Subtitle2,
} from 'src/styles/typography';
import { HeartIcon } from 'src/assets/icons/_index';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

// 더미 데이터
export const dummyData = {
  artist: {
    id: 1,
    image: 'https://i.ibb.co/HtpR5VL/image.png',
    name: '김작가',
    category: '회화',
    bio: '안녕하세요 저는 김작가 입니다. 자기소개는 뭐뭐 입니다. 저는 주로 회화를 그립니다.',
    followers: 49,
  },
  artworks: [
    {
      id: 101,
      name: '아몬드 꽃',
      fileName: 'https://i.ibb.co/bBm2V6M/IMG-8458-2.png',
      description:
        '이 작품은 아주 저명한 작품입니다! 작품 설명이 여기에 들어갑니다.',
      value:
        '수집계기입니다. 이 작품은 아주 저명한 작품입니다! 작품 설명이 여기에 들어갑니다.',
      appreciation:
        'dadadadassd sasfsda asdasdsfdsf sdfsfddsfdfss asasdasds  f fd sdfsdfdsf s asfasraw r fasdaw as rf zsf  f',
    },
    {
      id: 102,
      name: '여름',
      fileName: 'https://i.ibb.co/QNCnwJB/IMG-8456.png',
      description: '여름 작품에 대한 설명입니다.',
    },
    {
      id: 103,
      name: '봄의 정원',
      fileName: 'https://i.ibb.co/C1QyCkS/IMG-8457.png',
      description: '봄의 정원 작품에 대한 설명입니다.',
    },
  ],
};

const ExhibitViewing: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null); // CircleSlider의 ScrollView Ref
  const carouselRef = useRef<any>(null); // Carousel Ref

  // 애니메이션 값
  const fadeAnimOverlay = useRef(new Animated.Value(1)).current;
  const fadeAnimContent = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showEndSlide, setShowEndSlide] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [currentVerticalIndex, setCurrentVerticalIndex] = useState(0); // 세로 스크롤 인덱스
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0); // 가로 캐러셀 인덱스

  const selectedArtworks = dummyData.artworks; // 더미 데이터에서 artworks 가져오기
  const images = [
    ...dummyData.artworks.map((artwork) => artwork.fileName),
    ...['endSlide'], // endSlide 추가
  ];

  const handleEndButtonClick = () => {
    if (!showEndSlide) {
      setShowEndSlide(true);
    }

    //세로 인덱스 스크롤 초기화
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
    setCurrentVerticalIndex(0);

    // 가로 인덱스 마지막으로 이동
    const endIndex = images.length - 1;
    carouselRef.current?.scrollTo({
      index: endIndex,
      animated: true,
    });
    setCurrentHorizontalIndex(endIndex);
  };

  // 헤더 설정
  React.useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: undefined,
        iconColor: 'transparent',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  // Overlay 및 콘텐츠 서서히 나타나기
  React.useEffect(() => {
    Animated.timing(fadeAnimContent, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimContent]);

  const handleScreenPress = () => {
    Animated.parallel([
      Animated.timing(fadeAnimOverlay, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimContent, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOverlayVisible(false);
    });
  };

  const handleCirclePress = (index: number) => {
    if (index === selectedArtworks.length) {
      // Handle "END" button press
      handleEndButtonClick();
    } else {
      // Navigate to the selected artwork
      setCurrentHorizontalIndex(index);
      carouselRef.current?.scrollTo({ index, animated: true });
    }
  };

  const handleButtonPress = () => {
    if (!scrollViewRef.current) return;

    // 총 페이지 수 계산
    const totalPages = 5; // 현재 페이지 수 (필요 시 변경 가능)

    // 다음 페이지로 이동하거나 맨 위로 스크롤
    if (currentVerticalIndex < totalPages - 1) {
      // 다음 페이지로 이동
      const nextPage = (currentVerticalIndex + 1) * screenHeight;
      scrollViewRef.current.scrollTo({ y: nextPage, animated: true });
      setCurrentVerticalIndex((prevIndex) => prevIndex + 1); // 인덱스 업데이트
    } else {
      // 마지막 페이지라면 맨 위로 이동
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      setCurrentVerticalIndex(0); // 인덱스 초기화
    }
  };

  const handleImagePress = (artworkId: number) => {
    // 페이지로 이동, artworkId 전달
    navigation.navigate('ExhibitViewingDetail', { artworkId });
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const offsetY = contentOffset.y; // 스크롤 위치
  };

  const handleMomentumScrollEnd = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const offsetY = contentOffset.y;
    const pageIndex = Math.round(offsetY / screenHeight);

    console.log('onMomentumScrollEnd 이벤트 발생');
    console.log(`현재 스크롤 위치: ${offsetY}, 페이지: ${pageIndex}`);

    if (pageIndex !== currentVerticalIndex) {
      setCurrentVerticalIndex(pageIndex);
    }
  };

  const handleSnapToItem = (index: number) => {
    setCurrentHorizontalIndex(index);
  };

  const handleScrollEndDrag = (event: any) => {
    const { contentOffset, velocity } = event.nativeEvent;
    const offsetY = contentOffset.y; // 현재 스크롤 위치
    const velocityY = velocity.y; // 스와이프 속도
    const threshold = 0.001; // 이동 거리 기준
    const pageIndex = Math.round(offsetY / screenHeight); // 현재 페이지 계산

    console.log(`스크롤 위치: ${offsetY}, 속도: ${velocityY}`);
    console.log(`임계값: ${threshold}, 현재 페이지: ${pageIndex}`);

    // 속도 조건 완화
    if (Math.abs(velocityY) > 2) {
      console.log('비정상적인 속도: 무시');
      return;
    }

    // 아래로 스와이프 감지 (느린 속도와 작은 거리에도 반응)
    if (velocityY > 0.0001 || offsetY > pageIndex * screenHeight + threshold) {
      console.log('아래로 스크롤: 다음 페이지로 이동');
      scrollViewRef.current?.scrollTo({
        y: (pageIndex + 1) * screenHeight,
        animated: true,
      });
      return;
    }

    // 위로 스와이프 감지 (느린 속도와 작은 거리에도 반응)
    if (velocityY < -0.0001 || offsetY < pageIndex * screenHeight - threshold) {
      console.log('위로 스크롤: 이전 페이지로 이동');
      scrollViewRef.current?.scrollTo({
        y: (pageIndex - 1) * screenHeight,
        animated: true,
      });
      return;
    }

    // 현재 페이지로 스냅
    console.log('현재 페이지로 스냅');
    scrollViewRef.current?.scrollTo({
      y: pageIndex * screenHeight,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120000' }}>
      <ImageBackground
        source={
          currentHorizontalIndex === images.length - 1 //endSlide인 경우
            ? { uri: 'https://i.ibb.co/7YvsNd7/2.jpg' }
            : { uri: selectedArtworks[currentHorizontalIndex]?.fileName }
        }
        style={{ flex: 1 }}
        resizeMode='cover'
      >
        <Overlay />
        <TouchableWithoutFeedback onPress={handleScreenPress}>
          <View>
            <Animated.ScrollView
              ref={scrollViewRef}
              pagingEnabled
              onScroll={handleScroll} // 스크롤 이벤트
              onMomentumScrollEnd={handleMomentumScrollEnd} // 스크롤 완료 이벤트
              onScrollEndDrag={handleScrollEndDrag} // 드래그 종료 이벤트
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              decelerationRate='fast'
            >
              {/* 첫 번째 페이지: Carousel */}
              <Page>
                <Carousel
                  ref={carouselRef}
                  loop={false}
                  width={screenWidth}
                  height={screenHeight}
                  data={images}
                  renderItem={({ item, index }) =>
                    item === 'endSlide' ? (
                      <EndSlide>
                        <EndSlideBackground
                          source={{
                            uri: 'https://i.ibb.co/yhqhcZ8/2-image-0.png',
                          }}
                          resizeMode='cover'
                        />
                        <Overlay />
                        <EndSlide style={{ zIndex: 10 }}>
                          <ThanksText>
                            전시를 관람해주셔서 감사합니다!
                          </ThanksText>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 12,
                            }}
                          >
                            <HeartIcon stroke={'#fff'} />
                            <HeartNum>101</HeartNum>
                          </View>
                          <EndSlideText>이 전시를 만든 컬렉터는</EndSlideText>
                          <ExhibitEndCard
                            artistName='닉네임'
                            artistImage='https://i.ibb.co/dPbrz7F/Rectangle.png'
                            infoText='컬렉터 닉네임님께서 유화 8작, 회화 3작을 보유중이며 지금까지 체리시에 총 5개의 컬렉션 전시를 선보였습니다. 컬렉터 닉네임님의 이번 전시는 닉네임 컬렉터님의 5번째 컬렉션 전시입니다'
                            category={['유화', '회화']}
                            comment='매번 전시 테마부터 작품까지 센스가 좋으십니다 항상 잘보고 있어요'
                            artistId={0}
                          />
                          <CommentButton
                            onPress={() =>
                              navigation.navigate('ExhibitComments', {
                                exhibitId: 1,
                              })
                            }
                          >
                            <Body1>방명록 남기러 가기</Body1>
                          </CommentButton>
                          <ExitButton>
                            <Body1 style={{ color: '#B0ABAB' }}>
                              컬렉션 전시 나가기
                            </Body1>
                          </ExitButton>
                        </EndSlide>
                      </EndSlide>
                    ) : (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          handleImagePress(selectedArtworks[index].id)
                        }
                      >
                        <BackgroundImage
                          source={{ uri: item }}
                          resizeMode='cover'
                        />
                      </TouchableWithoutFeedback>
                    )
                  }
                  onSnapToItem={handleSnapToItem}
                />
              </Page>

              {/* 2: 작품 설명 */}
              <Page>
                <ScrollTextWrapper>
                  <ScrollTextTitle>
                    <H6 style={{ color: 'white' }}>{dummyData.artist.name} </H6>
                    님의 <Red>작품 소개</Red>
                  </ScrollTextTitle>
                  <ScrollText>
                    {selectedArtworks[currentHorizontalIndex]?.description}
                  </ScrollText>
                </ScrollTextWrapper>
              </Page>
              {/* 3 : 작품 수집 계기 */}
              <Page>
                <ScrollTextWrapper>
                  <ScrollTextTitle>
                    <H6 style={{ color: 'white' }}>{dummyData.artist.name} </H6>
                    님의 <Red>수집 계기</Red>
                  </ScrollTextTitle>
                  <ScrollText>
                    {selectedArtworks[currentHorizontalIndex]?.value}
                  </ScrollText>
                </ScrollTextWrapper>
              </Page>
              {/* 4 : 작품 감상평 */}
              <Page>
                <ScrollTextWrapper>
                  <ScrollTextTitle>
                    <H6 style={{ color: 'white' }}>{dummyData.artist.name} </H6>
                    님의 <Red>작품 감상평</Red>
                  </ScrollTextTitle>
                  <ScrollText>
                    {selectedArtworks[currentHorizontalIndex]?.appreciation}
                  </ScrollText>
                </ScrollTextWrapper>
              </Page>
              {/* 5 : 작품 정보 */}
              <Page>
                <ScrollTextWrapper>
                  <ScrollTextTitle>작품의 기본 정보</ScrollTextTitle>
                  <ScrollText>정보 테이블 들어갈 예정</ScrollText>
                </ScrollTextWrapper>
              </Page>
            </Animated.ScrollView>

            {/* CircleSlider 상단 오버레이 */}
            <CircleSliderWrapper>
              <CircleSlider
                selectedArtworks={selectedArtworks}
                currentIndex={currentHorizontalIndex}
                onCirclePress={handleCirclePress}
                scrollViewRef={scrollViewRef}
                backgroundColor='transparent'
                showEndButton={true}
              />
            </CircleSliderWrapper>
            {/* 작품 제목 표시 */}
            {currentHorizontalIndex !== images.length - 1 && (
              <TitleWrapper>
                <BannerContainer>
                  <BannerBackground>
                    <Subtitle1>
                      {selectedArtworks[currentHorizontalIndex]?.name}
                    </Subtitle1>
                  </BannerBackground>
                </BannerContainer>
                <TouchableOpacity onPress={handleButtonPress}>
                  <Button>
                    <ButtonText style={{ color: '#fff' }}>
                      컬렉터의 작품설명 보기
                    </ButtonText>
                  </Button>
                </TouchableOpacity>
              </TitleWrapper>
            )}
            {isOverlayVisible && (
              <>
                <AnimatedOverlayBackground
                  style={{ opacity: fadeAnimOverlay }}
                />
                <ContentContainer style={{ opacity: fadeAnimContent }}>
                  <GuideContainer>
                    <ClickGuideImage
                      source={require('src/assets/images/click_guide.png')}
                    />
                    <GuideWrapperColumn>
                      <GuideText>다음 작품 보기</GuideText>
                      <DragGuideHorizontal isReversed />
                    </GuideWrapperColumn>
                    {/* <GuideWrapperRow>
                      <GuideText>작품의 정보 보기</GuideText>
                      <DragGuideVertical isReversed />
                    </GuideWrapperRow> */}
                  </GuideContainer>
                </ContentContainer>
              </>
            )}
            {/* {currentVerticalIndex === 1 && (
              <GuideContainer>
                <DragGuideVertical isReversed />
              </GuideContainer>
            )} */}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ExhibitViewing;

const Page = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight}px;
`;

const BackgroundImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const ScrollTextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(18, 0, 0, 0.8);
`;

const ScrollTextTitle = styled(Subtitle2)`
  color: white;
  text-align: center;
  margin-top: 10px;
`;

const ScrollText = styled(Caption)`
  color: white;
  text-align: center;
  margin-top: 10px;
`;

const CircleSliderWrapper = styled.View`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  padding-left: 16px;
`;

const TitleWrapper = styled.View`
  position: absolute;
  bottom: 40px;
  left: 16px;
`;

const BannerContainer = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const BannerBackground = styled.View`
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.View`
  background-color: ${({ theme }) => theme.colors.redBlack};
  margin-top: 12px;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
`;

const AnimatedOverlayBackground = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`);

const ContentContainer = styled(Animated.View)`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 16px;
  padding-top: 90px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const GuideContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 16px;
`;

const GuideWrapperRow = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 8px;
`;

const GuideWrapperColumn = styled(Animated.View)`
  flex-direction: column;
  align-items: center;
  margin-bottom: 160px;
  padding: 8px 0;
`;

const GuideText = styled(ButtonText)`
  color: #ffffff;
  margin-bottom: 8px;
  margin-right: 8px;
`;

const Red = styled.Text`
  color: ${({ theme }) => theme.colors.cherryRed_6};
`;

const ClickGuideImage = styled.Image`
  position: absolute;
  bottom: ${screenHeight / 2.5}px;
  right: 146px;
  width: 77px;
  height: 71px;
`;

const EndSlide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const EndSlideBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ThanksText = styled(H5)`
  margin-bottom: 12px;
  color: white;
`;

const HeartNum = styled(H6)`
  color: white;
`;

const EndSlideText = styled(ButtonText)`
  margin-bottom: 8px;
  color: white;
`;

const CommentButton = styled.TouchableOpacity`
  margin-top: 40px;
  padding: 12px;
  border-radius: 32px;
  background-color: #fff;
`;

const ExitButton = styled.TouchableOpacity`
  margin-top: 8px;
`;
