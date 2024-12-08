import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { ButtonText, Caption, H4, H6, Subtitle1 } from 'src/styles/typography';
import {
  BackIcon,
  CherryIcon,
  CollectorOnlyHeaderWhite,
} from 'src/assets/icons/_index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ExhibitViewingDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const exhibitDetails = useSelector(
    (state: RootState) => state.watchingExhibit.details,
  );

  if (!exhibitDetails) {
    // 데이터가 없으면 로딩 상태나 에러 처리
    return null;
  }

  const { artworkIndex, exhibitionArtRess } = route.params as {
    artworkIndex: number;
    exhibitionArtRess: typeof exhibitDetails.exhibitionArtRess;
  };

  const currentArtwork = exhibitionArtRess[artworkIndex];

  // 헤더 설정
  React.useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#fff',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  const images = [currentArtwork.artExhibitionRes.imgUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const dropY = useSharedValue(-screenHeight);

  useEffect(() => {
    dropY.value = withSpring(0, {
      damping: 8,
      stiffness: 90,
    });
  }, [dropY]);

  const resetTransform = () => {
    'worklet';
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      'worklet';
      scale.value = Math.max(1, event.scale);
    })
    .onEnd(() => {
      'worklet';
      resetTransform();
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = Math.min(event.translationY, screenHeight * 0.6);
    })
    .onEnd(() => {
      'worklet';
      resetTransform();
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // 떨어지는 애니메이션
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: dropY.value + translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  const animatedRopeStyle = (isLeft: boolean) =>
    useAnimatedStyle(() => {
      const imageWidth = screenWidth * 0.6;
      const baseLeft = isLeft
        ? (screenWidth - imageWidth) / 2
        : (screenWidth + imageWidth) / 2;

      // 줄 작품 맞춰서 좌우 이동
      const dynamicLeft = baseLeft + translateX.value;

      // 줄 높이 조절
      const height = Math.max(
        dropY.value + translateY.value + screenHeight * 0.5,
        0,
      );

      return {
        left: dynamicLeft,
        height,
        transform: [
          { translateX: translateX.value / 10 },
          {
            rotateZ: `${interpolate(translateX.value, [-200, 200], [-5, 5])}deg`,
          },
        ],
      };
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: currentArtwork.artExhibitionRes.imgUrl }}
        style={{ flex: 1 }}
        resizeMode='cover'
      >
        <Overlay />
        <TopRightText>
          {currentArtwork.artExhibitionRes.collectorsArt ? (
            <CollectorOnlyHeaderWhite />
          ) : currentArtwork.artExhibitionRes.cherryPrice === 0 ? (
            '무료'
          ) : (
            <>
              <CherryIcon fill='white' width={18} height={16} />{' '}
              {currentArtwork.artExhibitionRes.cherryPrice}
            </>
          )}
        </TopRightText>
        <Content>
          <AnimatedRope style={animatedRopeStyle(true)} />
          <AnimatedRope style={animatedRopeStyle(false)} />
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[animatedImageStyle]}>
              <StyledImage source={{ uri: images[0] }} resizeMode='contain' />
            </Animated.View>
          </GestureDetector>
          {images.length > 1 && (
            <NavigationContainer>
              <NavButton
                disabled={currentImageIndex === 0}
                onPress={() =>
                  setCurrentImageIndex((prevIndex) =>
                    Math.max(prevIndex - 1, 0),
                  )
                }
              >
                <BackIcon fill='white' />
              </NavButton>
              <PageIndicator>
                {currentImageIndex + 1} / {images.length}
              </PageIndicator>
              <NavButton
                disabled={currentImageIndex === images.length - 1}
                onPress={() =>
                  setCurrentImageIndex((prevIndex) =>
                    Math.min(prevIndex + 1, images.length - 1),
                  )
                }
              >
                <View style={{ transform: [{ scaleX: -1 }] }}>
                  <BackIcon fill='white' />
                </View>
              </NavButton>
            </NavigationContainer>
          )}
          <DescriptionContainer>
            <Title>{currentArtwork.artExhibitionRes.name}</Title>
            <Subtitle>{currentArtwork.artExhibitionRes.series}</Subtitle>
            <ArtistName>
              {currentArtwork.artExhibitionRes.artistName}
            </ArtistName>
          </DescriptionContainer>
        </Content>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default ExhibitViewingDetail;

const Content = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const StyledImage = styled.Image`
  width: ${screenWidth}px;
  height: ${screenHeight * 0.6}px;
  margin-bottom: 16px;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(18, 0, 0, 0.7);
`;

const AnimatedRope = styled(Animated.View)`
  position: absolute;
  top: 0px;
  width: 2px;
  background-color: #ffffff6e;
`;

const TopRightText = styled(Subtitle1)`
  position: absolute;
  top: 46px;
  right: 16px;
  color: white;
`;

const NavigationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const NavButton = styled(TouchableOpacity)`
  padding: 0 16px;
`;

const PageIndicator = styled(ButtonText)`
  color: white;
`;

const DescriptionContainer = styled.View`
  width: 100%;
  padding: 16px;
  margin-bottom: 32px;
`;

const Title = styled(H4)`
  color: white;
  margin-bottom: 4px;
`;

const Subtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6};
  margin-bottom: 4px;
`;

const ArtistName = styled(H6)`
  color: white;
`;
