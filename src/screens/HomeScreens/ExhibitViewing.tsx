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
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import TableWhite from 'src/components/TableWhite';
import {
  useAddExhibitHeart,
  useRemoveExhibitHeart,
} from 'src/api/hooks/useExhibitMutations';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const ExhibitViewing: React.FC = () => {
  const route = useRoute();
  const { exhibitId } = route.params || {}; // 전시 ID 가져오기
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null); // CircleSlider의 ScrollView Ref
  const carouselRef = useRef<any>(null); // Carousel Ref
  const exhibitDetails = useSelector(
    (state: RootState) => state.watchingExhibit.details,
  );

  if (!exhibitDetails) {
    // 데이터가 없으면 로딩 상태나 에러 처리
    return null;
  }

  // 애니메이션 값
  const fadeAnimOverlay = useRef(new Animated.Value(1)).current;
  const fadeAnimContent = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showEndSlide, setShowEndSlide] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [currentVerticalIndex, setCurrentVerticalIndex] = useState(0); // 세로 스크롤 인덱스
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0); // 가로 캐러셀 인덱스
  const totalPages = 5; // 세로 스크롤

  const selectedArtworks = exhibitDetails.exhibitionArtRess.map((art) => ({
    id: art.artExhibitionRes.imgUrl, // 작품 이미지 URL을 ID로 사용
    name: art.artExhibitionRes.name, // 작품 이름
    description: art.description, // 작품 설명
    reasonForPurchase: art.reasonForPurchase, // 수집 계기
    appreciation: art.review, // 감상평
    imageUrl: art.artExhibitionRes.imgUrl, // 작품 이미지 URL
  })); // 더미 데이터에서 artworks 가져오기

  const images = [
    ...selectedArtworks.map((artwork) => artwork.imageUrl),
    'endSlide', // 마지막 슬라이드용
  ];

  // 하트 로컬 관리
  const [isLiked, setIsLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(exhibitDetails.heartCount);

  const { mutate: addHeart } = useAddExhibitHeart();
  const { mutate: removeHeart } = useRemoveExhibitHeart();

  const handleLikePress = () => {
    if (isLiked) {
      removeHeart(exhibitId, {
        onSuccess: (newHeartCount: number) => {
          setIsLiked(false);
          setHeartCount(newHeartCount);
        },
      });
    } else {
      addHeart(exhibitId, {
        onSuccess: (newHeartCount: number) => {
          setIsLiked(true);
          setHeartCount(newHeartCount);
        },
      });
    }
  };

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

  const getButtonText = () => {
    if (currentVerticalIndex === 0) {
      return '컬렉터의 작품설명 보기'; // 처음 텍스트
    } else {
      return `${currentVerticalIndex}/${totalPages - 1}`; // 이후 텍스트
    }
  };

  const handleImagePress = (index: number) => {
    navigation.navigate('ExhibitViewingDetail', {
      artworkIndex: index,
      exhibitionArtRess: exhibitDetails.exhibitionArtRess,
    });
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
            : { uri: selectedArtworks[currentHorizontalIndex]?.imageUrl }
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
                            <TouchableOpacity onPress={handleLikePress}>
                              <HeartIcon
                                fill={isLiked ? '#fff' : 'none'}
                                stroke={isLiked ? 'none' : '#fff'}
                              />
                            </TouchableOpacity>
                            <HeartNum>{heartCount}</HeartNum>
                          </View>
                          <EndSlideText>이 전시를 만든 컬렉터는</EndSlideText>
                          <ExhibitEndCard
                            artistName={exhibitDetails.userRes.name}
                            artistImage={exhibitDetails.userRes.profileImgUrl}
                            infoText={exhibitDetails.userRes.description}
                            category={exhibitDetails.userRes.artTypes}
                            comment='매번 전시 테마부터 작품까지 센스가 좋으십니다. 항상 잘보고 있어요.'
                            exhibitionStats={{
                              artworks: '유화 8작, 회화 3작',
                              exhibitions: 5,
                              currentExhibition: 5,
                            }}
                            artistId={exhibitDetails.userRes.id}
                          />
                          <CommentButton
                            onPress={() =>
                              navigation.navigate('ExhibitComments')
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
                        onPress={() => handleImagePress(index)}
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
                    <H6 style={{ color: 'white' }}>
                      {exhibitDetails.userRes.name}
                    </H6>
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
                    <H6 style={{ color: 'white' }}>
                      {exhibitDetails.userRes.name}{' '}
                    </H6>
                    님의 <Red>수집 계기</Red>
                  </ScrollTextTitle>
                  <ScrollText>
                    {
                      selectedArtworks[currentHorizontalIndex]
                        ?.reasonForPurchase
                    }
                  </ScrollText>
                </ScrollTextWrapper>
              </Page>
              {/* 4 : 작품 감상평 */}
              <Page>
                <ScrollTextWrapper>
                  <ScrollTextTitle>
                    <H6 style={{ color: 'white' }}>
                      {' '}
                      {exhibitDetails.userRes.name}
                    </H6>
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
                  <TableWhite
                    items={[
                      {
                        label: '작가',
                        content:
                          exhibitDetails.exhibitionArtRess[
                            currentHorizontalIndex
                          ]?.artExhibitionRes.artistName || '정보 없음',
                      },
                      {
                        label: '시리즈',
                        content:
                          exhibitDetails.exhibitionArtRess[
                            currentHorizontalIndex
                          ]?.artExhibitionRes.series || '-',
                      },
                      {
                        label: '작품 크기',
                        content: `${exhibitDetails.exhibitionArtRess[currentHorizontalIndex]?.artExhibitionRes.horizontalSize || 'N/A'}mm × ${exhibitDetails.exhibitionArtRess[currentHorizontalIndex]?.artExhibitionRes.verticalSize || 'N/A'}mm`,
                      },
                      {
                        label: '재질(사용재료)',
                        content:
                          exhibitDetails.exhibitionArtRess[
                            currentHorizontalIndex
                          ]?.artExhibitionRes.material || '정보 없음',
                      },
                      {
                        label: '제작 시기',
                        content:
                          exhibitDetails.exhibitionArtRess[
                            currentHorizontalIndex
                          ]?.artExhibitionRes.madeAt || '정보 없음',
                      },
                      {
                        label: '작품 분야',
                        content: '유화 , 수채화',
                        // exhibitDetails.exhibitionArtRess[
                        //   currentHorizontalIndex
                        // ]?.artExhibitionRes.artTypes.join(', ') ||
                        // '정보 없음',
                      },
                    ]}
                  />
                  <SectionDivider />
                  <ScrollTextTitle>작품 이용 유의사항</ScrollTextTitle>
                  <TableWhite
                    items={[
                      { label: '공개여부', content: '유료 (전시 1회당 2체리)' },
                      {
                        label: '저작권자',
                        content:
                          exhibitDetails.exhibitionArtRess[
                            currentHorizontalIndex
                          ]?.artExhibitionRes.artistName || '정보 없음',
                      },
                      {
                        label: '유의사항',
                        content:
                          '전시에 해당 작품을 유료로 활용할 수 있습니다. 저작권자인 작가가 설정한 공개(체리)를 전시료로 지불하시면, 전시에 활용하실 수 있습니다. 단, 일부화면의 유출을 금지하고 있으며, 캡처, 다운로드 등을 막아야 합니다. 이를 유의하시기 바랍니다.',
                      },
                    ]}
                  />
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
                <Button onPress={handleButtonPress}>
                  <ButtonText style={{ color: '#fff' }}>
                    {getButtonText()}
                  </ButtonText>
                </Button>
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
  margin-bottom: 8px;
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

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.redBlack};
  align-self: flex-start;
  margin-top: 12px;
  padding: 10px;
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

const SectionDivider = styled.View`
  height: 1px;
  margin: 4px 0;
  background-color: ${({ theme }) => theme.colors.grey_4};
`;
